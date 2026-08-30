import { safeFetch } from "../security/safe-fetch";
import { providerError, providerOk, providerUnavailable, type ProviderResult } from "./types";

/**
 * RDAP domain registration lookup, via the IANA bootstrap registry to find
 * the correct RDAP server for a TLD. Falls back to WHOIS (whois.ts) for
 * TLDs the bootstrap registry doesn't cover — notably .nz, which has no
 * RDAP endpoint at all as of 2026-08-31. See docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md
 * and docs/EXTERNAL_PROVIDERS.md.
 */

export interface RegistrationFindings {
  registrar: string | null;
  registrarUrl: string | null;
  createdAt: string | null;
  expiresAt: string | null;
  lastUpdatedAt: string | null;
  status: string[];
  nameservers: string[];
  source: "rdap" | "whois";
}

const BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json";
const BOOTSTRAP_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h — this registry changes rarely

interface BootstrapCache {
  fetchedAt: number;
  serversByTld: Map<string, string[]>;
}

let bootstrapCache: BootstrapCache | null = null;

interface IanaBootstrapService {
  services: [string[], string[]][];
}

async function loadBootstrapRegistry(): Promise<Map<string, string[]>> {
  if (bootstrapCache && Date.now() - bootstrapCache.fetchedAt < BOOTSTRAP_CACHE_TTL_MS) {
    return bootstrapCache.serversByTld;
  }

  const response = await safeFetch(BOOTSTRAP_URL, { timeoutMs: 8000 });
  if (!response.ok) {
    throw new Error(`IANA RDAP bootstrap registry returned HTTP ${response.status}.`);
  }
  const body = (await response.json()) as IanaBootstrapService;

  const serversByTld = new Map<string, string[]>();
  for (const [tlds, servers] of body.services) {
    for (const tld of tlds) {
      serversByTld.set(tld.toLowerCase(), servers);
    }
  }

  bootstrapCache = { fetchedAt: Date.now(), serversByTld };
  return serversByTld;
}

/** Exposed for tests that need to reset the module-level bootstrap cache. */
export function _resetBootstrapCacheForTests(): void {
  bootstrapCache = null;
}

function extractTld(registrableDomain: string): string {
  const parts = registrableDomain.split(".");
  return parts[parts.length - 1];
}

function findRdapEvent(events: unknown, action: string): string | null {
  if (!Array.isArray(events)) return null;
  const match = events.find(
    (event) => typeof event === "object" && event !== null && (event as { eventAction?: string }).eventAction === action
  ) as { eventDate?: string } | undefined;
  return match?.eventDate ?? null;
}

interface RdapDomainResponse {
  status?: string[];
  events?: unknown;
  nameservers?: { ldhName?: string }[];
  entities?: {
    roles?: string[];
    vcardArray?: unknown;
    handle?: string;
    publicIds?: { identifier?: string }[];
  }[];
}

function extractRegistrar(body: RdapDomainResponse): { name: string | null; url: string | null } {
  const registrarEntity = body.entities?.find((e) => e.roles?.includes("registrar"));
  if (!registrarEntity) return { name: null, url: null };

  let name: string | null = null;
  const vcard = registrarEntity.vcardArray;
  if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
    const fnEntry = (vcard[1] as unknown[]).find(
      (entry) => Array.isArray(entry) && entry[0] === "fn"
    ) as [string, unknown, string, string] | undefined;
    if (fnEntry && typeof fnEntry[3] === "string") name = fnEntry[3];
  }

  return { name, url: null };
}

/**
 * Look up domain registration data via RDAP, per the correct TLD server
 * found in the IANA bootstrap registry.
 *
 * Returns providerUnavailable (not providerError) when the TLD simply has
 * no RDAP server — that's an expected, common case (e.g. .nz), and the
 * caller (rdap-or-whois.ts) treats it as a signal to fall back to WHOIS,
 * not as a scan failure.
 */
export async function fetchRdapFindings(
  registrableDomain: string
): Promise<ProviderResult<RegistrationFindings>> {
  try {
    const tld = extractTld(registrableDomain);
    const servers = await loadBootstrapRegistry();
    const baseUrls = servers.get(tld);

    if (!baseUrls || baseUrls.length === 0) {
      return providerUnavailable("rdap", `No RDAP server is registered for the "${tld}" TLD.`);
    }

    const baseUrl = baseUrls[0].endsWith("/") ? baseUrls[0] : `${baseUrls[0]}/`;
    const lookupUrl = `${baseUrl}domain/${registrableDomain}`;

    const response = await safeFetch(lookupUrl, {
      headers: { accept: "application/rdap+json" },
      timeoutMs: 8000,
    });

    if (response.status === 404) {
      return providerUnavailable("rdap", "RDAP server had no record for this domain.");
    }
    if (!response.ok) {
      return providerUnavailable("rdap", `RDAP server returned HTTP ${response.status}.`);
    }

    const body = (await response.json()) as RdapDomainResponse;
    const registrar = extractRegistrar(body);

    const findings: RegistrationFindings = {
      registrar: registrar.name,
      registrarUrl: registrar.url,
      createdAt: findRdapEvent(body.events, "registration"),
      expiresAt: findRdapEvent(body.events, "expiration"),
      lastUpdatedAt: findRdapEvent(body.events, "last changed"),
      status: body.status ?? [],
      nameservers: (body.nameservers ?? [])
        .map((ns) => ns.ldhName?.toLowerCase())
        .filter((v): v is string => Boolean(v)),
      source: "rdap",
    };

    return providerOk("rdap", findings, `RDAP lookup at ${baseUrl} for ${registrableDomain}.`, "high");
  } catch (error) {
    return providerError("rdap", error);
  }
}
