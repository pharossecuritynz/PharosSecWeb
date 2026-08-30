import { describe, expect, it } from "vitest";
import { isAllowedUrl, isPublicIpAddress } from "@/lib/exposure-snapshot/security/ssrf-guard";

describe("isPublicIpAddress", () => {
  it("rejects RFC1918 private ranges", () => {
    expect(isPublicIpAddress("10.0.0.1")).toBe(false);
    expect(isPublicIpAddress("172.16.0.1")).toBe(false);
    expect(isPublicIpAddress("172.31.255.255")).toBe(false);
    expect(isPublicIpAddress("192.168.1.1")).toBe(false);
  });

  it("rejects loopback", () => {
    expect(isPublicIpAddress("127.0.0.1")).toBe(false);
    expect(isPublicIpAddress("::1")).toBe(false);
  });

  it("rejects link-local", () => {
    expect(isPublicIpAddress("169.254.1.1")).toBe(false);
    expect(isPublicIpAddress("fe80::1")).toBe(false);
  });

  it("rejects the cloud metadata address", () => {
    expect(isPublicIpAddress("169.254.169.254")).toBe(false);
  });

  it("rejects carrier-grade NAT and benchmarking ranges", () => {
    expect(isPublicIpAddress("100.64.0.1")).toBe(false);
    expect(isPublicIpAddress("198.18.0.1")).toBe(false);
  });

  it("rejects IPv4-mapped IPv6 addresses that embed a private IPv4", () => {
    expect(isPublicIpAddress("::ffff:10.0.0.1")).toBe(false);
  });

  it("rejects unique local IPv6 addresses (fc00::/7)", () => {
    expect(isPublicIpAddress("fd12:3456:789a:1::1")).toBe(false);
  });

  it("accepts ordinary public IPv4 addresses", () => {
    expect(isPublicIpAddress("8.8.8.8")).toBe(true);
    expect(isPublicIpAddress("1.1.1.1")).toBe(true);
  });

  it("accepts ordinary public IPv6 addresses", () => {
    expect(isPublicIpAddress("2606:4700:4700::1111")).toBe(true);
  });

  it("rejects a value that isn't a valid IP at all", () => {
    expect(isPublicIpAddress("not-an-ip")).toBe(false);
  });
});

describe("isAllowedUrl", () => {
  it("allows https on the default port", () => {
    expect(isAllowedUrl(new URL("https://example.com/path")).ok).toBe(true);
  });

  it("allows http on the default port", () => {
    expect(isAllowedUrl(new URL("http://example.com/path")).ok).toBe(true);
  });

  it("rejects non-http(s) protocols", () => {
    expect(isAllowedUrl(new URL("file:///etc/passwd")).ok).toBe(false);
    expect(isAllowedUrl(new URL("ftp://example.com")).ok).toBe(false);
    expect(isAllowedUrl(new URL("gopher://example.com")).ok).toBe(false);
  });

  it("rejects a non-standard port", () => {
    expect(isAllowedUrl(new URL("https://example.com:8443/")).ok).toBe(false);
    expect(isAllowedUrl(new URL("http://example.com:22/")).ok).toBe(false);
  });
});
