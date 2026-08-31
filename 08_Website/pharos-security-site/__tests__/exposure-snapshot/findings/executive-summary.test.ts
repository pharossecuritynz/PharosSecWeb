import { describe, expect, it } from "vitest";
import { FindingIdAllocator, buildFinding } from "@/lib/exposure-snapshot/findings/build-finding";
import { buildExecutiveSummary } from "@/lib/exposure-snapshot/findings/executive-summary";
import type { Finding } from "@/lib/exposure-snapshot/findings/types";

function f(controlId: string, overrides?: Partial<Pick<Finding, "effort" | "status" | "riskRating">>): Finding {
  return buildFinding(new FindingIdAllocator(), {
    controlId,
    observation: "x",
    evidenceType: "external-observation",
    evidenceCitation: "x",
    confidence: "high",
    overrides,
  });
}

describe("buildExecutiveSummary", () => {
  it("counts strengths, things-to-review, and priority actions correctly", () => {
    const summary = buildExecutiveSummary("example.com", [
      f("SPF_GOOD"),
      f("DMARC_MISSING"), // high-priority
      f("DKIM_NOT_CONFIRMED"), // attention
    ]);

    expect(summary.protectionsInPlaceCount).toBe(1);
    expect(summary.thingsToReviewCount).toBe(2);
    expect(summary.priorityActionCount).toBe(1);
  });

  it("surfaces a cheap, moderate finding ahead of an expensive, severe one — the strongest-recommendations principle", () => {
    const cheapModerate = f("SPF_SOFT_OR_NEUTRAL", { effort: "very-low" });
    const expensiveHighPriority = f("DMARC_MISSING", { effort: "significant" });

    const summary = buildExecutiveSummary("example.com", [expensiveHighPriority, cheapModerate]);

    expect(summary.topActions[0].id).toBe(cheapModerate.id);
  });

  it("never includes 'good' or 'not-checked' findings in topActions", () => {
    const summary = buildExecutiveSummary("example.com", [
      f("SPF_GOOD"),
      f("REGISTRATION_NOT_AVAILABLE"),
      f("DMARC_MISSING"),
    ]);

    expect(summary.topActions.every((a) => a.status !== "good" && a.status !== "not-checked")).toBe(true);
  });

  it("caps topActions at 5", () => {
    const many = Array.from({ length: 8 }, () => f("SPF_SOFT_OR_NEUTRAL"));
    const summary = buildExecutiveSummary("example.com", many);
    expect(summary.topActions.length).toBe(5);
  });

  it("acknowledges strengths before gaps in the overall picture text, and never says 'no exposure exists'", () => {
    const summary = buildExecutiveSummary("example.com", [f("SPF_GOOD"), f("DMARC_MISSING")]);
    expect(summary.overallPicture).toMatch(/protection/i);
    expect(summary.overallPicture.toLowerCase()).not.toContain("no exposure exists");
  });

  it("produces a calm, non-alarmist all-clear message when nothing needs review", () => {
    const summary = buildExecutiveSummary("example.com", [f("SPF_GOOD"), f("DMARC_STRONG")]);
    expect(summary.thingsToReviewCount).toBe(0);
    expect(summary.overallPicture).toMatch(/solid/i);
  });
});
