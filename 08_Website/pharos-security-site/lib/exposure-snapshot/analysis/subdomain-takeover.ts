import dns from "node:dns/promises";

/**
 * Subdomain takeover risk detection — purely passive: a CNAME lookup on
 * each discovered hostname, checked against known third-party service
 * patterns, then a lookup on whether the CNAME's target itself still
 * resolves. Never interacts with the client's own systems beyond the
 * standard DNS resolution any browser would perform. See
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md.
 *
 * This is not an exhaustive fingerprint database (tools like Subjack/
 * can-i-take-over-xyz maintain much larger lists) — it covers the most
 * common, well-documented services. Extend the SIGNATURES list as needed;
 * a missed pattern only means a risk goes undetected, never a false alarm,
 * since detection additionally requires the CNAME target to not resolve.
 */

export interface TakeoverServiceSignature {
  service: string;
  cnamePattern: RegExp;
}

export const TAKEOVER_SIGNATURES: TakeoverServiceSignature[] = [
  { service: "GitHub Pages", cnamePattern: /\.github\.io$/i },
  { service: "Heroku", cnamePattern: /\.herokuapp\.com$/i },
  { service: "AWS S3", cnamePattern: /\.s3([.-][a-z0-9-]+)?\.amazonaws\.com$/i },
  { service: "Azure App Service", cnamePattern: /\.azurewebsites\.net$/i },
  { service: "Azure Cloud Service", cnamePattern: /\.cloudapp\.net$/i },
  { service: "Azure Traffic Manager", cnamePattern: /\.trafficmanager\.net$/i },
  { service: "Azure Blob Storage", cnamePattern: /\.blob\.core\.windows\.net$/i },
  { service: "Fastly", cnamePattern: /\.fastly\.net$/i },
  { service: "Shopify", cnamePattern: /\.myshopify\.com$/i },
  { service: "Unbounce", cnamePattern: /\.unbouncepages\.com$/i },
  { service: "WordPress.com", cnamePattern: /\.wordpress\.com$/i },
  { service: "Zendesk", cnamePattern: /\.zendesk\.com$/i },
  { service: "Surge.sh", cnamePattern: /\.surge\.sh$/i },
  { service: "Netlify", cnamePattern: /\.netlify\.app$/i },
  { service: "Vercel", cnamePattern: /\.vercel-dns\.com$/i },
  { service: "Tumblr", cnamePattern: /\.tumblr\.com$/i },
];

export interface TakeoverCheckResult {
  hostname: string;
  cnameTarget: string | null;
  matchedService: string | null;
  targetResolves: boolean | null;
  atRisk: boolean;
}

async function resolvesToAnything(hostname: string): Promise<boolean> {
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

async function resolveCnameTarget(hostname: string): Promise<string | null> {
  try {
    const records = await dns.resolveCname(hostname);
    return records[0]?.toLowerCase().replace(/\.$/, "") ?? null;
  } catch {
    return null;
  }
}

export async function checkTakeoverRisk(hostname: string): Promise<TakeoverCheckResult> {
  const cnameTarget = await resolveCnameTarget(hostname);

  if (!cnameTarget) {
    return { hostname, cnameTarget: null, matchedService: null, targetResolves: null, atRisk: false };
  }

  const matched = TAKEOVER_SIGNATURES.find((sig) => sig.cnamePattern.test(cnameTarget));
  if (!matched) {
    return { hostname, cnameTarget, matchedService: null, targetResolves: null, atRisk: false };
  }

  const targetResolves = await resolvesToAnything(cnameTarget);

  return {
    hostname,
    cnameTarget,
    matchedService: matched.service,
    targetResolves,
    atRisk: !targetResolves,
  };
}

const MAX_HOSTNAMES_TO_CHECK = 60;

/**
 * Bounded batch check, same cap discipline as subdomains.ts's resolution
 * check — keeps a single scan's DNS query volume predictable.
 */
export async function checkTakeoverRisks(hostnames: string[]): Promise<TakeoverCheckResult[]> {
  const unique = [...new Set(hostnames.map((h) => h.toLowerCase()))].slice(0, MAX_HOSTNAMES_TO_CHECK);
  return Promise.all(unique.map((hostname) => checkTakeoverRisk(hostname)));
}
