import { describe, expect, it } from "vitest";
import { FindingIdAllocator, buildFinding } from "@/lib/exposure-snapshot/findings/build-finding";

describe("FindingIdAllocator", () => {
  it("allocates stable, sequential, EXT-prefixed, zero-padded IDs", () => {
    const allocator = new FindingIdAllocator();
    expect(allocator.next()).toBe("EXT-01");
    expect(allocator.next()).toBe("EXT-02");
    expect(allocator.next()).toBe("EXT-03");
  });

  it("never reuses an ID within the same allocator instance", () => {
    const allocator = new FindingIdAllocator();
    const ids = Array.from({ length: 15 }, () => allocator.next());
    expect(new Set(ids).size).toBe(15);
  });

  it("a fresh allocator for a new scan starts again at EXT-01 — IDs don't leak across scans", () => {
    const first = new FindingIdAllocator();
    first.next();
    first.next();

    const second = new FindingIdAllocator();
    expect(second.next()).toBe("EXT-01");
  });
});

describe("buildFinding", () => {
  it("builds a finding from the knowledge base with the domain always EXT", () => {
    const allocator = new FindingIdAllocator();
    const finding = buildFinding(allocator, {
      controlId: "DMARC_MISSING",
      observation: "No DMARC record found.",
      evidenceType: "external-observation",
      evidenceCitation: "DNS TXT lookup.",
      confidence: "high",
    });

    expect(finding.id).toBe("EXT-01");
    expect(finding.domain).toBe("EXT");
    expect(finding.controlId).toBe("DMARC_MISSING");
    expect(finding.riskRating).toBe("high");
    expect(finding.status).toBe("high-priority");
  });

  it("allows overriding the knowledge base's default risk/priority/status for this instance", () => {
    const allocator = new FindingIdAllocator();
    const finding = buildFinding(allocator, {
      controlId: "SPF_MISSING",
      observation: "Could not check.",
      evidenceType: "external-observation",
      evidenceCitation: "provider unavailable",
      confidence: "low",
      overrides: { status: "not-checked", riskRating: "informational", priority: "monitor" },
    });

    expect(finding.status).toBe("not-checked");
    expect(finding.riskRating).toBe("informational");
    expect(finding.priority).toBe("monitor");
  });

  it("throws clearly for an unknown control ID rather than silently producing a broken finding", () => {
    const allocator = new FindingIdAllocator();
    expect(() =>
      buildFinding(allocator, {
        controlId: "NOT_A_REAL_CONTROL",
        observation: "x",
        evidenceType: "inferred",
        evidenceCitation: "x",
        confidence: "low",
      })
    ).toThrow();
  });

  it("never assigns 'critical' by default — the knowledge base reserves it for exceptional evidence only", () => {
    const allocator = new FindingIdAllocator();
    // Every entry currently in the knowledge base should top out at "high".
    const controlIds = [
      "SPF_MISSING",
      "SPF_PASS_ALL",
      "DMARC_MISSING",
      "DKIM_MISCONFIGURED",
      "REGISTRATION_EXPIRING_SOON",
    ];
    for (const controlId of controlIds) {
      const finding = buildFinding(allocator, {
        controlId,
        observation: "x",
        evidenceType: "external-observation",
        evidenceCitation: "x",
        confidence: "high",
      });
      expect(finding.riskRating).not.toBe("critical");
    }
  });
});
