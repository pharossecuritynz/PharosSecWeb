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
const { createReportToken } = await import("@/lib/exposure-snapshot/report/report-token");

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/exposure-snapshot/email", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", ...headers },
  });
}

function tokenFor(payload: typeof validPayload, issuedAt?: number) {
  const { email, ...rest } = payload;
  return createReportToken(
    { email, ...rest } as unknown as Parameters<typeof createReportToken>[0],
    issuedAt
  );
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
    const token = tokenFor(validPayload);
    delete process.env.RESEND_API_KEY;

    const response = await POST(makeRequest({ token }));

    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends the signed report to the address sealed in the token", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });

    const response = await POST(makeRequest({ token: tokenFor(validPayload) }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.sent).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const callArgs = sendMock.mock.calls[0][0];
    expect(callArgs.to).toBe("owner@acmeplumbing.co.nz");
    expect(callArgs.html).toContain("Acme Plumbing Ltd");
  });

  it("ignores any recipient or content supplied outside the token", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });

    await POST(
      makeRequest({
        ...validPayload,
        email: "victim@example.com",
        businessName: "Urgent: call this number",
        token: tokenFor(validPayload),
      })
    );

    const callArgs = sendMock.mock.calls[0][0];
    expect(callArgs.to).toBe("owner@acmeplumbing.co.nz");
    expect(callArgs.html).not.toContain("Urgent: call this number");
  });

  it("refuses the old unsigned payload shape without calling Resend", async () => {
    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("refuses a token whose content has been tampered with", async () => {
    const token = tokenFor(validPayload)!;
    const [data, sig] = token.split(".");
    const decoded = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    decoded.email = "victim@example.com";
    const forged = `${Buffer.from(JSON.stringify(decoded)).toString("base64url")}.${sig}`;

    const response = await POST(makeRequest({ token: forged }));
    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("refuses an expired token with a clear 410", async () => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    const response = await POST(makeRequest({ token: tokenFor(validPayload, twoHoursAgo) }));
    expect(response.status).toBe(410);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 502 and never throws when Resend itself reports an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "boom" } });

    const response = await POST(makeRequest({ token: tokenFor(validPayload) }));
    expect(response.status).toBe(502);
  });

  it("rate limits repeated requests from the same IP", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });
    const token = tokenFor(validPayload);

    for (let i = 0; i < 5; i++) {
      await POST(makeRequest({ token }));
    }
    const response = await POST(makeRequest({ token }));

    expect(response.status).toBe(429);
  });

  it("cannot dodge the rate limit by rotating a spoofed X-Forwarded-For", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });
    const token = tokenFor(validPayload);
    const realIp = { "x-nf-client-connection-ip": "203.0.113.9" };

    for (let i = 0; i < 5; i++) {
      await POST(makeRequest({ token }, { ...realIp, "x-forwarded-for": `10.0.0.${i}` }));
    }
    const response = await POST(makeRequest({ token }, { ...realIp, "x-forwarded-for": "10.0.0.99" }));

    expect(response.status).toBe(429);
  });
});
