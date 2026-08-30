import dns from "node:dns/promises";
import type { MailPlatform } from "./mail-platform";

/**
 * DKIM detection. DKIM selectors normally cannot be discovered reliably
 * from DNS alone, so this deliberately never asserts "missing" from a
 * guessed selector failing to resolve — per the build brief's explicit
 * instruction, that is the single most common mistake to avoid here.
 *
 * Only checks selectors that are genuinely documented defaults for a
 * confidently-detected mail platform. Any other case is honestly reported
 * as "not-externally-confirmed", never "missing".
 */

export type DkimStatus = "confirmed" | "not-externally-confirmed" | "misconfigured" | "unknown";

export interface DkimCheckResult {
  status: DkimStatus;
  selectorsChecked: string[];
  confirmedSelector: string | null;
  evidence: string;
}

const KNOWN_SELECTORS: Partial<Record<MailPlatform, string[]>> = {
  "google-workspace": ["google"],
  "microsoft-365": ["selector1", "selector2"],
};

function looksLikeValidDkimRecord(txtValue: string): boolean {
  const hasVersionOrKeyTag = /(^|;)\s*v\s*=\s*dkim1/i.test(txtValue) || /(^|;)\s*k\s*=/i.test(txtValue);
  const hasPublicKey = /(^|;)\s*p\s*=\s*[a-z0-9+/=]+/i.test(txtValue);
  return hasVersionOrKeyTag && hasPublicKey;
}

async function lookupSelector(hostname: string, selector: string): Promise<string | null> {
  const query = `${selector}._domainkey.${hostname}`;
  try {
    const records = await dns.resolveTxt(query);
    const joined = records.map((r) => r.join("")).join(" ");
    return joined || null;
  } catch {
    return null;
  }
}

export async function checkDkim(
  hostname: string,
  mailPlatform: MailPlatform,
  optionalSelector?: string
): Promise<DkimCheckResult> {
  const selectorsToCheck = [
    ...(optionalSelector ? [optionalSelector] : []),
    ...(KNOWN_SELECTORS[mailPlatform] ?? []),
  ];

  if (selectorsToCheck.length === 0) {
    return {
      status: "unknown",
      selectorsChecked: [],
      confirmedSelector: null,
      evidence:
        mailPlatform === "unknown"
          ? "The mail platform could not be confidently identified, so no documented default DKIM selector is known to check."
          : `No documented default DKIM selector is known for ${mailPlatform}.`,
    };
  }

  for (const selector of selectorsToCheck) {
    const value = await lookupSelector(hostname, selector);
    if (value === null) continue; // this selector simply doesn't exist — try the next, never conclude "missing"

    if (looksLikeValidDkimRecord(value)) {
      return {
        status: "confirmed",
        selectorsChecked: selectorsToCheck,
        confirmedSelector: selector,
        evidence: `A valid DKIM record was found at ${selector}._domainkey.${hostname}.`,
      };
    }

    return {
      status: "misconfigured",
      selectorsChecked: selectorsToCheck,
      confirmedSelector: null,
      evidence: `A TXT record exists at ${selector}._domainkey.${hostname} but does not look like a valid DKIM key record.`,
    };
  }

  return {
    status: "not-externally-confirmed",
    selectorsChecked: selectorsToCheck,
    confirmedSelector: null,
    evidence: `None of the documented default selectors for ${mailPlatform} (${selectorsToCheck.join(", ")}) resolved. This does not mean DKIM is missing — most providers use a custom or rotated selector that cannot be discovered without the client confirming it.`,
  };
}
