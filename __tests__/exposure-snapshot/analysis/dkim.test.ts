import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveTxtMock = vi.fn();

vi.mock("node:dns/promises", () => ({
  default: {
    resolveTxt: (...args: unknown[]) => resolveTxtMock(...args),
  },
}));

const { checkDkim } = await import("@/lib/exposure-snapshot/analysis/dkim");

describe("checkDkim", () => {
  beforeEach(() => {
    resolveTxtMock.mockReset();
  });

  it("never reports 'missing' when a guessed selector simply doesn't resolve — reports not-externally-confirmed instead", async () => {
    resolveTxtMock.mockRejectedValue(new Error("ENOTFOUND"));

    const result = await checkDkim("example.co.nz", "google-workspace");

    expect(result.status).toBe("not-externally-confirmed");
    expect(result.status).not.toBe("missing" as unknown as string);
  });

  it("reports confirmed when a known selector resolves with a valid DKIM record", async () => {
    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query === "google._domainkey.example.co.nz") {
        return [["v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC"]];
      }
      throw new Error("ENOTFOUND");
    });

    const result = await checkDkim("example.co.nz", "google-workspace");

    expect(result.status).toBe("confirmed");
    expect(result.confirmedSelector).toBe("google");
  });

  it("checks both Microsoft 365 default selectors", async () => {
    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query === "selector2._domainkey.example.co.nz") {
        return [["v=DKIM1; k=rsa; p=abc123"]];
      }
      throw new Error("ENOTFOUND");
    });

    const result = await checkDkim("example.co.nz", "microsoft-365");

    expect(result.status).toBe("confirmed");
    expect(result.confirmedSelector).toBe("selector2");
    expect(result.selectorsChecked).toEqual(["selector1", "selector2"]);
  });

  it("reports misconfigured when a selector resolves but isn't a valid DKIM record", async () => {
    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query === "google._domainkey.example.co.nz") {
        return [["this is not a dkim record"]];
      }
      throw new Error("ENOTFOUND");
    });

    const result = await checkDkim("example.co.nz", "google-workspace");

    expect(result.status).toBe("misconfigured");
  });

  it("reports unknown when the mail platform itself could not be identified", async () => {
    const result = await checkDkim("example.co.nz", "unknown");

    expect(result.status).toBe("unknown");
    expect(result.selectorsChecked).toEqual([]);
    expect(resolveTxtMock).not.toHaveBeenCalled();
  });

  it("checks an optional client-supplied selector first", async () => {
    resolveTxtMock.mockImplementation(async (query: string) => {
      if (query === "customselector._domainkey.example.co.nz") {
        return [["v=DKIM1; k=rsa; p=abc123"]];
      }
      throw new Error("ENOTFOUND");
    });

    const result = await checkDkim("example.co.nz", "unknown", "customselector");

    expect(result.status).toBe("confirmed");
    expect(result.confirmedSelector).toBe("customselector");
  });
});
