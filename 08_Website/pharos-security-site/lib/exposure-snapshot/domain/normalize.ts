import { parse } from "tldts";

/**
 * Domain validation and normalisation.
 * Rejects IPs, localhost, malformed input, paths, query strings.
 * PSL-aware (correctly handles multi-label public suffixes like co.nz),
 * per docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md.
 */

export interface NormalizedDomain {
  /** The exact hostname as entered, lowercased, punycode (ASCII) encoded. */
  hostname: string;
  /** The registrable domain (e.g. "example.co.nz"), per the public suffix list. */
  registrableDomain: string;
  /** The public suffix itself (e.g. "co.nz"). */
  publicSuffix: string;
  /** True if the input contained a path/query/fragment that was stripped. */
  hadExtraneousInput: boolean;
}

export type DomainValidationError =
  | "empty"
  | "is-ip-address"
  | "is-localhost-or-reserved"
  | "not-a-registrable-domain"
  | "malformed";

export interface DomainValidationResult {
  ok: boolean;
  value?: NormalizedDomain;
  error?: DomainValidationError;
}

const RESERVED_HOSTNAMES = new Set(["localhost", "localhost.localdomain"]);

/**
 * Strip a protocol, path, query string, fragment, and trailing dot from raw
 * user input, without assuming a URL was given — a bare domain is the
 * expected common case.
 */
function stripToHostCandidate(raw: string): { candidate: string; hadExtraneousInput: boolean } {
  let value = raw.trim();
  let hadExtraneousInput = false;

  const hadProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) || value.startsWith("//");
  value = value.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
  value = value.replace(/^\/\//, "");
  if (hadProtocol) hadExtraneousInput = true;

  // Cut at the first path/query/fragment separator (but not ":", which we
  // handle separately below so an explicit port is still rejected cleanly).
  const cutIndex = value.search(/[/?#]/);
  if (cutIndex !== -1) {
    value = value.slice(0, cutIndex);
    hadExtraneousInput = true;
  }

  // Reject (rather than silently strip) an explicit port by leaving it in
  // place — validation below will fail on the colon, which is intentional.
  value = value.trim().toLowerCase();
  value = value.replace(/\.$/, "");

  return { candidate: value, hadExtraneousInput };
}

function isLikelyIpAddress(value: string): boolean {
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(value)) return true;
  if (value.includes(":") && /^[0-9a-f:]+$/i.test(value)) return true;
  return false;
}

/**
 * IDNA-normalise a hostname to ASCII (punycode) using the platform's own
 * URL parser rather than reimplementing IDNA ourselves.
 */
function toAsciiHostname(candidate: string): string | null {
  try {
    const url = new URL(`http://${candidate}`);
    // A bare hostname must round-trip with no path beyond "/" and no port.
    if (url.pathname !== "/" || url.port !== "" || url.search !== "" || url.hash !== "") {
      return null;
    }
    return url.hostname;
  } catch {
    return null;
  }
}

export function validateAndNormalizeDomain(raw: string): DomainValidationResult {
  if (!raw || !raw.trim()) {
    return { ok: false, error: "empty" };
  }

  const { candidate, hadExtraneousInput } = stripToHostCandidate(raw);

  if (!candidate) {
    return { ok: false, error: "malformed" };
  }

  if (isLikelyIpAddress(candidate)) {
    return { ok: false, error: "is-ip-address" };
  }

  if (RESERVED_HOSTNAMES.has(candidate) || candidate.endsWith(".local") || candidate === "local") {
    return { ok: false, error: "is-localhost-or-reserved" };
  }

  const ascii = toAsciiHostname(candidate);
  if (!ascii) {
    return { ok: false, error: "malformed" };
  }

  if (isLikelyIpAddress(ascii)) {
    return { ok: false, error: "is-ip-address" };
  }

  let parsed;
  try {
    parsed = parse(ascii, { allowPrivateDomains: false });
  } catch {
    return { ok: false, error: "malformed" };
  }

  if (!parsed.domain || !parsed.publicSuffix) {
    return { ok: false, error: "not-a-registrable-domain" };
  }

  return {
    ok: true,
    value: {
      hostname: ascii,
      registrableDomain: parsed.domain,
      publicSuffix: parsed.publicSuffix,
      hadExtraneousInput,
    },
  };
}
