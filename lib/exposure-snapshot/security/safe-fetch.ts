import dns from "node:dns/promises";
import { isAllowedUrl, isPublicIpAddress } from "./ssrf-guard";

/**
 * SSRF-safe fetch wrapper. Every provider that makes an HTTP request driven
 * by user-supplied domain input goes through this, per
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md ("SSRF protection").
 *
 * - Resolves the hostname and rejects private/reserved/loopback/link-local/
 *   cloud-metadata addresses before connecting.
 * - Re-validates the resolved address after every redirect hop — a redirect
 *   target is never trusted just because the original hostname was safe.
 * - Restricts scheme to http/https and disallows non-standard ports.
 * - Applies a hard timeout.
 */

export class SafeFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SafeFetchError";
  }
}

export interface SafeFetchOptions {
  timeoutMs?: number;
  maxRedirects?: number;
  headers?: Record<string, string>;
}

const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_MAX_REDIRECTS = 3;

async function assertHostnameResolvesPublicly(hostname: string): Promise<void> {
  let addresses: string[];
  try {
    const [v4, v6] = await Promise.allSettled([
      dns.resolve4(hostname),
      dns.resolve6(hostname),
    ]);
    addresses = [
      ...(v4.status === "fulfilled" ? v4.value : []),
      ...(v6.status === "fulfilled" ? v6.value : []),
    ];
  } catch {
    addresses = [];
  }

  if (addresses.length === 0) {
    throw new SafeFetchError(`Could not resolve hostname: ${hostname}`);
  }

  const unsafe = addresses.filter((addr) => !isPublicIpAddress(addr));
  if (unsafe.length > 0) {
    throw new SafeFetchError(
      `Hostname ${hostname} resolves to a non-public address and was blocked.`
    );
  }
}

async function assertUrlIsSafe(url: URL): Promise<void> {
  const allowed = isAllowedUrl(url);
  if (!allowed.ok) {
    throw new SafeFetchError(allowed.reason ?? "URL is not allowed.");
  }
  await assertHostnameResolvesPublicly(url.hostname);
}

/**
 * Fetch a URL with SSRF protections and a hard timeout, following redirects
 * manually so every hop is re-validated before being followed.
 */
export async function safeFetch(
  inputUrl: string,
  options: SafeFetchOptions = {}
): Promise<Response> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxRedirects = options.maxRedirects ?? DEFAULT_MAX_REDIRECTS;

  let currentUrl: URL;
  try {
    currentUrl = new URL(inputUrl);
  } catch {
    throw new SafeFetchError(`Invalid URL: ${inputUrl}`);
  }

  for (let hop = 0; hop <= maxRedirects; hop++) {
    await assertUrlIsSafe(currentUrl);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(currentUrl, {
        redirect: "manual",
        signal: controller.signal,
        headers: options.headers,
      });
    } catch (error) {
      if (controller.signal.aborted) {
        throw new SafeFetchError(`Request to ${currentUrl.hostname} timed out.`);
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }

    const isRedirect = response.status >= 300 && response.status < 400;
    if (!isRedirect) {
      return response;
    }

    const location = response.headers.get("location");
    if (!location) {
      throw new SafeFetchError("Redirect response had no Location header.");
    }

    currentUrl = new URL(location, currentUrl);
  }

  throw new SafeFetchError(`Too many redirects (max ${maxRedirects}).`);
}
