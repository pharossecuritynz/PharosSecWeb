import { beforeEach, describe, expect, it, vi } from "vitest";

const resolve4Mock = vi.fn();
const resolve6Mock = vi.fn();

vi.mock("node:dns/promises", () => ({
  default: {
    resolve4: (...args: unknown[]) => resolve4Mock(...args),
    resolve6: (...args: unknown[]) => resolve6Mock(...args),
  },
}));

const { classifySubdomains, categorizeHostname } = await import(
  "@/lib/exposure-snapshot/analysis/subdomains"
);

describe("categorizeHostname", () => {
  it.each([
    ["www.example.com", "www"],
    ["mail.example.com", "mail"],
    ["vpn.example.com", "vpn"],
    ["portal.example.com", "portal"],
    ["api.example.com", "api"],
    ["dev.example.com", "dev"],
    ["staging.example.com", "staging"],
    ["old.example.com", "old"],
    ["legacy.example.com", "legacy"],
    ["admin.example.com", "admin"],
    ["something-unrelated.example.com", "other"],
  ])("categorizes %s as %s", (hostname, expected) => {
    expect(categorizeHostname(hostname)).toBe(expected);
  });
});

describe("classifySubdomains", () => {
  beforeEach(() => {
    resolve4Mock.mockReset();
    resolve6Mock.mockReset();
  });

  it("marks a resolving hostname as currently-resolving", async () => {
    resolve4Mock.mockResolvedValue(["203.0.113.1"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    const result = await classifySubdomains(["www.example.com"]);

    expect(result[0].resolutionStatus).toBe("currently-resolving");
  });

  it("marks a non-resolving hostname as historically-observed, never claims a live vulnerability", async () => {
    resolve4Mock.mockRejectedValue(new Error("ENOTFOUND"));
    resolve6Mock.mockRejectedValue(new Error("ENOTFOUND"));

    const result = await classifySubdomains(["old.example.com"]);

    expect(result[0].resolutionStatus).toBe("historically-observed");
  });

  it("deduplicates and lowercases hostnames", async () => {
    resolve4Mock.mockResolvedValue(["203.0.113.1"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    const result = await classifySubdomains(["WWW.example.com", "www.example.com"]);

    expect(result).toHaveLength(1);
  });

  it("marks hostnames beyond the resolution cap as unknown rather than silently dropping them", async () => {
    resolve4Mock.mockResolvedValue(["203.0.113.1"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    const many = Array.from({ length: 65 }, (_, i) => `sub${i}.example.com`);
    const result = await classifySubdomains(many);

    expect(result).toHaveLength(65);
    const uncheckedCount = result.filter((r) => r.resolutionStatus === "unknown").length;
    expect(uncheckedCount).toBe(5);
  });
});
