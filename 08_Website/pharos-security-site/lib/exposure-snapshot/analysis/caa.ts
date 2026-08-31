/**
 * CAA (Certification Authority Authorization) classification. Low-stakes
 * by design — CAA absence is common, longstanding, normal web practice,
 * not an active vulnerability, so this is rated accordingly in the
 * knowledge base (CAA_MISSING is "low" risk, "later" priority).
 */

export interface CaaRecord {
  critical: number;
  issue: string;
  issuewild?: string;
}

export interface CaaClassification {
  present: boolean;
  authorizedCAs: string[];
}

export function classifyCaa(records: CaaRecord[]): CaaClassification {
  const authorizedCAs = [...new Set(records.map((r) => r.issue).filter((v) => v && v !== ";"))];
  return {
    present: records.length > 0,
    authorizedCAs,
  };
}
