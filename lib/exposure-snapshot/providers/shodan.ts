import { safeFetch } from "../security/safe-fetch";
import { providerError, providerNotConfigured, providerOk, type ProviderResult } from "./types";

/**
 * Shodan provider. Reports "not-configured" unless SHODAN_API_KEY is set.
 *
 * Deliberately NOT wired to Shodan's free "InternetDB" endpoint by default:
 * that endpoint's free tier is explicitly licensed for non-commercial use
 * only, and Pharos is a commercial product. See docs/EXTERNAL_PROVIDERS.md
 * before ever enabling this with a real key.
 */

export interface ShodanFindings {
  ip: string;
  ports: number[];
  hostnames: string[];
  tags: string[];
}

export async function fetchShodanFindings(
  ip: string
): Promise<ProviderResult<ShodanFindings>> {
  const apiKey = process.env.SHODAN_API_KEY;
  if (!apiKey) {
    return providerNotConfigured("shodan");
  }

  try {
    const url = new URL(`https://api.shodan.io/shodan/host/${ip}`);
    url.searchParams.set("key", apiKey);

    const response = await safeFetch(url.toString(), { timeoutMs: 8000 });
    if (!response.ok) {
      return providerError("shodan", new Error(`Shodan returned HTTP ${response.status}.`));
    }

    const body = (await response.json()) as {
      ports?: number[];
      hostnames?: string[];
      tags?: string[];
    };

    return providerOk(
      "shodan",
      {
        ip,
        ports: body.ports ?? [],
        hostnames: body.hostnames ?? [],
        tags: body.tags ?? [],
      },
      `Previously-observed services for ${ip}, via Shodan. Attribution should be treated cautiously — see the architecture doc.`,
      "medium"
    );
  } catch (error) {
    return providerError("shodan", error);
  }
}
