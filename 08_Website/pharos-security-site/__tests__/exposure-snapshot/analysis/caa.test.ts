import { describe, expect, it } from "vitest";
import { classifyCaa } from "@/lib/exposure-snapshot/analysis/caa";

describe("classifyCaa", () => {
  it("reports absent when there are no CAA records", () => {
    const result = classifyCaa([]);
    expect(result.present).toBe(false);
    expect(result.authorizedCAs).toEqual([]);
  });

  it("reports present and lists authorised CAs", () => {
    const result = classifyCaa([
      { critical: 0, issue: "letsencrypt.org" },
      { critical: 0, issue: "digicert.com" },
    ]);
    expect(result.present).toBe(true);
    expect(result.authorizedCAs).toEqual(["letsencrypt.org", "digicert.com"]);
  });

  it("dedupes repeated issuer values", () => {
    const result = classifyCaa([
      { critical: 0, issue: "letsencrypt.org" },
      { critical: 1, issue: "letsencrypt.org" },
    ]);
    expect(result.authorizedCAs).toEqual(["letsencrypt.org"]);
  });

  it("still reports present for an explicit deny-all record (issue value ';'), without listing a fake issuer", () => {
    const result = classifyCaa([{ critical: 0, issue: ";" }]);
    expect(result.present).toBe(true);
    expect(result.authorizedCAs).toEqual([]);
  });
});
