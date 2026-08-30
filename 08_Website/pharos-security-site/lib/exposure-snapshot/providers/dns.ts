import dns from "node:dns/promises";
import { providerError, providerOk, type ProviderResult } from "./types";

/**
 * Native DNS record lookups (A/AAAA/MX/TXT/NS/CAA), via Node's built-in
 * resolver. No external provider, no cost, no rate limit beyond the
 * resolver's own. See docs/EXTERNAL_PROVIDERS.md.
 */

export interface DnsFindings {
  a: string[];
  aaaa: string[];
  mx: { exchange: string; priority: number }[];
  txt: string[][];
  ns: string[];
  caa: { critical: number; issue: string; issuewild?: string }[];
}

async function safeResolve<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    // ENODATA / ENOTFOUND simply mean the record type doesn't exist —
    // that's a normal, not-an-error outcome for a DNS lookup.
    const code = (error as NodeJS.ErrnoException)?.code;
    if (code === "ENODATA" || code === "ENOTFOUND") return fallback;
    throw error;
  }
}

export async function fetchDnsFindings(hostname: string): Promise<ProviderResult<DnsFindings>> {
  try {
    const [a, aaaa, mx, txt, ns, caa] = await Promise.all([
      safeResolve(() => dns.resolve4(hostname), []),
      safeResolve(() => dns.resolve6(hostname), []),
      safeResolve(() => dns.resolveMx(hostname), []),
      safeResolve(() => dns.resolveTxt(hostname), []),
      safeResolve(() => dns.resolveNs(hostname), []),
      safeResolve(() => dns.resolveCaa(hostname), []),
    ]);

    const findings: DnsFindings = {
      a,
      aaaa,
      mx: mx
        .slice()
        .sort((x, y) => x.priority - y.priority)
        .map((record) => ({ exchange: record.exchange.toLowerCase(), priority: record.priority })),
      txt,
      ns: ns.map((n) => n.toLowerCase()),
      caa: caa.map((record) => ({
        critical: record.critical,
        issue: record.issue ?? "",
        issuewild: record.issuewild,
      })),
    };

    return providerOk("dns", findings, `Native DNS lookup for ${hostname}.`, "high");
  } catch (error) {
    return providerError("dns", error);
  }
}
