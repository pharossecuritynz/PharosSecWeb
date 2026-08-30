import dns from "node:dns/promises";

/**
 * Subdomain normalisation and classification from certificate transparency
 * hostnames. Certificate transparency does not prove a hostname is
 * currently live, so resolution status is classified separately from
 * historical observation, per docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md and
 * the build brief's explicit instruction. The Level 1 product never probes
 * every discovered host beyond a plain DNS resolution check — no active
 * scanning of what's found.
 */

export type ResolutionStatus = "currently-resolving" | "historically-observed" | "unknown";

export type SubdomainCategory =
  | "www"
  | "mail"
  | "vpn"
  | "remote"
  | "portal"
  | "staff"
  | "api"
  | "app"
  | "dev"
  | "staging"
  | "test"
  | "old"
  | "legacy"
  | "admin"
  | "other";

export interface ClassifiedSubdomain {
  hostname: string;
  resolutionStatus: ResolutionStatus;
  category: SubdomainCategory;
}

const CATEGORY_PATTERNS: [SubdomainCategory, RegExp][] = [
  ["www", /^www\./],
  ["mail", /^(mail|smtp|imap|pop|webmail|mx)\./],
  ["vpn", /^vpn\./],
  ["remote", /^(remote|rdp|rds)\./],
  ["portal", /^portal\./],
  ["staff", /^(staff|employee|intranet)\./],
  ["api", /^api\./],
  ["app", /^app\./],
  ["dev", /^dev\./],
  ["staging", /^(staging|stage)\./],
  ["test", /^test\./],
  ["old", /^old\./],
  ["legacy", /^legacy\./],
  ["admin", /^(admin|administrator|manage)\./],
];

export function categorizeHostname(hostname: string): SubdomainCategory {
  for (const [category, pattern] of CATEGORY_PATTERNS) {
    if (pattern.test(hostname)) return category;
  }
  return "other";
}

const MAX_HOSTNAMES_TO_RESOLVE = 60;

async function resolves(hostname: string): Promise<boolean> {
  try {
    const [v4, v6] = await Promise.allSettled([dns.resolve4(hostname), dns.resolve6(hostname)]);
    return (
      (v4.status === "fulfilled" && v4.value.length > 0) ||
      (v6.status === "fulfilled" && v6.value.length > 0)
    );
  } catch {
    return false;
  }
}

/**
 * Classify a deduplicated list of hostnames (already normalised/deduped by
 * the certificate-transparency provider). Resolution is checked for at
 * most MAX_HOSTNAMES_TO_RESOLVE hostnames to keep a single scan bounded;
 * any beyond that cap are reported as "unknown" rather than silently
 * dropped, so the report can say how many were not individually checked.
 */
export async function classifySubdomains(hostnames: string[]): Promise<ClassifiedSubdomain[]> {
  const unique = [...new Set(hostnames.map((h) => h.toLowerCase()))];
  const toResolve = unique.slice(0, MAX_HOSTNAMES_TO_RESOLVE);
  const rest = unique.slice(MAX_HOSTNAMES_TO_RESOLVE);

  const resolvedFlags = await Promise.all(toResolve.map((h) => resolves(h)));

  const checked: ClassifiedSubdomain[] = toResolve.map((hostname, i) => ({
    hostname,
    resolutionStatus: resolvedFlags[i] ? "currently-resolving" : "historically-observed",
    category: categorizeHostname(hostname),
  }));

  const unchecked: ClassifiedSubdomain[] = rest.map((hostname) => ({
    hostname,
    resolutionStatus: "unknown",
    category: categorizeHostname(hostname),
  }));

  return [...checked, ...unchecked];
}
