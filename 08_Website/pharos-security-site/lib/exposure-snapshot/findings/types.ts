/**
 * The Exposure Snapshot finding model — a direct TypeScript implementation
 * of 04_Operating_Manual/evidence-standard.md and risk-and-priority-methodology.md,
 * not a parallel schema invented for this tool. See
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md ("Finding model").
 */

export type EvidenceType =
  | "client-stated"
  | "documentary"
  | "configuration-observed"
  | "technical-test"
  | "external-observation"
  | "inferred";

/** Critical/High/Moderate/Low/Informational — see risk-and-priority-methodology.md.
 * "critical" is reserved for genuinely exceptional evidence; nothing in the
 * Milestone 1 knowledge base currently assigns it. */
export type RiskRating = "critical" | "high" | "moderate" | "low" | "informational";

export type Confidence = "high" | "medium" | "low";

/** Now/Next/Later/Monitor — see reporting-standards.md. Unchanged from the
 * existing methodology; not redefined here. */
export type Priority = "now" | "next" | "later" | "monitor";

/** Very Low/Low/Moderate/Significant — see risk-and-priority-methodology.md. */
export type Effort = "very-low" | "low" | "moderate" | "significant";

/** Report-facing simplification for the per-check status badge. */
export type CheckStatus = "good" | "attention" | "high-priority" | "informational" | "not-checked";

/** Groups findings under a plain-English "what is this and why does it matter"
 * explainer, independent of the specific finding — see concept-explainers.ts. */
export type Concept =
  | "spf"
  | "dmarc"
  | "dkim"
  | "dnssec"
  | "domain-registration"
  | "public-footprint"
  | "subdomain-takeover"
  | "caa"
  | "tls-certificate"
  | "mta-sts"
  | "bimi"
  | "internet-exposure";

export interface FindingEvidence {
  type: EvidenceType;
  citation: string;
  checkedAt: string;
}

export interface Finding {
  /** Stable within a scan, e.g. "EXT-01". See evidence-standard.md's finding-ID scheme. */
  id: string;
  /** Key into the remediation knowledge base, e.g. "DMARC_MISSING". */
  controlId: string;
  /** Key into concept-explainers.ts, for the "what is this?" info disclosure. */
  concept: Concept;
  /** Always "EXT" for this tool — the domain prefix already reserved for external exposure findings. */
  domain: "EXT";
  title: string;
  observation: string;
  evidence: FindingEvidence;
  riskRating: RiskRating;
  confidence: Confidence;
  priority: Priority;
  effort: Effort;
  recommendation: string;
  status: CheckStatus;
}

export interface ScanFindings {
  domain: string;
  scanStartedAt: string;
  scanCompletedAt: string;
  findings: Finding[];
}
