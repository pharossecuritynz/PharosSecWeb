import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchRdapFindingsMock = vi.fn();
const fetchWhoisFindingsMock = vi.fn();

vi.mock("@/lib/exposure-snapshot/providers/rdap", () => ({
  fetchRdapFindings: (...args: unknown[]) => fetchRdapFindingsMock(...args),
}));
vi.mock("@/lib/exposure-snapshot/providers/whois", () => ({
  fetchWhoisFindings: (...args: unknown[]) => fetchWhoisFindingsMock(...args),
}));

const { fetchRegistrationFindings } = await import(
  "@/lib/exposure-snapshot/providers/registration"
);

describe("fetchRegistrationFindings (RDAP with WHOIS fallback)", () => {
  beforeEach(() => {
    fetchRdapFindingsMock.mockReset();
    fetchWhoisFindingsMock.mockReset();
  });

  it("returns the RDAP result directly when RDAP succeeds", async () => {
    fetchRdapFindingsMock.mockResolvedValue({ status: "ok", provider: "rdap" });

    const result = await fetchRegistrationFindings("example.com");

    expect(result).toEqual({ status: "ok", provider: "rdap" });
    expect(fetchWhoisFindingsMock).not.toHaveBeenCalled();
  });

  it("falls back to WHOIS when RDAP is unavailable (e.g. a .nz domain with no RDAP server)", async () => {
    fetchRdapFindingsMock.mockResolvedValue({
      status: "unavailable",
      provider: "rdap",
      errors: ['No RDAP server is registered for the "nz" TLD.'],
    });
    fetchWhoisFindingsMock.mockResolvedValue({ status: "ok", provider: "whois" });

    const result = await fetchRegistrationFindings("example.co.nz");

    expect(fetchWhoisFindingsMock).toHaveBeenCalledWith("example.co.nz");
    expect(result).toEqual({ status: "ok", provider: "whois" });
  });

  it("falls back to WHOIS when RDAP itself errors", async () => {
    fetchRdapFindingsMock.mockResolvedValue({ status: "error", provider: "rdap", errors: ["boom"] });
    fetchWhoisFindingsMock.mockResolvedValue({ status: "unavailable", provider: "whois", errors: [] });

    const result = await fetchRegistrationFindings("example.co.nz");

    expect(fetchWhoisFindingsMock).toHaveBeenCalled();
    expect(result.status).toBe("unavailable");
  });
});
