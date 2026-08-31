import dns from "node:dns/promises";
import { validateAndNormalizeDomain } from "./domain/normalize";
import { fetchDnsFindings } from "./providers/dns";
import { fetchDnssecFindings } from "./providers/dnssec";
import { fetchRegistrationFindings } from "./providers/registration";
import { fetchCertificateTransparencyFindings } from "./providers/certificate-transparency";
import type { ProviderResult } from "./providers/types";
import { parseSpf, classifySpfQuality } from "./analysis/spf";
import { parseDmarc, classifyDmarcQuality } from "./analysis/dmarc";
import { detectMailPlatform } from "./analysis/mail-platform";
import { checkDkim } from "./analysis/dkim";
import { classifySubdomains } from "./analysis/subdomains";
import { checkTakeoverRisks } from "./analysis/subdomain-takeover";
import { classifyCaa } from "./analysis/caa";
import { classifyInternetExposure } from "./analysis/internet-exposure";
import { fetchShodanFindings } from "./providers/shodan";
import { FindingIdAllocator, buildFinding } from "./findings/build-finding";
import type { Finding, ScanFindings } from "./findings/types";
import { buildExposureOverview, type ExposureOverview } from "./findings/overview";
import { buildExecutiveSummary, type ExecutiveSummary } from "./findings/executive-summary";

export type ScanResultStatus = "completed" | "invalid-domain";

export interface ScanResult {
  status: ScanResultStatus;
  domainError?: string;
  scan?: ScanFindings;
  overview?: ExposureOverview;
  executiveSummary?: ExecutiveSummary;
  /** Raw provider results, kept for a future technical-details report layer. Not shown in the primary report. */
  raw?: {
    dns: ProviderResult<unknown>;
    dnssec: ProviderResult<unknown>;
    registration: ProviderResult<unknown>;
    certificateTransparency: ProviderResult<unknown>;
  };
}

async function fetchTxtRecords(query: string): Promise<string[]> {
  try {
    const records = await dns.resolveTxt(query);
    return records.map((r) => r.join(""));
  } catch {
    return [];
  }
}

/**
 * Run a full Exposure Snapshot scan for one domain. Pure, testable, no HTTP
 * surface — see docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md ("Scan flow").
 * Every provider failure degrades to a "not-checked" finding rather than
 * failing the whole scan.
 */
