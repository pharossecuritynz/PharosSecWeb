import { fetchRdapFindings, type RegistrationFindings } from "./rdap";
import { fetchWhoisFindings } from "./whois";
import type { ProviderResult } from "./types";

/**
 * Domain registration lookup: RDAP first, WHOIS fallback.
 * See docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md ("RDAP with a WHOIS fallback").
 */
export async function fetchRegistrationFindings(
  registrableDomain: string
): Promise<ProviderResult<RegistrationFindings>> {
  const rdapResult = await fetchRdapFindings(registrableDomain);
  if (rdapResult.status === "ok") {
    return rdapResult;
  }

  const whoisResult = await fetchWhoisFindings(registrableDomain);
  return whoisResult;
}
