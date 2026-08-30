/**
 * DMARC record parser (RFC 7489). Classifies STRONG / GOOD / MONITORING ONLY
 * / MISSING — p=none is never treated as equivalent to no DMARC record,
 * per the build brief's explicit instruction.
 */

export type DmarcPolicy = "reject" | "quarantine" | "none";
export type DmarcClassification = "strong" | "good" | "monitoring-only" | "missing" | "malformed";

export interface DmarcParseResult {
  present: boolean;
  raw: string | null;
  malformed: boolean;
  version?: string;
  policy?: DmarcPolicy;
  subdomainPolicy?: DmarcPolicy;
  percentage: number;
  aggregateReportTo: string[];
  forensicReportTo: string[];
  dkimAlignment: "strict" | "relaxed";
  spfAlignment: "strict" | "relaxed";
  classification: DmarcClassification;
}

function parseTagList(record: string): Map<string, string> {
  const tags = new Map<string, string>();
  for (const part of record.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim().toLowerCase();
    const value = trimmed.slice(eqIndex + 1).trim();
    tags.set(key, value);
  }
  return tags;
}

function parsePolicy(value: string | undefined): DmarcPolicy | undefined {
  if (value === "reject" || value === "quarantine" || value === "none") return value;
  return undefined;
}

function parseMailtoList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function parseDmarc(txtRecords: string[]): DmarcParseResult {
  const dmarcRecords = txtRecords.filter((r) => /^v=dmarc1(\s*;|\s|$)/i.test(r.trim()));

  if (dmarcRecords.length === 0) {
    return {
      present: false,
      raw: null,
      malformed: false,
      percentage: 100,
      aggregateReportTo: [],
      forensicReportTo: [],
      dkimAlignment: "relaxed",
      spfAlignment: "relaxed",
      classification: "missing",
    };
  }

  const raw = dmarcRecords[0];
  const tags = parseTagList(raw);

  const version = tags.get("v");
  const policy = parsePolicy(tags.get("p"));
  const subdomainPolicy = parsePolicy(tags.get("sp")) ?? policy;
  const percentageRaw = tags.get("pct");
  const percentage = percentageRaw !== undefined ? Number(percentageRaw) : 100;

  const malformed =
    dmarcRecords.length > 1 ||
    version?.toLowerCase() !== "dmarc1" ||
    !policy ||
    Number.isNaN(percentage);

  const classification: DmarcClassification = malformed
    ? "malformed"
    : policy === "reject"
      ? "strong"
      : policy === "quarantine"
        ? "good"
        : "monitoring-only";

  return {
    present: true,
    raw,
    malformed,
    version,
    policy,
    subdomainPolicy,
    percentage: Number.isNaN(percentage) ? 100 : percentage,
    aggregateReportTo: parseMailtoList(tags.get("rua")),
    forensicReportTo: parseMailtoList(tags.get("ruf")),
    dkimAlignment: tags.get("adkim") === "s" ? "strict" : "relaxed",
    spfAlignment: tags.get("aspf") === "s" ? "strict" : "relaxed",
    classification,
  };
}

export type DmarcQualityStatus = "good" | "attention" | "high-priority";

export function classifyDmarcQuality(result: DmarcParseResult): DmarcQualityStatus {
  switch (result.classification) {
    case "strong":
      return "good";
    case "good":
      return "good";
    case "monitoring-only":
      return "attention";
    case "malformed":
      return "attention";
    case "missing":
    default:
      return "high-priority";
  }
}
