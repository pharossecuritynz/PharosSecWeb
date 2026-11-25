import { describe, expect, it } from "vitest";
import { getClientIp } from "@/lib/exposure-snapshot/security/client-ip";

describe("getClientIp", () => {
  it("prefers Netlify's connection IP over any forwarded header", () => {
    const headers = new Headers({
      "x-nf-client-connection-ip": "203.0.113.9",
      "x-forwarded-for": "1.2.3.4, 203.0.113.9",
    });
    expect(getClientIp(headers)).toBe("203.0.113.9");
  });

  it("uses the rightmost X-Forwarded-For entry, not the client-supplied leftmost one", () => {
    const headers = new Headers({ "x-forwarded-for": "6.6.6.6, 198.51.100.7" });
    expect(getClientIp(headers)).toBe("198.51.100.7");
  });

  it("falls back to x-real-ip, then a shared bucket", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "198.51.100.8" }))).toBe("198.51.100.8");
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
