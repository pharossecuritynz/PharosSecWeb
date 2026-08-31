import { describe, expect, it } from "vitest";
import { FindingIdAllocator, buildFinding } from "@/lib/exposure-snapshot/findings/build-finding";
import { buildExposureOverview } from "@/lib/exposure-snapshot/findings/overview";
import type { Finding } from "@/lib/exposure-snapshot/findings/types";

function f(controlId: string): Finding {
  return buildFinding(new FindingIdAllocator(), {
    controlId,
    observation: "x",
    evidenceType: "external-observation",
    evidenceCitation: "x",
    confidence: "high",
  });
}

describe("buildExposureOverview", () => {
  it("email protection is strong when SPF/DMARC/DKIM all pass", () => {
    const overview = buildExposureOverview([f("SPF_GOOD"), f("DMARC_STRONG"), f("DKIM_CONFIRMED")], 0);
    expect(overview.emailProtection).toBe("strong");
  });

  it("email protection is high-priority if any email finding is high-priority", () => {
    const overview = buildExposureOverview([f("SPF_MISSING"), f("DMARC_STRONG")], 0);
    expect(overview.emailProtection).toBe("high-priority");
  });

  it("email protection is needs-attention (not high-priority) for a moderate-only gap", () => {
    const overview = buildExposureOverview([f("SPF_GOOD"), f("DMARC_MONITORING_ONLY")], 0);
    expect(overview.emailProtection).toBe("needs-attention");
  });

  it("domain security reflects registration/DNSSEC/CAA findings", () => {
    const overview = buildExposureOverview([f("REGISTRATION_EXPIRING_SOON")], 0);
    expect(overview.domainSecurity).toBe("needs-attention");
  });

  it("a missing CAA record alone does not push domain security past needs-attention", () => {
    const overview = buildExposureOverview([f("CAA_MISSING")], 0);
    expect(overview.domainSecurity).toBe("needs-attention");
  });

  it("internet exposure scales with the number of exposed non-production hosts", () => {
    expect(buildExposureOverview([], 0).internetExposure).toBe("low");
    expect(buildExposureOverview([f("SUBDOMAIN_NONPRODUCTION_EXPOSED")], 0).internetExposure).toBe("moderate");
    expect(
      buildExposureOverview([f("SUBDOMAIN_NONPRODUCTION_EXPOSED"), f("SUBDOMAIN_NONPRODUCTION_EXPOSED")], 0)
        .internetExposure
    ).toBe("elevated");
  });

  it("a single subdomain takeover risk alone is enough to reach 'elevated' internet exposure", () => {
    const overview = buildExposureOverview([f("SUBDOMAIN_TAKEOVER_RISK")], 0);
    expect(overview.internetExposure).toBe("elevated");
  });

  it("credential exposure is always not-checked until HIBP is wired up — never falsely reports none-observed", () => {
    const overview = buildExposureOverview([f("SPF_GOOD")], 0);
    expect(overview.credentialExposure).toBe("not-checked");
  });

  it("public footprint scales with subdomain count", () => {
    expect(buildExposureOverview([], 3).publicFootprint).toBe("low");
    expect(buildExposureOverview([], 10).publicFootprint).toBe("moderate");
    expect(buildExposureOverview([], 30).publicFootprint).toBe("broad");
  });
});
