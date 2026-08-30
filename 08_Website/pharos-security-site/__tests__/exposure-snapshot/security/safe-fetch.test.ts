import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const resolve4Mock = vi.fn();
const resolve6Mock = vi.fn();

vi.mock("node:dns/promises", () => ({
  default: {
    resolve4: (...args: unknown[]) => resolve4Mock(...args),
    resolve6: (...args: unknown[]) => resolve6Mock(...args),
  },
}));

// Import after the mock is registered.
const { safeFetch, SafeFetchError } = await import("@/lib/exposure-snapshot/security/safe-fetch");

describe("safeFetch", () => {
  beforeEach(() => {
    resolve4Mock.mockReset();
    resolve6Mock.mockReset();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches successfully when the hostname resolves to a public address", async () => {
    resolve4Mock.mockResolvedValue(["93.184.216.34"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      new Response("ok", { status: 200 })
    );

    const response = await safeFetch("https://example.com/");
    expect(response.status).toBe(200);
  });

  it("rejects a hostname that resolves only to a private address", async () => {
    resolve4Mock.mockResolvedValue(["10.0.0.5"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    await expect(safeFetch("https://internal.example.com/")).rejects.toThrow(SafeFetchError);
  });

  it("rejects a hostname that fails to resolve at all", async () => {
    resolve4Mock.mockRejectedValue(new Error("ENOTFOUND"));
    resolve6Mock.mockRejectedValue(new Error("ENOTFOUND"));

    await expect(safeFetch("https://nonexistent.example.invalid/")).rejects.toThrow(SafeFetchError);
  });

  it("rejects a disallowed protocol before ever resolving DNS", async () => {
    await expect(safeFetch("ftp://example.com/")).rejects.toThrow(SafeFetchError);
    expect(resolve4Mock).not.toHaveBeenCalled();
  });

  it("rejects a non-standard port", async () => {
    await expect(safeFetch("https://example.com:8443/")).rejects.toThrow(SafeFetchError);
  });

  it("re-validates a redirect target and rejects if it points to a private address", async () => {
    // First hop: public example.com redirects to an "internal" host.
    resolve4Mock.mockImplementation(async (hostname: string) => {
      if (hostname === "example.com") return ["93.184.216.34"];
      if (hostname === "internal.example.com") return ["127.0.0.1"];
      throw new Error("ENOTFOUND");
    });
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(null, { status: 302, headers: { location: "https://internal.example.com/" } })
    );

    await expect(safeFetch("https://example.com/")).rejects.toThrow(SafeFetchError);
  });

  it("follows a safe redirect to a safe target", async () => {
    resolve4Mock.mockResolvedValue(["93.184.216.34"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    (fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(
        new Response(null, { status: 301, headers: { location: "https://example.com/final" } })
      )
      .mockResolvedValueOnce(new Response("done", { status: 200 }));

    const response = await safeFetch("https://example.com/start");
    expect(response.status).toBe(200);
  });

  it("gives up after the maximum number of redirects", async () => {
    resolve4Mock.mockResolvedValue(["93.184.216.34"]);
    resolve6Mock.mockRejectedValue(new Error("no AAAA"));

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      new Response(null, { status: 302, headers: { location: "https://example.com/next" } })
    );

    await expect(safeFetch("https://example.com/start", { maxRedirects: 2 })).rejects.toThrow(
      SafeFetchError
    );
  });
});
