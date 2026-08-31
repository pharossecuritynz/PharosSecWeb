import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveTxtMock = vi.fn();
vi.mock("node:dns/promises", () => ({
  default: { resolveTxt: (...args: unknown[]) => resolveTxtMock(...args) },
}));

const fetchDnsFindingsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/providers/dns", () => ({
  fetchDnsFindings: (...args: unknown[]) => fetchDnsFindingsMock(...args),
}));

const fetchDnssecFindingsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/providers/dnssec", () => ({
  fetchDnssecFindings: (...args: unknown[]) => fetchDnssecFindingsMock(...args),
}));

const fetchRegistrationFindingsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/providers/registration", () => ({
  fetchRegistrationFindings: (...args: unknown[]) => fetchRegistrationFindingsMock(...args),
}));

const fetchCtFindingsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/providers/certificate-transparency", () => ({
  fetchCertificateTransparencyFindings: (...args: unknown[]) => fetchCtFindingsMock(...args),
}));

const checkDkimMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/analysis/dkim", () => ({
  checkDkim: (...args: unknown[]) => checkDkimMock(...args),
}));

const classifySubdomainsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/analysis/subdomains", () => ({
  classifySubdomains: (...args: unknown[]) => classifySubdomainsMock(...args),
}));

const checkTakeoverRisksMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/analysis/subdomain-takeover", () => ({
  checkTakeoverRisks: (...args: unknown[]) => checkTakeoverRisksMock(...args),
}));

const { runExposureSnapshotScan } = await import("@/lib/exposure-snapshot/scan");

function okResult<T>(findings: T, provider = "mock") {
  return { status: "ok", provider, checkedAt: new Date().toISOString(), findings, evidence: "", confidence: "high", errors: [] };
}
function unavailableResult(provider = "mock") {
  return { status: "unavailable", provider, checkedAt: new Date().toISOString(), findings: null, evidence: "", confidence: "low", errors: ["unavailable"] };
}

