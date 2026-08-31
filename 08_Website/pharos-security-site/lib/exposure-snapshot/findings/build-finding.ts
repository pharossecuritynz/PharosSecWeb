import { getKnowledgeBaseEntry } from "./knowledge-base";
import type { EvidenceType, Finding } from "./types";

/**
 * Stable, sequential finding-ID allocation within one scan, per
 * evidence-standard.md's finding-ID scheme (domain-prefixed, e.g. "EXT-01").
 * A fresh allocator is created per scan (see scan.ts) so IDs never leak
 * across unrelated scans.
 */
export class FindingIdAllocator {
  private counter = 0;

  next(): string {
    this.counter += 1;
    return `EXT-${String(this.counter).padStart(2, "0")}`;
  }
}

export interface BuildFindingOptions {
  controlId: string;
  observation: string;
  evidenceType: EvidenceType;
  evidenceCitation: string;
  confidence: Finding["confidence"];
  /** Override the knowledge base's default risk/priority/effort/status for this specific instance, if the analysis warrants it. */
  overrides?: Partial<Pick<Finding, "riskRating" | "priority" | "effort" | "status" | "title" | "recommendation">>;
}

export function buildFinding(allocator: FindingIdAllocator, options: BuildFindingOptions): Finding {
  const entry = getKnowledgeBaseEntry(options.controlId);

  return {
    id: allocator.next(),
    controlId: options.controlId,
    domain: "EXT",
    title: options.overrides?.title ?? entry.title,
    observation: options.observation,
    evidence: {
      type: options.evidenceType,
      citation: options.evidenceCitation,
      checkedAt: new Date().toISOString(),
    },
    riskRating: options.overrides?.riskRating ?? entry.riskRating,
    confidence: options.confidence,
    priority: options.overrides?.priority ?? entry.priority,
    effort: options.overrides?.effort ?? entry.effort,
    recommendation: options.overrides?.recommendation ?? entry.recommendation,
    status: options.overrides?.status ?? entry.status,
  };
}
