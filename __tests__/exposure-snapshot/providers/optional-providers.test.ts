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
});
