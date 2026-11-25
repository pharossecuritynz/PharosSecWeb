import { afterEach, describe, expect, it } from "vitest";
import { createReportToken, verifyReportToken } from "@/lib/exposure-snapshot/report/report-token";

const payload = {
  email: "owner@example.co.nz",
  businessName: "Example Ltd",
  domain: "example.co.nz",
  scan: { scanCompletedAt: "2026-11-25T00:00:00.000Z", findings: [] },
  overview: {} as never,
  executiveSummary: {} as never,
};

describe("report tokens", () => {
  const originalEnv = { ...process.env };
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("issues no token when no signing key is available", () => {
    delete process.env.REPORT_SIGNING_SECRET;
    delete process.env.RESEND_API_KEY;
    expect(createReportToken(payload)).toBeNull();
    expect(verifyReportToken("a.b")).toEqual({ ok: false, reason: "not-configured" });
  });

  it("round-trips with an explicit secret", () => {
    process.env.REPORT_SIGNING_SECRET = "s3cret";
    const result = verifyReportToken(createReportToken(payload));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.payload.email).toBe("owner@example.co.nz");
  });

  it("rejects a token signed with a different key", () => {
    process.env.REPORT_SIGNING_SECRET = "key-one";
    const token = createReportToken(payload);
    process.env.REPORT_SIGNING_SECRET = "key-two";
    expect(verifyReportToken(token)).toEqual({ ok: false, reason: "bad-signature" });
  });

  it("rejects garbage without throwing", () => {
    process.env.REPORT_SIGNING_SECRET = "s3cret";
    expect(verifyReportToken(undefined).ok).toBe(false);
    expect(verifyReportToken("no-dot").ok).toBe(false);
    expect(verifyReportToken({}).ok).toBe(false);
  });
});
