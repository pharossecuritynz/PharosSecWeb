import { isIP } from "node:net";

/**
 * SSRF address-safety checks, shared by safe-fetch.ts.
 * Rejects private (RFC1918), loopback, link-local, cloud-metadata, and other
 * non-public ranges. Used both before connecting and again after resolving
 * any redirect target, per docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md.
 */

const CLOUD_METADATA_ADDRESSES = new Set([
  "169.254.169.254", // AWS/Azure/GCP/DigitalOcean metadata endpoint
  "fd00:ec2::254", // AWS IMDSv2 IPv6 metadata endpoint
]);

function ipv4ToInt(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function ipv4InRange(ip: string, base: string, prefixLength: number): boolean {
  const ipInt = ipv4ToInt(ip);
  const baseInt = ipv4ToInt(base);
  const mask = prefixLength === 0 ? 0 : (~0 << (32 - prefixLength)) >>> 0;
  return (ipInt & mask) === (baseInt & mask);
}

const IPV4_BLOCKED_RANGES: Array<[string, number]> = [
  ["0.0.0.0", 8], // "this" network
  ["10.0.0.0", 8], // RFC1918
  ["100.64.0.0", 10], // carrier-grade NAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local
  ["172.16.0.0", 12], // RFC1918
  ["192.0.0.0", 24], // IETF protocol assignments
  ["192.0.2.0", 24], // TEST-NET-1
  ["192.168.0.0", 16], // RFC1918
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // TEST-NET-2
  ["203.0.113.0", 24], // TEST-NET-3
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved
];

export function isPublicIpv4(ip: string): boolean {
  if (CLOUD_METADATA_ADDRESSES.has(ip)) return false;
  return !IPV4_BLOCKED_RANGES.some(([base, prefix]) => ipv4InRange(ip, base, prefix));
}

export function isPublicIpv6(ip: string): boolean {
  const normalized = ip.toLowerCase();
  if (CLOUD_METADATA_ADDRESSES.has(normalized)) return false;
  if (normalized === "::1" || normalized === "::") return false; // loopback / unspecified
  if (normalized.startsWith("fe80:")) return false; // link-local
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return false; // unique local (fc00::/7)
  if (normalized.startsWith("::ffff:")) {
    // IPv4-mapped IPv6 address — check the embedded IPv4 address instead.
    const embedded = normalized.split(":").pop() ?? "";
    if (isIP(embedded) === 4) return isPublicIpv4(embedded);
  }
  return true;
}

export function isPublicIpAddress(ip: string): boolean {
  const version = isIP(ip);
  if (version === 4) return isPublicIpv4(ip);
  if (version === 6) return isPublicIpv6(ip);
  return false; // not a valid IP at all — caller should treat as unsafe
}

export const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);
export const ALLOWED_PORTS = new Set(["", "80", "443"]);

export function isAllowedUrl(url: URL): { ok: boolean; reason?: string } {
  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    return { ok: false, reason: `Protocol ${url.protocol} is not allowed.` };
  }
  if (!ALLOWED_PORTS.has(url.port)) {
    return { ok: false, reason: `Port ${url.port} is not allowed.` };
  }
  return { ok: true };
}
