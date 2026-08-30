import { describe, expect, it } from "vitest";
import { classifyDmarcQuality, parseDmarc } from "@/lib/exposure-snapshot/analysis/dmarc";

describe("parseDmarc", () => {
  it("reports missing when there is no DMARC record", () => {
    const result = parseDmarc(["some other txt"]);
    expect(result.present).toBe(false);
    expect(result.classification).toBe("missing");
    expect(classifyDmarcQuality(result)).toBe("high-priority");
  });

  it("classifies p=reject as strong", () => {
    const result = parseDmarc(["v=DMARC1; p=reject; rua=mailto:reports@example.com"]);
    expect(result.policy).toBe("reject");
    expect(result.classification).toBe("strong");
    expect(classifyDmarcQuality(result)).toBe("good");
  });

  it("classifies p=quarantine as good", () => {
    const result = parseDmarc(["v=DMARC1; p=quarantine"]);
    expect(result.classification).toBe("good");
    expect(classifyDmarcQuality(result)).toBe("good");
  });

  it("does NOT treat p=none as equivalent to no DMARC record", () => {
    const result = parseDmarc(["v=DMARC1; p=none"]);
    expect(result.present).toBe(true);
    expect(result.classification).toBe("monitoring-only");
    expect(classifyDmarcQuality(result)).toBe("attention");
    // Explicitly distinct from the "missing" case:
    expect(result.classification).not.toBe("missing");
  });

  it("parses subdomain policy, defaulting to the main policy if absent", () => {
    const withSp = parseDmarc(["v=DMARC1; p=reject; sp=quarantine"]);
    expect(withSp.subdomainPolicy).toBe("quarantine");

    const withoutSp = parseDmarc(["v=DMARC1; p=reject"]);
    expect(withoutSp.subdomainPolicy).toBe("reject");
  });

  it("parses percentage, aggregate, and forensic reporting addresses", () => {
    const result = parseDmarc([
      "v=DMARC1; p=quarantine; pct=50; rua=mailto:agg@example.com,mailto:agg2@example.com; ruf=mailto:forensic@example.com",
    ]);
    expect(result.percentage).toBe(50);
    expect(result.aggregateReportTo).toEqual(["mailto:agg@example.com", "mailto:agg2@example.com"]);
    expect(result.forensicReportTo).toEqual(["mailto:forensic@example.com"]);
  });

  it("parses alignment modes", () => {
    const strict = parseDmarc(["v=DMARC1; p=reject; adkim=s; aspf=s"]);
    expect(strict.dkimAlignment).toBe("strict");
    expect(strict.spfAlignment).toBe("strict");

    const relaxed = parseDmarc(["v=DMARC1; p=reject"]);
    expect(relaxed.dkimAlignment).toBe("relaxed");
    expect(relaxed.spfAlignment).toBe("relaxed");
  });

  it("flags a record with no policy tag as malformed", () => {
    const result = parseDmarc(["v=DMARC1; rua=mailto:reports@example.com"]);
    expect(result.malformed).toBe(true);
    expect(result.classification).toBe("malformed");
  });

  it("flags multiple DMARC records as malformed", () => {
    const result = parseDmarc(["v=DMARC1; p=reject", "v=DMARC1; p=none"]);
    expect(result.malformed).toBe(true);
  });
});
