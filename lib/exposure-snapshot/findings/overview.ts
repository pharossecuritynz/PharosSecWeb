import type { Finding } from "./types";

/**
 * The "External Exposure Overview" scorecard — a small, fixed set of
 * plain-English categories, never a numeric score. See
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md and reporting-standards.md's
 * existing ban on false-precision scores, which this deliberately follows.
 */

export type EmailProtectionLevel = "strong" | "needs-attention" | "high-priority";
export type DomainSecurityLevel = "strong" | "needs-attention" | "high-priority";
export type InternetExposureLevel = "low" | "moderate" | "elevated" | "unknown";
export type CredentialExposureLevel = "none-observed" | "observed" | "not-checked";
export type PublicFootprintLevel = "low" | "moderate" | "broad";

export interface ExposureOverview {
  emailProtection: EmailProtectionLevel;
  domainSecurity: DomainSecurityLevel;
  internetExposure: InternetExposureLevel;
  credentialExposure: CredentialExposureLevel;
  publicFootprint: PublicFootprintLevel;
}

const EMAIL_CONTROL_PREFIXES = ["SPF_", "DMARC_", "DKIM_"];
const DOMAIN_CONTROL_PREFIXES = ["REGISTRATION_", "DNSSEC_", "CAA_"];

function worstStatus(findings: Finding[]): "good" | "attention" | "high-priority" | "not-checked" {
  if (findings.some((f) => f.status === "high-priority")) return "high-priority";
  if (findings.some((f) => f.status === "attention")) return "attention";
  if (findings.length > 0 && findings.every((f) => f.status === "not-checked")) return "not-checked";
  return "good";
}

function byControlPrefix(findings: Finding[], prefixes: string[]): Finding[] {
  return findings.filter((f) => prefixes.some((p) => f.controlId.startsWith(p)));
}

export function buildExposureOverview(findings: Finding[], subdomainCount: number): ExposureOverview {
  const emailFindings = byControlPrefix(findings, EMAIL_CONTROL_PREFIXES);
  const domainFindings = byControlPrefix(findings, DOMAIN_CONTROL_PREFIXES);
  const nonProdExposureCount = findings.filter((f) => f.controlId === "SUBDOMAIN_NONPRODUCTION_EXPOSED").length;
  const takeoverRiskCount = findings.filter((f) => f.controlId === "SUBDOMAIN_TAKEOVER_RISK").length;
  const credentialFindings = findings.filter((f) => f.controlId.startsWith("HIBP_"));

  const emailWorst = worstStatus(emailFindings);
  const domainWorst = worstStatus(domainFindings);

  const emailProtection: EmailProtectionLevel =
    emailWorst === "high-priority" ? "high-priority" : emailWorst === "attention" ? "needs-attention" : "strong";
  const domainSecurity: DomainSecurityLevel =
    domainWorst === "high-priority" ? "high-priority" : domainWorst === "attention" ? "needs-attention" : "strong";

  // Takeover risk weighs more heavily than a plain non-production hostname
  // being reachable — a single takeover-vulnerable subdomain alone is
  // enough to reach "elevated", since it's a materially more serious finding.
  const exposureScore = nonProdExposureCount + takeoverRiskCount * 2;
  const internetExposure: InternetExposureLevel =
    exposureScore === 0 ? "low" : exposureScore === 1 ? "moderate" : "elevated";

  // No credential-exposure provider (HIBP) is wired up yet — see EXTERNAL_PROVIDERS.md.
  // Always "not-checked" until Milestone 7. Never silently reported as "none-observed",
  // which would falsely imply a check was actually performed.
  const credentialExposure: CredentialExposureLevel =
    credentialFindings.length > 0
      ? credentialFindings.some((f) => f.status === "high-priority" || f.status === "attention")
        ? "observed"
        : "none-observed"
      : "not-checked";

  const publicFootprint: PublicFootprintLevel =
    subdomainCount <= 5 ? "low" : subdomainCount <= 20 ? "moderate" : "broad";

  return { emailProtection, domainSecurity, internetExposure, credentialExposure, publicFootprint };
}
