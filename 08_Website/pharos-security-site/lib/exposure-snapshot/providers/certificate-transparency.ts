import { safeFetch } from "../security/safe-fetch";
import { providerError, providerOk, providerUnavailable, type ProviderResult } from "./types";

/**
 * Certificate transparency lookup via crt.sh's JSON endpoint. Free and the
 * de facto standard source, but known to be unreliable under load with no
 * documented rate limit — wrapped in a circuit breaker so one flaky
 * dependency can't slow down or break every scan. See
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md and docs/EXTERNAL_PROVIDERS.md.
 */

export interface MostRecentCertificate {
  /** Which name this certificate actually covers: the apex domain or its www subdomain. */
  matchedName: string;
  notBefore: string;
  notAfter: string;
}

export interface CertificateTransparencyFindings {
  /** Deduplicated, lowercased hostnames extracted from certificate names. */
  hostnames: string[];
  /** The most recently issued certificate found covering the domain apex or www, or null if none was found. */
  mostRecentCertificate: MostRecentCertificate | null;
}

const CRT_SH_URL = "https://crt.sh/";
const FAILURE_THRESHOLD = 3;
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

interface CircuitState {
  consecutiveFailures: number;
  openUntil: number | null;
}

const circuit: CircuitState = { consecutiveFailures: 0, openUntil: null };

/** Exposed for tests that need to reset the module-level circuit-breaker state. */
export function _resetCircuitForTests(): void {
  circuit.consecutiveFailures = 0;
  circuit.openUntil = null;
}

function recordFailure(): void {
  circuit.consecutiveFailures += 1;
  if (circuit.consecutiveFailures >= FAILURE_THRESHOLD) {
    circuit.openUntil = Date.now() + COOLDOWN_MS;
  }
}

function recordSuccess(): void {
  circuit.consecutiveFailures = 0;
  circuit.openUntil = null;
}

function isCircuitOpen(): boolean {
  return circuit.openUntil !== null && Date.now() < circuit.openUntil;
}

interface CrtShEntry {
  name_value?: string;
  common_name?: string;
  not_before?: string;
  not_after?: string;
}

function extractHostnames(entries: CrtShEntry[], registrableDomain: string): string[] {
  const suffix = `.${registrableDomain}`;
  const names = new Set<string>();

  for (const entry of entries) {
    const raw = `${entry.name_value ?? ""}\n${entry.common_name ?? ""}`;
    for (const line of raw.split(/[\n,]/)) {
      const name = line.trim().toLowerCase().replace(/^\*\./, "");
      if (!name) continue;
      if (name === registrableDomain || name.endsWith(suffix)) {
        names.add(name);
      }
    }
  }

  return [...names].sort();
}

/**
 * Find the most recently issued certificate covering the domain apex or
 * its www subdomain specifically — not just any subdomain — since this is
 * meant to answer "is the primary site's certificate current", not "when
 * was any certificate anywhere under this domain last issued".
 */
function extractMostRecentPrimaryCertificate(
  entries: CrtShEntry[],
  registrableDomain: string
): MostRecentCertificate | null {
  const primaryNames = new Set([registrableDomain, `www.${registrableDomain}`]);
  let best: MostRecentCertificate | null = null;

  for (const entry of entries) {
    if (!entry.not_before || !entry.not_after) continue;
    const raw = `${entry.name_value ?? ""}\n${entry.common_name ?? ""}`;
    const names = raw
      .split(/[\n,]/)
      .map((line) => line.trim().toLowerCase().replace(/^\*\./, ""))
      .filter(Boolean);

    const matchedName = names.find((n) => primaryNames.has(n));
    if (!matchedName) continue;

    const notBefore = new Date(entry.not_before);
    if (Number.isNaN(notBefore.getTime())) continue;

    if (!best || notBefore.getTime() > new Date(best.notBefore).getTime()) {
      best = { matchedName, notBefore: entry.not_before, notAfter: entry.not_after };
    }
  }

  return best;
}

export async function fetchCertificateTransparencyFindings(
  registrableDomain: string
): Promise<ProviderResult<CertificateTransparencyFindings>> {
  if (isCircuitOpen()) {
    return providerUnavailable(
      "certificate-transparency",
      "crt.sh has failed repeatedly and is in cooldown; skipping to avoid overloading it further."
    );
  }

  try {
    const url = new URL(CRT_SH_URL);
    url.searchParams.set("q", `%.${registrableDomain}`);
    url.searchParams.set("output", "json");

    const response = await safeFetch(url.toString(), { timeoutMs: 8000 });

    if (!response.ok) {
      recordFailure();
      return providerUnavailable("certificate-transparency", `crt.sh returned HTTP ${response.status}.`);
    }

    const text = await response.text();
    let entries: CrtShEntry[];
    try {
      entries = text ? (JSON.parse(text) as CrtShEntry[]) : [];
    } catch {
      recordFailure();
      return providerUnavailable("certificate-transparency", "crt.sh returned a response we could not parse.");
    }

    recordSuccess();
    const hostnames = extractHostnames(entries, registrableDomain);
    const mostRecentCertificate = extractMostRecentPrimaryCertificate(entries, registrableDomain);

    return providerOk(
      "certificate-transparency",
      { hostnames, mostRecentCertificate },
      `Public certificate transparency records for ${registrableDomain}, via crt.sh.`,
      "high"
    );
  } catch (error) {
    recordFailure();
    return providerError("certificate-transparency", error);
  }
}
