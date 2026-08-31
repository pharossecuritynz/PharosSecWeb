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

const fetchShodanFindingsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/providers/shodan", () => ({
  fetchShodanFindings: (...args: unknown[]) => fetchShodanFindingsMock(...args),
}));

const fetchCensysFindingsMock = vi.fn();
vi.mock("@/lib/exposure-snapshot/providers/censys", () => ({
  fetchCensysFindings: (...args: unknown[]) => fetchCensysFindingsMock(...args),
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
    fetchShodanFindingsMock.mockReset();
    fetchCensysFindingsMock.mockReset();

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
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["www.example.com"], mostRecentCertificate: null }));
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
    fetchShodanFindingsMock.mockResolvedValue({
      status: "not-configured",
      provider: "shodan",
      checkedAt: new Date().toISOString(),
      findings: null,
      evidence: "",
      confidence: "low",
      errors: ["No credentials configured for this provider."],
    });
    fetchCensysFindingsMock.mockResolvedValue({
      status: "not-configured",
      provider: "censys",
      checkedAt: new Date().toISOString(),
      findings: null,
      evidence: "",
      confidence: "low",
      errors: ["No credentials configured for this provider."],
    });
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
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["dev.example.com"], mostRecentCertificate: null }));
    classifySubdomainsMock.mockResolvedValue([
      { hostname: "dev.example.com", resolutionStatus: "currently-resolving", category: "dev" },
    ]);

    const result = await runExposureSnapshotScan("example.com");
    const devFinding = result.scan!.findings.find((f) => f.controlId === "SUBDOMAIN_NONPRODUCTION_EXPOSED");
    expect(devFinding).toBeDefined();
  });

  it("does NOT flag a historically-observed (non-resolving) dev hostname as currently exposed", async () => {
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["dev.example.com"], mostRecentCertificate: null }));
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
    fetchCtFindingsMock.mockResolvedValue(okResult({ hostnames: ["old.example.com"], mostRecentCertificate: null }));
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

  it("flags MTA-STS missing by default, and present when the record exists", async () => {
    const missing = await runExposureSnapshotScan("example.com");
    expect(missing.scan!.findings.find((f) => f.controlId === "MTA_STS_MISSING")).toBeDefined();

    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query.startsWith("_dmarc.")) return [["v=DMARC1; p=reject"]];
      if (query.startsWith("_mta-sts.")) return [["v=STSv1; id=20260101000000Z"]];
      throw new Error("ENOTFOUND");
    });
    const present = await runExposureSnapshotScan("example.com");
    const finding = present.scan!.findings.find((f) => f.controlId === "MTA_STS_PRESENT");
    expect(finding?.status).toBe("good");
  });

  it("never flags BIMI absence as a finding — only reports it when present", async () => {
    const missing = await runExposureSnapshotScan("example.com");
    expect(missing.scan!.findings.some((f) => f.concept === "bimi")).toBe(false);

    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query.startsWith("_dmarc.")) return [["v=DMARC1; p=reject"]];
      if (query.startsWith("default._bimi.")) return [["v=BIMI1; l=https://example.com/logo.svg"]];
      throw new Error("ENOTFOUND");
    });
    const present = await runExposureSnapshotScan("example.com");
    expect(present.scan!.findings.find((f) => f.controlId === "BIMI_PRESENT")?.status).toBe("good");
  });

  it("flags a current certificate as good, and reports the matched name/dates", async () => {
    fetchCtFindingsMock.mockResolvedValue(
      okResult({
        hostnames: ["www.example.com"],
        mostRecentCertificate: {
          matchedName: "example.com",
          notBefore: new Date().toISOString(),
          notAfter: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        },
      })
    );

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "CERTIFICATE_CURRENT");
    expect(finding?.status).toBe("good");
  });

  it("flags an expired most-recent certificate as needing attention", async () => {
    fetchCtFindingsMock.mockResolvedValue(
      okResult({
        hostnames: ["www.example.com"],
        mostRecentCertificate: {
          matchedName: "example.com",
          notBefore: "2020-01-01T00:00:00Z",
          notAfter: "2020-04-01T00:00:00Z",
        },
      })
    );

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "CERTIFICATE_STALE_OR_EXPIRED");
    expect(finding?.status).toBe("attention");
  });

  it("flags CERTIFICATE_NOT_FOUND when no matching certificate exists in CT logs", async () => {
    fetchCtFindingsMock.mockResolvedValue(
      okResult({ hostnames: ["mail.example.com"], mostRecentCertificate: null })
    );

    const result = await runExposureSnapshotScan("example.com");
    expect(result.scan!.findings.find((f) => f.controlId === "CERTIFICATE_NOT_FOUND")).toBeDefined();
  });

  it("reports internet exposure as not-checked when neither Shodan nor Censys is configured", async () => {
    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "INTERNET_EXPOSURE_NOT_CHECKED");
    expect(finding?.status).toBe("not-checked");
  });

  it("still produces a real finding from Censys alone when Shodan isn't configured", async () => {
    fetchCensysFindingsMock.mockResolvedValue({
      status: "ok",
      provider: "censys",
      checkedAt: new Date().toISOString(),
      findings: { ip: "203.0.113.10", services: [{ port: 3389, protocol: "RDP", transportProtocol: "TCP" }] },
      evidence: "",
      confidence: "medium",
      errors: [],
    });

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "INTERNET_EXPOSURE_CRITICAL");
    expect(finding).toBeDefined();
    expect(finding?.evidence.citation).toContain("Censys");
    expect(finding?.evidence.citation).not.toContain("Shodan");
  });

  it("merges ports from both Shodan and Censys into a single combined finding, citing both", async () => {
    fetchShodanFindingsMock.mockResolvedValue({
      status: "ok",
      provider: "shodan",
      checkedAt: new Date().toISOString(),
      findings: { ip: "203.0.113.10", ports: [443], hostnames: [], tags: [] },
      evidence: "",
      confidence: "medium",
      errors: [],
    });
    fetchCensysFindingsMock.mockResolvedValue({
      status: "ok",
      provider: "censys",
      checkedAt: new Date().toISOString(),
      findings: { ip: "203.0.113.10", services: [{ port: 22, protocol: "SSH", transportProtocol: "TCP" }] },
      evidence: "",
      confidence: "medium",
      errors: [],
    });

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "INTERNET_EXPOSURE_SENSITIVE");
    expect(finding).toBeDefined();
    expect(finding?.observation).toContain("22");
    expect(finding?.evidence.citation).toContain("Shodan");
    expect(finding?.evidence.citation).toContain("Censys");
  });

  it("flags routine web-only ports as good when Shodan is configured", async () => {
    fetchShodanFindingsMock.mockResolvedValue({
      status: "ok",
      provider: "shodan",
      checkedAt: new Date().toISOString(),
      findings: { ip: "203.0.113.10", ports: [80, 443], hostnames: [], tags: [] },
      evidence: "",
      confidence: "medium",
      errors: [],
    });

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "INTERNET_EXPOSURE_ROUTINE");
    expect(finding?.status).toBe("good");
  });

  it("flags RDP as high-priority (critical) internet exposure and reflects it in the overview", async () => {
    fetchShodanFindingsMock.mockResolvedValue({
      status: "ok",
      provider: "shodan",
      checkedAt: new Date().toISOString(),
      findings: { ip: "203.0.113.10", ports: [443, 3389], hostnames: [], tags: [] },
      evidence: "",
      confidence: "medium",
      errors: [],
    });

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "INTERNET_EXPOSURE_CRITICAL");
    expect(finding?.status).toBe("high-priority");
    expect(result.overview?.internetExposure).toBe("elevated");
  });

  it("flags SSH/database ports as needing attention (sensitive, not critical)", async () => {
    fetchShodanFindingsMock.mockResolvedValue({
      status: "ok",
      provider: "shodan",
      checkedAt: new Date().toISOString(),
      findings: { ip: "203.0.113.10", ports: [22, 3306], hostnames: [], tags: [] },
      evidence: "",
      confidence: "medium",
      errors: [],
    });

    const result = await runExposureSnapshotScan("example.com");
    const finding = result.scan!.findings.find((f) => f.controlId === "INTERNET_EXPOSURE_SENSITIVE");
    expect(finding?.status).toBe("attention");
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
