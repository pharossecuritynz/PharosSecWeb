import { safeFetch } from "../security/safe-fetch";
import { providerError, providerOk, providerUnavailable, type ProviderResult } from "./types";

/**
 * DNSSEC signal check via a validating DNS-over-HTTPS resolver's AD
 * (Authenticated Data) flag, rather than reimplementing chain-of-trust
 * validation from scratch. See docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md
 * ("DNSSEC via a validating resolver's AD flag").
 */

export type DnssecStatus = "validated" | "not-validated" | "unknown";

export interface DnssecFindings {
  status: DnssecStatus;
  resolver: string;
}

interface CloudflareDohResponse {
  Status: number;
  AD?: boolean;
}

const RESOLVER_ENDPOINT = "https://cloudflare-dns.com/dns-query";
const RESOLVER_NAME = "Cloudflare (1.1.1.1) DNS-over-HTTPS resolver";

export async function fetchDnssecFindings(
  hostname: string
): Promise<ProviderResult<DnssecFindings>> {
  try {
    const url = new URL(RESOLVER_ENDPOINT);
    url.searchParams.set("name", hostname);
    url.searchParams.set("type", "A");
    url.searchParams.set("do", "1");
    url.searchParams.set("cd", "0"); // let the resolver validate, don't disable checking

    const response = await safeFetch(url.toString(), {
      headers: { accept: "application/dns-json" },
      timeoutMs: 6000,
    });

    if (!response.ok) {
      return providerUnavailable("dnssec", `Resolver returned HTTP ${response.status}.`);
    }

    const body = (await response.json()) as CloudflareDohResponse;
    const status: DnssecStatus = body.AD === true ? "validated" : body.AD === false ? "not-validated" : "unknown";

    return providerOk(
      "dnssec",
      { status, resolver: RESOLVER_NAME },
      `DNSSEC Authenticated Data flag reported by ${RESOLVER_NAME} for ${hostname}.`,
      "medium"
    );
  } catch (error) {
    return providerError("dnssec", error);
  }
}
