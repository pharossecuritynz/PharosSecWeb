import { beforeEach, describe, expect, it, vi } from "vitest";

const safeFetchMock = vi.fn();

vi.mock("@/lib/exposure-snapshot/security/safe-fetch", () => ({
  safeFetch: (...args: unknown[]) => safeFetchMock(...args),
}));

const {
  fetchCertificateTransparencyFindings,
  _resetCircuitForTests,
} = await import("@/lib/exposure-snapshot/providers/certificate-transparency");

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

describe("fetchCertificateTransparencyFindings", () => {
  beforeEach(() => {
    safeFetchMock.mockReset();
    _resetCircuitForTests();
  });

  it("extracts, dedupes, and lowercases hostnames scoped to the domain", async () => {
    safeFetchMock.mockResolvedValue(
      jsonResponse([
        { name_value: "WWW.Example.com\nmail.example.com" },
        { name_value: "www.example.com" }, // duplicate
        { common_name: "*.example.com" }, // wildcard, should have the * stripped
        { name_value: "unrelated.other.com" }, // different domain — must be excluded
      ])
    );

    const result = await fetchCertificateTransparencyFindings("example.com");

    expect(result.status).toBe("ok");
    expect(result.findings?.hostnames).toEqual(["example.com", "mail.example.com", "www.example.com"]);
  });

  it("degrades to unavailable, not an error, on a non-OK response", async () => {
    safeFetchMock.mockResolvedValue(jsonResponse([], 503));

    const result = await fetchCertificateTransparencyFindings("example.com");

    expect(result.status).toBe("unavailable");
    expect(result.findings).toBeNull();
  });

  it("trips the circuit breaker after repeated failures and skips further calls", async () => {
    safeFetchMock.mockResolvedValue(jsonResponse([], 500));

    await fetchCertificateTransparencyFindings("example.com");
    await fetchCertificateTransparencyFindings("example.com");
    await fetchCertificateTransparencyFindings("example.com");
    expect(safeFetchMock).toHaveBeenCalledTimes(3);

    // The 4th call should be short-circuited without hitting the network.
    const result = await fetchCertificateTransparencyFindings("example.com");
    expect(result.status).toBe("unavailable");
    expect(safeFetchMock).toHaveBeenCalledTimes(3);
  });

  it("resets the circuit breaker after a success", async () => {
    safeFetchMock
      .mockResolvedValueOnce(jsonResponse([], 500))
      .mockResolvedValueOnce(jsonResponse([], 500))
      .mockResolvedValueOnce(jsonResponse([]))
      .mockResolvedValueOnce(jsonResponse([], 500))
      .mockResolvedValueOnce(jsonResponse([], 500));

    await fetchCertificateTransparencyFindings("example.com"); // fail 1
    await fetchCertificateTransparencyFindings("example.com"); // fail 2
    await fetchCertificateTransparencyFindings("example.com"); // success — resets
    await fetchCertificateTransparencyFindings("example.com"); // fail 1 again
    const result = await fetchCertificateTransparencyFindings("example.com"); // fail 2 again — still under threshold

    expect(result.status).toBe("unavailable");
    expect(safeFetchMock).toHaveBeenCalledTimes(5); // circuit never tripped
  });
});
