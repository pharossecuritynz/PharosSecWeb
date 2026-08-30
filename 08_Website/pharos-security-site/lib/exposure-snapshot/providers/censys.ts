import { safeFetch } from "../security/safe-fetch";
import { providerError, providerNotConfigured, providerOk, type ProviderResult } from "./types";

/**
 * Censys provider. Reports "not-configured" unless CENSYS_API_KEY is set.
 * Free tier is heavily rate-limited (250 queries/month) — see
 * docs/EXTERNAL_PROVIDERS.md before enabling this for real scans.
 */

export interface CensysFindings {
  ip: string;
  services: { port: number; serviceName: string }[];
}

export async function fetchCensysFindings(
  ip: string
): Promise<ProviderResult<CensysFindings>> {
  const apiKey = process.env.CENSYS_API_KEY;
  if (!apiKey) {
    return providerNotConfigured("censys");
  }

  try {
    const url = new URL(`https://api.censys.io/v2/hosts/${ip}`);
    const response = await safeFetch(url.toString(), {
      headers: { authorization: `Bearer ${apiKey}` },
      timeoutMs: 8000,
    });

    if (!response.ok) {
      return providerError("censys", new Error(`Censys returned HTTP ${response.status}.`));
    }

    const body = (await response.json()) as {
      result?: { services?: { port: number; service_name?: string }[] };
    };

    const services = (body.result?.services ?? []).map((s) => ({
      port: s.port,
      serviceName: s.service_name ?? "unknown",
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
