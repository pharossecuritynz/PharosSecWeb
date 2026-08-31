import { beforeEach, describe, expect, it } from "vitest";
import { _resetRateLimitStateForTests, checkRateLimit } from "@/lib/exposure-snapshot/security/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    _resetRateLimitStateForTests();
  });

  it("allows requests up to the limit", () => {
    const now = 1000;
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4", now).allowed).toBe(true);
    }
  });

  it("blocks the request once the limit is exceeded within the window", () => {
    const now = 1000;
    for (let i = 0; i < 5; i++) checkRateLimit("1.2.3.4", now);
    const result = checkRateLimit("1.2.3.4", now);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("resets after the window elapses", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("1.2.3.4", 1000);
    expect(checkRateLimit("1.2.3.4", 1000).allowed).toBe(false);

    const result = checkRateLimit("1.2.3.4", 1000 + 61_000);
    expect(result.allowed).toBe(true);
  });

  it("tracks separate keys (IPs) independently", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("1.2.3.4", 1000);
    expect(checkRateLimit("1.2.3.4", 1000).allowed).toBe(false);
    expect(checkRateLimit("5.6.7.8", 1000).allowed).toBe(true);
  });
});
