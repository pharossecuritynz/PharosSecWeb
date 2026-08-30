import { safeFetch } from "../security/safe-fetch";
import { providerError, providerOk, providerUnavailable, type ProviderResult } from "./types";

/**
 * Certificate transparency lookup via crt.sh's JSON endpoint. Free and the
 * de facto standard source, but known to be unreliable under load with no
 * documented rate limit — wrapped in a circuit breaker so one flaky
 * dependency can't slow down or break every scan. See
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md and docs/EXTERNAL_PROVIDERS.md.
 */

export interface CertificateTransparencyFindings {
  /** Deduplicated, lowercased hostnames extracted from certificate names. */
  hostnames: string[];
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

    return providerOk(
      "certificate-transparency",
      { hostnames },
      `Public certificate transparency records for ${registrableDomain}, via crt.sh.`,
      "high"
    );
  } catch (error) {
    recordFailure();
    return providerError("certificate-transparency", error);
  }
}
