import net from "node:net";
import dns from "node:dns/promises";
import { isPublicIpAddress } from "../security/ssrf-guard";
import { providerError, providerOk, providerUnavailable, type ProviderResult } from "./types";
import type { RegistrationFindings } from "./rdap";

/**
 * WHOIS fallback client, used only for TLDs with no RDAP server (notably
 * .nz — see docs/EXTERNAL_PROVIDERS.md). A minimal, purpose-built raw-socket
 * client against the standard WHOIS protocol (port 43), not HTML scraping,
 * per the build brief's explicit instruction to avoid brittle scraping.
 *
 * The WHOIS server itself is discovered generically via IANA's own referral
 * WHOIS service (whois.iana.org), not a hardcoded per-TLD table, so this
 * works for any TLD RDAP doesn't cover, not just .nz.
 */

const IANA_WHOIS_HOST = "whois.iana.org";
const WHOIS_PORT = 43;
const CONNECT_TIMEOUT_MS = 6000;

async function assertHostIsPublic(host: string): Promise<void> {
  let addresses: string[] = [];
  try {
    addresses = await dns.resolve4(host);
  } catch {
    try {
      addresses = await dns.resolve6(host);
    } catch {
      throw new Error(`Could not resolve WHOIS server ${host}.`);
    }
  }
  if (addresses.length === 0 || addresses.some((addr) => !isPublicIpAddress(addr))) {
    throw new Error(`WHOIS server ${host} did not resolve to a public address.`);
  }
}

function queryWhois(host: string, query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port: WHOIS_PORT });
    const chunks: Buffer[] = [];
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error(`WHOIS query to ${host} timed out.`));
    }, CONNECT_TIMEOUT_MS);

    socket.on("connect", () => {
      socket.write(`${query}\r\n`);
    });
    socket.on("data", (chunk) => chunks.push(chunk));
    socket.on("end", () => {
      clearTimeout(timer);
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    socket.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function parseReferralServer(ianaResponse: string): string | null {
  // IANA's per-TLD WHOIS record uses "refer:" for most gTLDs but "whois:"
  // for many ccTLDs (confirmed directly against whois.iana.org for "nz",
  // which returns "whois: whois.irs.net.nz", not a "refer:" field).
  const match = ianaResponse.match(/^\s*(?:refer|whois):\s*(\S+)/im);
  return match ? match[1] : null;
}

function extractField(raw: string, labels: string[]): string | null {
  for (const label of labels) {
    const pattern = new RegExp(`^${label}:\\s*(.+)$`, "im");
    const match = raw.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}

function extractNameservers(raw: string): string[] {
  const matches = [...raw.matchAll(/^(?:Name Server|nserver):\s*(\S+)/gim)];
  return [...new Set(matches.map((m) => m[1].toLowerCase().replace(/\.$/, "")))];
}

function extractStatuses(raw: string): string[] {
  const matches = [...raw.matchAll(/^(?:Domain Status|status):\s*(\S+)/gim)];
  return [...new Set(matches.map((m) => m[1]))];
}

/** Exposed for unit tests — see __tests__/exposure-snapshot/providers/whois.test.ts. */
export const _testables = {
  parseReferralServer,
  extractField,
  extractNameservers,
  extractStatuses,
};

export async function fetchWhoisFindings(
  registrableDomain: string
): Promise<ProviderResult<RegistrationFindings>> {
  try {
    await assertHostIsPublic(IANA_WHOIS_HOST);
    const tld = registrableDomain.split(".").pop() ?? "";
    const referralResponse = await queryWhois(IANA_WHOIS_HOST, tld);
    const referralServer = parseReferralServer(referralResponse);

    if (!referralServer) {
      return providerUnavailable(
        "whois",
        `IANA WHOIS has no referral server for the "${tld}" TLD.`
      );
    }

    await assertHostIsPublic(referralServer);
    const raw = await queryWhois(referralServer, registrableDomain);

    if (!raw || /no match|not found|no entries found/i.test(raw)) {
      return providerUnavailable("whois", "WHOIS server had no record for this domain.");
    }

    const findings: RegistrationFindings = {
      registrar: extractField(raw, ["Registrar", "registrar name"]),
      registrarUrl: extractField(raw, ["Registrar URL"]),
      createdAt: extractField(raw, ["Creation Date", "created", "Registered on"]),
      expiresAt: extractField(raw, ["Registry Expiry Date", "Expiry Date", "expire", "expires"]),
      lastUpdatedAt: extractField(raw, ["Updated Date", "changed", "last modified"]),
      status: extractStatuses(raw),
      nameservers: extractNameservers(raw),
      source: "whois",
    };

    return providerOk(
      "whois",
      findings,
      `WHOIS lookup at ${referralServer} (referred by ${IANA_WHOIS_HOST}) for ${registrableDomain}.`,
      "medium"
    );
  } catch (error) {
    return providerError("whois", error);
  }
}
