/**
 * A real SPF parser (RFC 7208), not string matching. Classifies configuration
 * quality rather than just pass/fail, per docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md
 * and the build brief's explicit instruction.
 */

export type SpfAllQualifier = "fail" | "softfail" | "neutral" | "pass" | "none";

export interface SpfMechanism {
  qualifier: "+" | "-" | "~" | "?";
  type: string;
  value?: string;
}

export interface SpfParseResult {
  present: boolean;
  recordCount: number;
  raw: string[];
  malformed: boolean;
  mechanisms: SpfMechanism[];
  allQualifier: SpfAllQualifier;
  lookupCount: number;
  exceedsLookupLimit: boolean;
  redirect?: string;
}

const MAX_DNS_LOOKUPS = 10; // RFC 7208 §4.6.4
const LOOKUP_MECHANISMS = new Set(["include", "a", "mx", "ptr", "exists"]);

function parseSingleRecord(record: string): { mechanisms: SpfMechanism[]; redirect?: string; malformed: boolean } {
  const tokens = record.trim().split(/\s+/).slice(1); // drop the leading "v=spf1"
  const mechanisms: SpfMechanism[] = [];
  let redirect: string | undefined;
  let malformed = false;

  for (const token of tokens) {
    if (!token) continue;

    if (token.toLowerCase().startsWith("redirect=")) {
      redirect = token.slice("redirect=".length);
      continue;
    }
    if (token.toLowerCase().startsWith("exp=")) {
      continue; // explanation modifier, not relevant to our classification
    }

    const qualifierChar = ["+", "-", "~", "?"].includes(token[0]) ? token[0] : "+";
    const rest = ["+", "-", "~", "?"].includes(token[0]) ? token.slice(1) : token;

    const [type, value] = rest.split(/[:=]/, 2);
    if (!type) {
      malformed = true;
      continue;
    }

    mechanisms.push({
      qualifier: qualifierChar as SpfMechanism["qualifier"],
      type: type.toLowerCase(),
      value,
    });
  }

  return { mechanisms, redirect, malformed };
}

/**
 * Parse one or more raw TXT records for a domain (SPF records commonly come
 * back split across multiple TXT-record character-strings by DNS resolvers,
 * hence records is string[][] — each inner array is one TXT record's
 * segments, already joined by the DNS layer into full strings by the time
 * they reach here is NOT assumed; callers should pass already-joined strings).
 */
export function parseSpf(txtRecords: string[]): SpfParseResult {
  const spfRecords = txtRecords.filter((r) => /^v=spf1(\s|$)/i.test(r.trim()));

  if (spfRecords.length === 0) {
    return {
      present: false,
      recordCount: 0,
      raw: [],
      malformed: false,
      mechanisms: [],
      allQualifier: "none",
      lookupCount: 0,
      exceedsLookupLimit: false,
    };
  }

  // Multiple SPF records is itself a permanent error per RFC 7208 §3.2 —
  // report it as malformed rather than silently parsing only the first one.
  if (spfRecords.length > 1) {
    return {
      present: true,
      recordCount: spfRecords.length,
      raw: spfRecords,
      malformed: true,
      mechanisms: [],
      allQualifier: "none",
      lookupCount: 0,
      exceedsLookupLimit: false,
    };
  }

  const { mechanisms, redirect, malformed } = parseSingleRecord(spfRecords[0]);

  const allMechanism = mechanisms.find((m) => m.type === "all");
  const allQualifier: SpfAllQualifier = allMechanism
    ? allMechanism.qualifier === "-"
      ? "fail"
      : allMechanism.qualifier === "~"
        ? "softfail"
        : allMechanism.qualifier === "?"
          ? "neutral"
          : "pass"
    : "none";

  // Top-level lookup count only — this does not recursively resolve nested
  // "include:" targets' own SPF records, so it is a lower-bound approximation
  // of the true RFC 7208 §4.6.4 count, not an exact figure. Good enough to
  // flag an SPF record that is already over the limit from its own
  // mechanisms alone; a record close to the limit may need a fuller check.
  const lookupCount =
    mechanisms.filter((m) => LOOKUP_MECHANISMS.has(m.type)).length + (redirect ? 1 : 0);

  return {
    present: true,
    recordCount: 1,
    raw: spfRecords,
    malformed,
    mechanisms,
    allQualifier,
    lookupCount,
    exceedsLookupLimit: lookupCount > MAX_DNS_LOOKUPS,
    redirect,
  };
}

export type SpfQualityStatus = "good" | "attention" | "high-priority";

export function classifySpfQuality(result: SpfParseResult): SpfQualityStatus {
  if (!result.present) return "high-priority";
  if (result.malformed || result.recordCount > 1) return "high-priority";
  if (result.allQualifier === "pass") return "high-priority"; // "+all" — anyone may send
  if (result.exceedsLookupLimit) return "attention"; // SPF will PermError at lookup time
  if (result.allQualifier === "neutral") return "attention"; // "?all"
  if (result.allQualifier === "softfail") return "attention"; // "~all" — some protection
  if (result.allQualifier === "fail") return "good"; // "-all" — enforced
  return "attention"; // no "all" mechanism at all is unusual and worth a look
}
