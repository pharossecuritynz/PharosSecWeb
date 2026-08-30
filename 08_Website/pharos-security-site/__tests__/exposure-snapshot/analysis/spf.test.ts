import { describe, expect, it } from "vitest";
import { classifySpfQuality, parseSpf } from "@/lib/exposure-snapshot/analysis/spf";

describe("parseSpf", () => {
  it("reports absent when there is no SPF record", () => {
    const result = parseSpf(["some other txt record", "google-site-verification=abc"]);
    expect(result.present).toBe(false);
    expect(classifySpfQuality(result)).toBe("high-priority");
  });

  it("parses a strict, well-formed record ending in -all", () => {
    const result = parseSpf(["v=spf1 include:_spf.google.com -all"]);
    expect(result.present).toBe(true);
    expect(result.allQualifier).toBe("fail");
    expect(result.malformed).toBe(false);
    expect(classifySpfQuality(result)).toBe("good");
  });

  it("classifies ~all as attention, not a failure", () => {
    const result = parseSpf(["v=spf1 include:_spf.google.com ~all"]);
    expect(result.allQualifier).toBe("softfail");
    expect(classifySpfQuality(result)).toBe("attention");
  });

  it("classifies ?all as attention", () => {
    const result = parseSpf(["v=spf1 a mx ?all"]);
    expect(result.allQualifier).toBe("neutral");
    expect(classifySpfQuality(result)).toBe("attention");
  });

  it("classifies +all as high-priority (dangerously permissive)", () => {
    const result = parseSpf(["v=spf1 +all"]);
    expect(result.allQualifier).toBe("pass");
    expect(classifySpfQuality(result)).toBe("high-priority");
  });

  it("treats an implicit +all mechanism (no qualifier char) the same as +all", () => {
    const result = parseSpf(["v=spf1 a mx all"]);
    expect(result.allQualifier).toBe("pass");
  });

  it("flags multiple SPF records as malformed, not silently using the first", () => {
    const result = parseSpf(["v=spf1 -all", "v=spf1 include:other.com ~all"]);
    expect(result.recordCount).toBe(2);
    expect(result.malformed).toBe(true);
    expect(classifySpfQuality(result)).toBe("high-priority");
  });

  it("counts DNS-lookup mechanisms", () => {
    const result = parseSpf(["v=spf1 include:a.com include:b.com mx a exists:c.com -all"]);
    // include, include, mx, a, exists = 5
    expect(result.lookupCount).toBe(5);
    expect(result.exceedsLookupLimit).toBe(false);
  });

  it("flags a record that exceeds the 10-lookup limit", () => {
    const includes = Array.from({ length: 11 }, (_, i) => `include:domain${i}.com`).join(" ");
    const result = parseSpf([`v=spf1 ${includes} -all`]);
    expect(result.lookupCount).toBe(11);
    expect(result.exceedsLookupLimit).toBe(true);
    expect(classifySpfQuality(result)).toBe("attention");
  });

  it("extracts a redirect modifier and counts it as a lookup", () => {
    const result = parseSpf(["v=spf1 redirect=_spf.example.com"]);
    expect(result.redirect).toBe("_spf.example.com");
    expect(result.lookupCount).toBe(1);
  });

  it("ignores unrelated TXT records", () => {
    const result = parseSpf(["v=DKIM1; k=rsa; p=abc", "v=spf1 -all"]);
    expect(result.recordCount).toBe(1);
    expect(result.present).toBe(true);
  });
});
