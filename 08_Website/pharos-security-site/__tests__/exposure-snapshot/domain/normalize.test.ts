import { describe, expect, it } from "vitest";
import { validateAndNormalizeDomain } from "@/lib/exposure-snapshot/domain/normalize";

describe("validateAndNormalizeDomain", () => {
  it("accepts a bare domain", () => {
    const result = validateAndNormalizeDomain("example.com");
    expect(result.ok).toBe(true);
    expect(result.value?.hostname).toBe("example.com");
    expect(result.value?.registrableDomain).toBe("example.com");
  });

  it("correctly handles a co.nz domain (multi-label public suffix)", () => {
    const result = validateAndNormalizeDomain("acmeplumbing.co.nz");
    expect(result.ok).toBe(true);
    expect(result.value?.registrableDomain).toBe("acmeplumbing.co.nz");
    expect(result.value?.publicSuffix).toBe("co.nz");
  });

  it("correctly handles a subdomain of a co.nz domain", () => {
    const result = validateAndNormalizeDomain("mail.acmeplumbing.co.nz");
    expect(result.ok).toBe(true);
    expect(result.value?.hostname).toBe("mail.acmeplumbing.co.nz");
    expect(result.value?.registrableDomain).toBe("acmeplumbing.co.nz");
  });

  it("strips a protocol and path from a pasted URL", () => {
    const result = validateAndNormalizeDomain("https://example.co.nz/some/path?query=1");
    expect(result.ok).toBe(true);
    expect(result.value?.hostname).toBe("example.co.nz");
    expect(result.value?.hadExtraneousInput).toBe(true);
  });

  it("lowercases and trims a trailing dot", () => {
    const result = validateAndNormalizeDomain("  Example.CO.NZ.  ");
    expect(result.ok).toBe(true);
    expect(result.value?.hostname).toBe("example.co.nz");
  });

  it("rejects empty input", () => {
    expect(validateAndNormalizeDomain("").ok).toBe(false);
    expect(validateAndNormalizeDomain("   ").error).toBe("empty");
  });

  it("rejects an IPv4 address", () => {
    const result = validateAndNormalizeDomain("203.0.113.5");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("is-ip-address");
  });

  it("rejects an IPv6 address", () => {
    const result = validateAndNormalizeDomain("2001:db8::1");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("is-ip-address");
  });

  it("rejects localhost", () => {
    const result = validateAndNormalizeDomain("localhost");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("is-localhost-or-reserved");
  });

  it("rejects a .local hostname", () => {
    const result = validateAndNormalizeDomain("myserver.local");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("is-localhost-or-reserved");
  });

  it("rejects a bare public suffix with no registrable label", () => {
    const result = validateAndNormalizeDomain("co.nz");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("not-a-registrable-domain");
  });

  it("accepts a syntactically valid domain under an unrecognised TLD (tldts is permissive by design; DNS lookups downstream simply won't resolve, which is a safe, handled outcome)", () => {
    const result = validateAndNormalizeDomain("something.notarealtld");
    expect(result.ok).toBe(true);
    expect(result.value?.registrableDomain).toBe("something.notarealtld");
  });

  it("rejects input with no dot at all — not a registrable domain", () => {
    const result = validateAndNormalizeDomain("justaword");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("not-a-registrable-domain");
  });

  it("rejects a domain with an explicit port", () => {
    const result = validateAndNormalizeDomain("example.com:8080");
    expect(result.ok).toBe(false);
  });

  it("handles an IDN domain by converting to punycode", () => {
    const result = validateAndNormalizeDomain("café.com");
    expect(result.ok).toBe(true);
    expect(result.value?.hostname.startsWith("xn--")).toBe(true);
  });

  it("rejects garbage input with spaces", () => {
    const result = validateAndNormalizeDomain("not a domain at all");
    expect(result.ok).toBe(false);
  });
});
