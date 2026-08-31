import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { _resetRateLimitStateForTests } from "@/lib/exposure-snapshot/security/rate-limit";

const sendMock = vi.fn();

class MockResend {
  emails = { send: (...args: unknown[]) => sendMock(...args) };
}

vi.mock("resend", () => ({
  Resend: MockResend,
}));

const { POST } = await import("@/app/api/exposure-snapshot/email/route");

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/exposure-snapshot/email", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

const validPayload = {
  email: "owner@acmeplumbing.co.nz",
  businessName: "Acme Plumbing Ltd",
  domain: "acmeplumbing.co.nz",
  scan: {
    scanCompletedAt: new Date().toISOString(),
    findings: [
      {
        id: "EXT-01",
        controlId: "SPF_GOOD",
        concept: "spf",
        domain: "EXT",
        title: "SPF is good",
        observation: "x",
        evidence: { type: "external-observation", citation: "x", checkedAt: new Date().toISOString() },
        riskRating: "informational",
        confidence: "high",
        priority: "monitor",
        effort: "very-low",
        recommendation: "No action needed.",
        status: "good",
      },
    ],
  },
  overview: {
    emailProtection: "strong",
    domainSecurity: "strong",
    internetExposure: "low",
    credentialExposure: "not-checked",
    publicFootprint: "low",
  },
  executiveSummary: {
    domain: "acmeplumbing.co.nz",
    overallPicture: "All good.",
    protectionsInPlaceCount: 1,
    thingsToReviewCount: 0,
    priorityActionCount: 0,
    topActions: [],
    strengths: [],
  },
};

describe("POST /api/exposure-snapshot/email", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    sendMock.mockReset();
    _resetRateLimitStateForTests();
    process.env.RESEND_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns 503 when RESEND_API_KEY is not configured, without ever calling Resend", async () => {
    delete process.env.RESEND_API_KEY;

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends the email and returns success for a valid payload", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.sent).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const callArgs = sendMock.mock.calls[0][0];
    expect(callArgs.to).toBe("owner@acmeplumbing.co.nz");
    expect(callArgs.html).toContain("Acme Plumbing Ltd");
  });

  it("rejects an invalid email address before ever calling Resend", async () => {
    const response = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));

    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a request with no scan findings", async () => {
    const response = await POST(makeRequest({ ...validPayload, scan: undefined }));
    expect(response.status).toBe(400);
  });

  it("returns 502 and never throws when Resend itself reports an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "boom" } });

    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(502);
  });

  it("rate limits repeated requests from the same IP", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });

    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload));
    }
    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(429);
  });
});
