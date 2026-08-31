import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveCnameMock = vi.fn();
const resolve4Mock = vi.fn();
const resolve6Mock = vi.fn();

vi.mock("node:dns/promises", () => ({
  default: {
    resolveCname: (...args: unknown[]) => resolveCnameMock(...args),
    resolve4: (...args: unknown[]) => resolve4Mock(...args),
    resolve6: (...args: unknown[]) => resolve6Mock(...args),
  },
}));

const { checkTakeoverRisk, checkTakeoverRisks } = await import(
  "@/lib/exposure-snapshot/analysis/subdomain-takeover"
);

describe("checkTakeoverRisk", () => {
  beforeEach(() => {
    resolveCnameMock.mockReset();
    resolve4Mock.mockReset();
    resolve6Mock.mockReset();
  });

  it("reports no risk when the hostname has no CNAME at all", async () => {
    resolveCnameMock.mockRejectedValue(new Error("ENODATA"));

    const result = await checkTakeoverRisk("www.example.com");

    expect(result.atRisk).toBe(false);
    expect(result.cnameTarget).toBeNull();
  });

  it("reports no risk when the CNAME target doesn't match any known vulnerable service", async () => {
    resolveCnameMock.mockResolvedValue(["some-internal-host.example-corp.com"]);

    const result = await checkTakeoverRisk("app.example.com");

    expect(result.atRisk).toBe(false);
    expect(result.matchedService).toBeNull();
  });

  it("flags at-risk when the CNAME matches a known service and the target does not resolve", async () => {
    resolveCnameMock.mockResolvedValue(["old-app.herokuapp.com"]);
    resolve4Mock.mockRejectedValue(new Error("ENOTFOUND"));
    resolve6Mock.mockRejectedValue(new Error("ENOTFOUND"));

    const result = await checkTakeoverRisk("old.example.com");

    expect(result.atRisk).toBe(true);
    expect(result.matchedService).toBe("Heroku");
    expect(result.targetResolves).toBe(false);
  });

  it("does NOT flag at-risk when the CNAME matches a known service but the target still resolves (still claimed)", async () => {
    resolveCnameMock.mockResolvedValue(["active-app.herokuapp.com"]);
    resolve4Mock.mockResolvedValue(["203.0.113.5"]);
    resolve6Mock.mockRejectedValue(new Error("ENODATA"));

    const result = await checkTakeoverRisk("app.example.com");

    expect(result.atRisk).toBe(false);
    expect(result.matchedService).toBe("Heroku");
    expect(result.targetResolves).toBe(true);
  });

  it("matches several other known service patterns", async () => {
    resolve4Mock.mockRejectedValue(new Error("ENOTFOUND"));
    resolve6Mock.mockRejectedValue(new Error("ENOTFOUND"));

    resolveCnameMock.mockResolvedValueOnce(["myapp.github.io"]);
    expect((await checkTakeoverRisk("docs.example.com")).matchedService).toBe("GitHub Pages");

    resolveCnameMock.mockResolvedValueOnce(["mybucket.s3.amazonaws.com"]);
    expect((await checkTakeoverRisk("assets.example.com")).matchedService).toBe("AWS S3");

    resolveCnameMock.mockResolvedValueOnce(["myapp.azurewebsites.net"]);
    expect((await checkTakeoverRisk("portal.example.com")).matchedService).toBe("Azure App Service");
  });
});

describe("checkTakeoverRisks", () => {
  beforeEach(() => {
    resolveCnameMock.mockReset();
    resolve4Mock.mockReset();
    resolve6Mock.mockReset();
  });

  it("dedupes hostnames and checks each once", async () => {
    resolveCnameMock.mockRejectedValue(new Error("ENODATA"));

    const results = await checkTakeoverRisks(["a.example.com", "A.example.com", "b.example.com"]);

    expect(results).toHaveLength(2);
    expect(resolveCnameMock).toHaveBeenCalledTimes(2);
  });
});