describe("runExposureSnapshotScan", () => {
  beforeEach(() => {
    resolveTxtMock.mockReset();
    fetchDnsFindingsMock.mockReset();
    fetchDnssecFindingsMock.mockReset();
    fetchRegistrationFindingsMock.mockReset();
    fetchCtFindingsMock.mockReset();
    checkDkimMock.mockReset();
    classifySubdomainsMock.mockReset();
    checkTakeoverRisksMock.mockReset();

    // Sensible defaults for a "clean, well-configured" domain.
    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query.startsWith("_dmarc.")) return [["v=DMARC1; p=reject; rua=mailto:reports@example.com"]];
      throw new Error("ENOTFOUND");
    });
    fetchDnsFindingsMock.mockResolvedValue(
      okResult({
        a: ["203.0.113.10"],
        aaaa: [],
        mx: [{ exchange: "aspmx.l.google.com", priority: 1 }],
        txt: [["v=spf1 include:_spf.google.com -all"]],
        ns: ["ns1.example.com"],
        caa: [],
      })
    );
    fetchDnssecFindingsMock.mockResolvedValue(
      okResult({ status: "validated", resolver: "Cloudflare" })
    );
    fetchRegistrationFindingsMock.mockResolvedValue(
      okResult({
        registrar: "Example Registrar",
        registrarUrl: null,
        createdAt: "2020-01-01T00:00:00Z",
        expiresAt: "2030-01-01T00:00:00Z",
        lastUpdatedAt: null,
        status: ["active"],
        nameservers: ["ns1.example.com"],
        source: "rdap",
      })
    );
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["www.example.com"] }));
    checkDkimMock.mockResolvedValue({
      status: "confirmed",
      selectorsChecked: ["google"],
      confirmedSelector: "google",
      evidence: "confirmed",
    });
    classifySubdomainsMock.mockResolvedValue([
      { hostname: "www.example.com", resolutionStatus: "currently-resolving", category: "www" },
    ]);
    checkTakeoverRisksMock.mockResolvedValue([]);
  });

  it("rejects an invalid domain before calling any provider", async () => {
    const result = await runExposureSnapshotScan("localhost");

    expect(result.status).toBe("invalid-domain");
    expect(result.domainError).toBe("is-localhost-or-reserved");
    expect(fetchDnsFindingsMock).not.toHaveBeenCalled();
  });

  it("produces mostly-good findings for a well-configured domain", async () => {
    const result = await runExposureSnapshotScan("example.com");

    expect(result.status).toBe("completed");
    const statuses = result.scan!.findings.map((f) => f.status);
    expect(statuses).not.toContain("high-priority");
  });

  it("every finding has a unique, EXT-prefixed ID", async () => {
    const result = await runExposureSnapshotScan("example.com");

    const ids = result.scan!.findings.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("EXT-"))).toBe(true);
  });

  it("flags a high-priority SPF finding when SPF is missing", async () => {
    fetchDnsFindingsMock.mockResolvedValue(
      okResult({ a: [], aaaa: [], mx: [], txt: [], ns: [], caa: [] })
    );

    const result = await runExposureSnapshotScan("example.com");

    const spfFinding = result.scan!.findings.find((f) => f.controlId === "SPF_MISSING");
    expect(spfFinding?.status).toBe("high-priority");
  });

  it("flags DMARC missing distinctly from DMARC monitoring-only", async () => {
    resolveTxtMock.mockImplementation(async () => {
      throw new Error("ENOTFOUND");
    });

    const result = await runExposureSnapshotScan("example.com");
    const dmarcFinding = result.scan!.findings.find((f) => f.controlId === "DMARC_MISSING");
    expect(dmarcFinding).toBeDefined();
    expect(dmarcFinding?.status).toBe("high-priority");
  });

  it("degrades to a 'not-checked' finding, never a false negative, when the DNS provider is unavailable", async () => {
    fetchDnsFindingsMock.mockResolvedValue(unavailableResult());

    const result = await runExposureSnapshotScan("example.com");

    const spfFinding = result.scan!.findings.find((f) => f.controlId === "SPF_MISSING");
    expect(spfFinding?.status).toBe("not-checked");
  });

  it("degrades to 'not available' registration finding when both RDAP and WHOIS fail, never fails the whole scan", async () => {
    fetchRegistrationFindingsMock.mockResolvedValue(unavailableResult());

    const result = await runExposureSnapshotScan("example.com");

    expect(result.status).toBe("completed");
    const regFinding = result.scan!.findings.find((f) => f.controlId === "REGISTRATION_NOT_AVAILABLE");
    expect(regFinding).toBeDefined();
  });

  it("flags registration expiring within 30 days", async () => {
    const soon = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
    fetchRegistrationFindingsMock.mockResolvedValue(
      okResult({
        registrar: "Example Registrar",
        registrarUrl: null,
        createdAt: null,
        expiresAt: soon,
        lastUpdatedAt: null,
        status: [],
        nameservers: [],
        source: "rdap",
      })
    );

    const result = await runExposureSnapshotScan("example.com");
    const expiryFinding = result.scan!.findings.find((f) => f.controlId === "REGISTRATION_EXPIRING_SOON");
    expect(expiryFinding).toBeDefined();
  });

  it("flags a currently-resolving dev/staging hostname found via certificate transparency", async () => {
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["dev.example.com"] }));
    classifySubdomainsMock.mockResolvedValue([
      { hostname: "dev.example.com", resolutionStatus: "currently-resolving", category: "dev" },
    ]);

    const result = await runExposureSnapshotScan("example.com");
    const devFinding = result.scan!.findings.find((f) => f.controlId === "SUBDOMAIN_NONPRODUCTION_EXPOSED");
    expect(devFinding).toBeDefined();
  });

  it("does NOT flag a historically-observed (non-resolving) dev hostname as currently exposed", async () => {
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["dev.example.com"] }));
    classifySubdomainsMock.mockResolvedValue([
      { hostname: "dev.example.com", resolutionStatus: "historically-observed", category: "dev" },
    ]);

    const result = await runExposureSnapshotScan("example.com");
    const devFinding = result.scan!.findings.find((f) => f.controlId === "SUBDOMAIN_NONPRODUCTION_EXPOSED");
    expect(devFinding).toBeUndefined();
  });

  it("flags CAA_MISSING when no CAA records are found", async () => {
    const result = await runExposureSnapshotScan("example.com");
    const caaFinding = result.scan!.findings.find((f) => f.controlId === "CAA_MISSING");
    expect(caaFinding).toBeDefined();
    expect(caaFinding?.status).toBe("attention");
  });

  it("flags CAA_PRESENT (good) when a CAA record exists", async () => {
    fetchDnsFindingsMock.mockResolvedValue(
      okResult({
        a: ["203.0.113.10"],
        aaaa: [],
        mx: [{ exchange: "aspmx.l.google.com", priority: 1 }],
        txt: [["v=spf1 include:_spf.google.com -all"]],
        ns: ["ns1.example.com"],
        caa: [{ critical: 0, issue: "letsencrypt.org" }],
      })
    );

    const result = await runExposureSnapshotScan("example.com");
    const caaFinding = result.scan!.findings.find((f) => f.controlId === "CAA_PRESENT");
    expect(caaFinding?.status).toBe("good");
  });

  it("flags a subdomain takeover risk as high-priority and reflects it in the internet exposure overview", async () => {
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["old.example.com"] }));
    classifySubdomainsMock.mockResolvedValue([
      { hostname: "old.example.com", resolutionStatus: "historically-observed", category: "old" },
    ]);
    checkTakeoverRisksMock.mockResolvedValue([
      {
        hostname: "old.example.com",
        cnameTarget: "old-example.herokuapp.com",
        matchedService: "Heroku",
        targetResolves: false,
        atRisk: true,
      },
    ]);

    const result = await runExposureSnapshotScan("example.com");

    const takeoverFinding = result.scan!.findings.find((f) => f.controlId === "SUBDOMAIN_TAKEOVER_RISK");
    expect(takeoverFinding?.status).toBe("high-priority");
    expect(takeoverFinding?.riskRating).toBe("high");
    expect(result.overview?.internetExposure).toBe("elevated");
  });

  it("does not flag a takeover risk when the CNAME target still resolves", async () => {
    checkTakeoverRisksMock.mockResolvedValue([
      {
        hostname: "www.example.com",
        cnameTarget: "www-example.herokuapp.com",
        matchedService: "Heroku",
        targetResolves: true,
        atRisk: false,
      },
    ]);

    const result = await runExposureSnapshotScan("example.com");
    const takeoverFinding = result.scan!.findings.find((f) => f.controlId === "SUBDOMAIN_TAKEOVER_RISK");
    expect(takeoverFinding).toBeUndefined();
  });
});