export async function runExposureSnapshotScan(rawDomainInput: string): Promise<ScanResult> {
  const validation = validateAndNormalizeDomain(rawDomainInput);
  if (!validation.ok || !validation.value) {
    return { status: "invalid-domain", domainError: validation.error };
  }

  const { hostname, registrableDomain } = validation.value;
  const scanStartedAt = new Date().toISOString();
  const allocator = new FindingIdAllocator();
  const findings: Finding[] = [];

  const [dnsResult, dnssecResult, registrationResult, ctResult, dmarcTxt, mtaStsTxt, bimiTxt] = await Promise.all([
    fetchDnsFindings(hostname),
    fetchDnssecFindings(hostname),
    fetchRegistrationFindings(registrableDomain),
    fetchCertificateTransparencyFindings(registrableDomain),
    fetchTxtRecords(`_dmarc.${hostname}`),
    fetchTxtRecords(`_mta-sts.${hostname}`),
    fetchTxtRecords(`default._bimi.${hostname}`),
  ]);

  // --- SPF ---
  if (dnsResult.status === "ok" && dnsResult.findings) {
    const txt = dnsResult.findings.txt.map((segments) => segments.join(""));
    const spf = parseSpf(txt);
    const quality = classifySpfQuality(spf);

    if (!spf.present) {
      findings.push(
        buildFinding(allocator, {
          controlId: "SPF_MISSING",
          observation: `No SPF (v=spf1) TXT record was found for ${hostname}.`,
          evidenceType: "external-observation",
          evidenceCitation: `DNS TXT lookup for ${hostname}.`,
          confidence: "high",
        })
      );
    } else if (spf.malformed) {
      findings.push(
        buildFinding(allocator, {
          controlId: "SPF_MALFORMED",
          observation:
            spf.recordCount > 1
              ? `${spf.recordCount} separate SPF records were found for ${hostname}; RFC 7208 treats this as invalid.`
              : `The SPF record for ${hostname} could not be reliably parsed.`,
          evidenceType: "external-observation",
          evidenceCitation: spf.raw.join(" | "),
          confidence: "high",
        })
      );
    } else {
      const controlId =
        quality === "good"
          ? "SPF_GOOD"
          : spf.allQualifier === "pass"
            ? "SPF_PASS_ALL"
            : spf.exceedsLookupLimit
              ? "SPF_LOOKUP_LIMIT_EXCEEDED"
              : "SPF_SOFT_OR_NEUTRAL";
      findings.push(
        buildFinding(allocator, {
          controlId,
          observation: `SPF record: "${spf.raw[0]}".`,
          evidenceType: "external-observation",
          evidenceCitation: `DNS TXT lookup for ${hostname}.`,
          confidence: "high",
        })
      );
    }
  } else {
    findings.push(
      buildFinding(allocator, {
        controlId: "SPF_MISSING",
        observation: "SPF could not be checked because the DNS lookup for this domain did not succeed.",
        evidenceType: "external-observation",
        evidenceCitation: "DNS provider unavailable during this scan.",
        confidence: "low",
        overrides: { status: "not-checked", priority: "monitor", riskRating: "informational" },
      })
    );
  }

  // --- DMARC ---
  const dmarc = parseDmarc(dmarcTxt);
  const dmarcQuality = classifyDmarcQuality(dmarc);
  const dmarcControlId = !dmarc.present
    ? "DMARC_MISSING"
    : dmarc.classification === "malformed"
      ? "DMARC_MALFORMED"
      : dmarcQuality === "good"
        ? "DMARC_STRONG"
        : "DMARC_MONITORING_ONLY";
  findings.push(
    buildFinding(allocator, {
      controlId: dmarcControlId,
      observation: dmarc.present
        ? `DMARC record: "${dmarc.raw}".`
        : `No DMARC (_dmarc.${hostname}) TXT record was found.`,
      evidenceType: "external-observation",
      evidenceCitation: `DNS TXT lookup for _dmarc.${hostname}.`,
      confidence: "high",
    })
  );

  // --- MTA-STS ---
  const mtaStsPresent = mtaStsTxt.some((r) => /^v=STSv1/i.test(r.trim()));
  findings.push(
    buildFinding(allocator, {
      controlId: mtaStsPresent ? "MTA_STS_PRESENT" : "MTA_STS_MISSING",
      observation: mtaStsPresent
        ? `MTA-STS policy record found at _mta-sts.${hostname}.`
        : `No MTA-STS (_mta-sts.${hostname}) TXT record was found.`,
      evidenceType: "external-observation",
      evidenceCitation: `DNS TXT lookup for _mta-sts.${hostname}.`,
      confidence: "high",
    })
  );

  // --- BIMI --- only reported when present (see knowledge-base.ts: absence isn't
  // a meaningful gap for a small business, so it isn't turned into a nag).
  const bimiPresent = bimiTxt.some((r) => /^v=BIMI1/i.test(r.trim()));
  if (bimiPresent) {
    findings.push(
      buildFinding(allocator, {
        controlId: "BIMI_PRESENT",
        observation: `BIMI record found at default._bimi.${hostname}.`,
        evidenceType: "external-observation",
        evidenceCitation: `DNS TXT lookup for default._bimi.${hostname}.`,
        confidence: "high",
      })
    );
  }

  // --- Mail platform + DKIM ---
  const mxExchanges =
    dnsResult.status === "ok" && dnsResult.findings ? dnsResult.findings.mx.map((m) => m.exchange) : [];
  const mailPlatform = detectMailPlatform(mxExchanges);
  const dkim = await checkDkim(hostname, mailPlatform.provider);

  const dkimControlId =
    dkim.status === "confirmed"
      ? "DKIM_CONFIRMED"
      : dkim.status === "misconfigured"
        ? "DKIM_MISCONFIGURED"
        : "DKIM_NOT_CONFIRMED";
  findings.push(
    buildFinding(allocator, {
      controlId: dkimControlId,
      observation: dkim.evidence,
      evidenceType: dkim.status === "confirmed" || dkim.status === "misconfigured" ? "technical-test" : "inferred",
      evidenceCitation:
        dkim.selectorsChecked.length > 0
          ? `Checked selector(s): ${dkim.selectorsChecked.join(", ")}.`
          : "No known selector to check for this mail platform.",
      confidence: dkim.status === "confirmed" || dkim.status === "misconfigured" ? "high" : "low",
    })
  );

  // --- DNSSEC ---
  if (dnssecResult.status === "ok" && dnssecResult.findings) {
    const validated = dnssecResult.findings.status === "validated";
    findings.push(
      buildFinding(allocator, {
        controlId: validated ? "DNSSEC_VALIDATED" : "DNSSEC_NOT_VALIDATED",
        observation: `DNSSEC Authenticated Data flag: ${dnssecResult.findings.status}, reported by ${dnssecResult.findings.resolver}.`,
        evidenceType: "external-observation",
        evidenceCitation: dnssecResult.evidence,
        confidence: "medium",
      })
    );
  } else {
    findings.push(
      buildFinding(allocator, {
        controlId: "DNSSEC_NOT_VALIDATED",
        observation: "DNSSEC status could not be checked during this scan.",
        evidenceType: "external-observation",
        evidenceCitation: "DNSSEC resolver unavailable during this scan.",
        confidence: "low",
        overrides: { status: "not-checked", priority: "monitor" },
      })
    );
  }

  // --- CAA ---
  if (dnsResult.status === "ok" && dnsResult.findings) {
    const caa = classifyCaa(dnsResult.findings.caa);
    findings.push(
      buildFinding(allocator, {
        controlId: caa.present ? "CAA_PRESENT" : "CAA_MISSING",
        observation: caa.present
          ? `CAA record found, authorising: ${caa.authorizedCAs.join(", ") || "no issuer (explicit deny-all)"}.`
          : `No CAA record was found for ${hostname}.`,
        evidenceType: "external-observation",
        evidenceCitation: `DNS CAA lookup for ${hostname}.`,
        confidence: "high",
      })
    );
  }

  // --- Internet exposure (Shodan) ---
  // Uses the first resolved A/AAAA address as the target IP. Only Shodan is
  // wired up here; Censys stays available as an interface but unused, since
  // it wasn't asked for. See docs/EXTERNAL_PROVIDERS.md for the licensing
  // note on Shodan's free tier — this only produces a real result once a
  // paid SHODAN_API_KEY is set; otherwise it degrades to not-checked.
  {
    const ipToCheck =
      dnsResult.status === "ok" && dnsResult.findings
        ? (dnsResult.findings.a[0] ?? dnsResult.findings.aaaa[0])
        : undefined;

    if (ipToCheck) {
      const shodanResult = await fetchShodanFindings(ipToCheck);
      if (shodanResult.status === "ok" && shodanResult.findings) {
        const classification = classifyInternetExposure(shodanResult.findings.ports);
        const controlId =
          classification.level === "critical"
            ? "INTERNET_EXPOSURE_CRITICAL"
            : classification.level === "sensitive"
              ? "INTERNET_EXPOSURE_SENSITIVE"
              : "INTERNET_EXPOSURE_ROUTINE";
        const notablePorts = [...classification.criticalPorts, ...classification.sensitivePorts];
        findings.push(
          buildFinding(allocator, {
            controlId,
            observation:
              notablePorts.length > 0
                ? `An IP address (${ipToCheck}) currently associated with this domain has previously been observed offering services on port(s): ${notablePorts.join(", ")}.`
                : `An IP address (${ipToCheck}) currently associated with this domain has previously been observed offering only routine web services.`,
            evidenceType: "external-observation",
            evidenceCitation: `Previously-observed internet services for ${ipToCheck}, via Shodan.`,
            confidence: "medium",
          })
        );
      } else {
        findings.push(
          buildFinding(allocator, {
            controlId: "INTERNET_EXPOSURE_NOT_CHECKED",
            observation: "Previously-observed internet services were not checked during this scan.",
            evidenceType: "external-observation",
            evidenceCitation:
              shodanResult.status === "not-configured"
                ? "No Shodan API key is configured."
                : shodanResult.errors.join(" ") || "Shodan provider unavailable during this scan.",
            confidence: "low",
          })
        );
      }
    }
  }

  // --- Registration ---
  if (registrationResult.status === "ok" && registrationResult.findings) {
    const reg = registrationResult.findings;
    if (reg.expiresAt) {
      const daysUntilExpiry = (new Date(reg.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysUntilExpiry >= 0 && daysUntilExpiry <= 30) {
        findings.push(
          buildFinding(allocator, {
            controlId: "REGISTRATION_EXPIRING_SOON",
            observation: `Domain registration for ${registrableDomain} is recorded as expiring ${reg.expiresAt} (registrar: ${reg.registrar ?? "unknown"}).`,
            evidenceType: "external-observation",
            evidenceCitation: `${reg.source.toUpperCase()} lookup for ${registrableDomain}.`,
            confidence: "high",
          })
        );
      }
    }
  } else {
    findings.push(
      buildFinding(allocator, {
        controlId: "REGISTRATION_NOT_AVAILABLE",
        observation: `Domain registration details for ${registrableDomain} were not available from this scan's sources.`,
        evidenceType: "external-observation",
        evidenceCitation: registrationResult.errors.join(" ") || "No registration data source succeeded.",
        confidence: "low",
      })
    );
  }

  // --- Subdomains ---
  if (ctResult.status === "ok" && ctResult.findings) {
    const classified = await classifySubdomains(ctResult.findings.hostnames);
    const exposedNonProd = classified.filter(
      (c) =>
        c.resolutionStatus === "currently-resolving" &&
        ["dev", "staging", "test", "old", "legacy"].includes(c.category)
    );
    for (const host of exposedNonProd) {
      findings.push(
        buildFinding(allocator, {
          controlId: "SUBDOMAIN_NONPRODUCTION_EXPOSED",
          observation: `A hostname suggesting a ${host.category} environment ("${host.hostname}") appeared in public certificate records and currently resolves.`,
          evidenceType: "external-observation",
          evidenceCitation: `Certificate transparency records via crt.sh, cross-checked with a live DNS resolution.`,
          confidence: "medium",
        })
      );
    }

    // --- Subdomain takeover risk (purely passive: CNAME + resolution lookups only) ---
    const takeoverChecks = await checkTakeoverRisks(ctResult.findings.hostnames);
    const atRisk = takeoverChecks.filter((c) => c.atRisk);
    for (const risk of atRisk) {
      findings.push(
        buildFinding(allocator, {
          controlId: "SUBDOMAIN_TAKEOVER_RISK",
          observation: `"${risk.hostname}" has a CNAME pointing to ${risk.cnameTarget} (${risk.matchedService}), which does not currently resolve to anything.`,
          evidenceType: "external-observation",
          evidenceCitation: `DNS CNAME lookup for ${risk.hostname}, cross-checked by resolving ${risk.cnameTarget}.`,
          confidence: "medium",
        })
      );
    }

    // --- Certificate freshness ---
    const cert = ctResult.findings.mostRecentCertificate;
    if (cert) {
      const isExpired = new Date(cert.notAfter).getTime() < Date.now();
      findings.push(
        buildFinding(allocator, {
          controlId: isExpired ? "CERTIFICATE_STALE_OR_EXPIRED" : "CERTIFICATE_CURRENT",
          observation: `Most recent certificate found for ${cert.matchedName}: issued ${cert.notBefore}, expires ${cert.notAfter}.`,
          evidenceType: "external-observation",
          evidenceCitation: `Certificate transparency records via crt.sh for ${cert.matchedName}.`,
          confidence: "medium",
        })
      );
    } else {
      findings.push(
        buildFinding(allocator, {
          controlId: "CERTIFICATE_NOT_FOUND",
          observation: `No certificate covering ${hostname} or www.${registrableDomain} was found in public certificate transparency logs.`,
          evidenceType: "external-observation",
          evidenceCitation: `Certificate transparency records via crt.sh for ${registrableDomain}.`,
          confidence: "medium",
        })
      );
    }
  } else {
    findings.push(
      buildFinding(allocator, {
        controlId: "CERTIFICATE_NOT_FOUND",
        observation: "Certificate history could not be checked because certificate transparency lookup did not succeed during this scan.",
        evidenceType: "external-observation",
        evidenceCitation: "Certificate transparency provider unavailable during this scan.",
        confidence: "low",
        overrides: { status: "not-checked", priority: "monitor", riskRating: "informational" },
      })
    );
  }

  const scanCompletedAt = new Date().toISOString();
  const subdomainCount = ctResult.status === "ok" && ctResult.findings ? ctResult.findings.hostnames.length : 0;

  return {
    status: "completed",
    scan: { domain: hostname, scanStartedAt, scanCompletedAt, findings },
    overview: buildExposureOverview(findings, subdomainCount),
    executiveSummary: buildExecutiveSummary(hostname, findings),
    raw: {
      dns: dnsResult,
      dnssec: dnssecResult,
      registration: registrationResult,
      certificateTransparency: ctResult,
    },
  };
}
