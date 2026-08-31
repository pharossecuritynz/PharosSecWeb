import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/exposure-snapshot/security/safe-fetch", () => ({
  safeFetch: vi.fn(),
}));

const { fetchShodanFindings } = await import("@/lib/exposure-snapshot/providers/shodan");
const { fetchCensysFindings } = await import("@/lib/exposure-snapshot/providers/censys");
const { safeFetch } = await import("@/lib/exposure-snapshot/security/safe-fetch");

describe("optional exposure-intelligence providers", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.SHODAN_API_KEY;
    delete process.env.CENSYS_API_KEY;
    delete process.env.CENSYS_ORGANIZATION_ID;
    vi.mocked(safeFetch).mockReset();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("Shodan reports not-configured with no credential, and never calls the network — never causes a scan to fail", async () => {
    const result = await fetchShodanFindings("203.0.113.1");
    expect(result.status).toBe("not-configured");
    expect(safeFetch).not.toHaveBeenCalled();
  });

  it("Censys reports not-configured with no credential, and never calls the network", async () => {
    const result = await fetchCensysFindings("203.0.113.1");
    expect(result.status).toBe("not-configured");
    expect(safeFetch).not.toHaveBeenCalled();
  });

  it("Shodan calls the API once a key is configured", async () => {
    process.env.SHODAN_API_KEY = "test-key";
    vi.mocked(safeFetch).mockResolvedValue(
      new Response(JSON.stringify({ ports: [443], hostnames: [], tags: [] }), { status: 200 })
    );

    const result = await fetchShodanFindings("203.0.113.1");
    expect(result.status).toBe("ok");
    expect(safeFetch).toHaveBeenCalled();
  });

  it("Censys reports not-configured when only the API key is set, without the organization ID (v3 requires both)", async () => {
    process.env.CENSYS_API_KEY = "test-key";
    const result = await fetchCensysFindings("203.0.113.1");
    expect(result.status).toBe("not-configured");
    expect(safeFetch).not.toHaveBeenCalled();
  });

  it("Censys calls the current v3 endpoint with both required headers once fully configured, and parses the services array correctly", async () => {
    process.env.CENSYS_API_KEY = "test-key";
    process.env.CENSYS_ORGANIZATION_ID = "test-org";
    vi.mocked(safeFetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          result: {
            resource: {
              services: [
                { port: 443, protocol: "HTTPS", transport_protocol: "TCP" },
                { port: 22, protocol: "SSH", transport_protocol: "TCP" },
              ],
            },
          },
        }),
        { status: 200 }
      )
    );

    const result = await fetchCensysFindings("203.0.113.1");

    expect(result.status).toBe("ok");
    expect(result.findings?.services).toEqual([
      { port: 443, protocol: "HTTPS", transportProtocol: "TCP" },
      { port: 22, protocol: "SSH", transportProtocol: "TCP" },
    ]);

    const [calledUrl, calledOptions] = vi.mocked(safeFetch).mock.calls[0];
    expect(calledUrl).toContain("api.platform.censys.io/v3/global/asset/host/203.0.113.1");
    expect((calledOptions as { headers: Record<string, string> }).headers["x-organization-id"]).toBe("test-org");
  });
});
