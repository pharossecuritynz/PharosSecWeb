import { safeFetch } from "../security/safe-fetch";
import { providerError, providerNotConfigured, providerOk, type ProviderResult } from "./types";

/**
 * Censys provider, targeting the current Platform API v3 (verified directly
 * against docs.censys.com 2026-08-31 — the legacy v2 api.censys.io/v2/hosts
 * endpoint this originally targeted has been retired). Reports
 * "not-configured" unless CENSYS_API_KEY (a Personal Access Token) is set.
 *
 * CENSYS_ORGANIZATION_ID is optional, not required: per Censys's own docs,
 * free-tier accounts don't have an organisation at all (only paid Starter/
 * Search/Core tiers do) — a request with no org ID header simply falls back
 * to free-tier limits rather than being refused, so it's sent only when
 * present. Free tier is heavily rate-limited — see
 * docs/EXTERNAL_PROVIDERS.md before enabling this for real scans.
 */

export interface CensysFindings {
  ip: string;
  services: { port: number; protocol: string; transportProtocol: string }[];
}

const CENSYS_API_BASE = "https://api.platform.censys.io/v3";

interface CensysHostServiceV3 {
  port?: number;
  protocol?: string;
  transport_protocol?: string;
}

interface CensysHostResponseV3 {
  result?: {
    resource?: {
      services?: CensysHostServiceV3[];
    };
  };
}

export async function fetchCensysFindings(ip: string): Promise<ProviderResult<CensysFindings>> {
  const apiKey = process.env.CENSYS_API_KEY;
  const organizationId = process.env.CENSYS_ORGANIZATION_ID;

  if (!apiKey) {
    return providerNotConfigured("censys");
  }

  try {
    const url = new URL(`${CENSYS_API_BASE}/global/asset/host/${ip}`);
    const response = await safeFetch(url.toString(), {
      headers: {
        authorization: `Bearer ${apiKey}`,
        ...(organizationId ? { "x-organization-id": organizationId } : {}),
        accept: "application/vnd.censys.api.v3.host.v1+json",
      },
      timeoutMs: 8000,
    });

    if (!response.ok) {
      return providerError("censys", new Error(`Censys returned HTTP ${response.status}.`));
    }

    const body = (await response.json()) as CensysHostResponseV3;
    const rawServices = body.result?.resource?.services ?? [];

    const services = rawServices
      .filter((s): s is Required<Pick<CensysHostServiceV3, "port">> & CensysHostServiceV3 => typeof s.port === "number")
      .map((s) => ({
        port: s.port,
        protocol: s.protocol ?? "unknown",
        transportProtocol: s.transport_protocol ?? "unknown",
      }));

    return providerOk(
      "censys",
      { ip, services },
      `Previously-observed services for ${ip}, via Censys. Attribution should be treated cautiously — see the architecture doc.`,
      "medium"
    );
  } catch (error) {
    return providerError("censys", error);
  }
}
