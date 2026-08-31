import type { CheckStatus, Concept, Effort, Priority, RiskRating } from "./types";

/**
 * Deterministic remediation knowledge base. The same control ID always
 * produces the same title/explanation/recommendation — no AI-generated
 * text per scan, per the build brief's explicit instruction ("the same
 * input should generally produce the same recommendation"). This makes
 * the tool's output consistent, testable, and reviewable in one file.
 */

export interface KnowledgeBaseEntry {
  controlId: string;
  concept: Concept;
  title: string;
  why: string;
  recommendation: string;
  riskRating: RiskRating;
  priority: Priority;
  effort: Effort;
  status: CheckStatus;
}

export const KNOWLEDGE_BASE: Record<string, KnowledgeBaseEntry> = {
  SPF_MISSING: {
    controlId: "SPF_MISSING",
    concept: "spf",
    title: "No SPF record was found",
    why: "SPF lets receiving mail systems check whether a message claiming to be from your domain actually came from a server you've authorised. Without it, there's no published list for anyone to check against.",
    recommendation: "Identify every system that legitimately sends email for your domain (your mailbox provider, and any marketing, invoicing, or booking tools that send on your behalf), then publish an SPF record listing them.",
    riskRating: "high",
    priority: "now",
    effort: "low",
    status: "high-priority",
  },
  SPF_PASS_ALL: {
    controlId: "SPF_PASS_ALL",
    concept: "spf",
    title: "Your SPF record permits any server to send mail for your domain",
    why: "An SPF record ending in \"+all\" tells receiving systems to accept mail from any source as if it came from you, which defeats the purpose of having SPF at all.",
    recommendation: "Replace the permissive \"+all\" ending with a restrictive one, after confirming every legitimate sending source is already listed.",
    riskRating: "high",
    priority: "now",
    effort: "very-low",
    status: "high-priority",
  },
  SPF_SOFT_OR_NEUTRAL: {
    controlId: "SPF_SOFT_OR_NEUTRAL",
    concept: "spf",
    title: "SPF is present but does not clearly reject unauthorised senders",
    why: "SPF is published but its ending mechanism suggests suspicious mail may still receive a less decisive treatment, rather than being clearly flagged.",
    recommendation: "Before moving to a stricter policy, confirm all legitimate mail services are correctly listed, then move toward an ending that clearly fails unauthorised senders.",
    riskRating: "moderate",
    priority: "next",
    effort: "low",
    status: "attention",
  },
  SPF_MALFORMED: {
    controlId: "SPF_MALFORMED",
    concept: "spf",
    title: "SPF configuration could not be reliably interpreted",
    why: "Either more than one SPF record was published for this domain, or the record doesn't follow the expected format. Multiple or malformed SPF records can cause mail systems to fail authentication checks unpredictably, sometimes for legitimate mail.",
    recommendation: "Consolidate to a single, correctly formatted SPF record.",
    riskRating: "moderate",
    priority: "now",
    effort: "low",
    status: "attention",
  },
  SPF_LOOKUP_LIMIT_EXCEEDED: {
    controlId: "SPF_LOOKUP_LIMIT_EXCEEDED",
    concept: "spf",
    title: "SPF record may exceed the DNS lookup limit",
    why: "SPF allows at most 10 DNS lookups during evaluation. A record that exceeds this can fail unpredictably (a \"permanent error\"), sometimes causing legitimate mail to fail authentication.",
    recommendation: "Review the includes and mechanisms in your SPF record with your mail/IT provider and simplify where possible.",
    riskRating: "moderate",
    priority: "next",
    effort: "moderate",
    status: "attention",
  },
  SPF_GOOD: {
    controlId: "SPF_GOOD",
    concept: "spf",
    title: "SPF is configured with a clear enforcement policy",
    why: "Your domain publishes an SPF policy that clearly restricts which mail systems are permitted to send email for it.",
    recommendation: "No action needed. Revisit if you add or remove a mail-sending service.",
    riskRating: "informational",
    priority: "monitor",
    effort: "very-low",
    status: "good",
  },

  DMARC_MISSING: {
    controlId: "DMARC_MISSING",
    concept: "dmarc",
    title: "No DMARC record was found",
    why: "DMARC helps receiving mail systems determine how to handle messages that fail SPF or DKIM checks, and gives you visibility into who is sending mail using your domain.",
    recommendation: "Begin by identifying every legitimate system that sends mail for your domain. Confirm SPF and DKIM are correctly configured, then introduce a DMARC record in monitoring mode (p=none with a reporting address) before moving toward enforcement.",
    riskRating: "high",
    priority: "now",
    effort: "low",
    status: "high-priority",
  },
  DMARC_MONITORING_ONLY: {
    controlId: "DMARC_MONITORING_ONLY",
    concept: "dmarc",
    title: "DMARC is present but set to monitoring only",
    why: "A DMARC policy of \"p=none\" means reports are generated, but receiving mail systems are not instructed to do anything about messages that fail authentication.",
    recommendation: "Once SPF and DKIM are confirmed correctly configured for all legitimate senders, move DMARC toward an enforcement policy (quarantine, then reject) in stages.",
    riskRating: "moderate",
    priority: "next",
    effort: "moderate",
    status: "attention",
  },
  DMARC_MALFORMED: {
    controlId: "DMARC_MALFORMED",
    concept: "dmarc",
    title: "DMARC configuration could not be reliably interpreted",
    why: "The DMARC record found doesn't follow the expected format, or more than one was published, which can cause receiving mail systems to ignore it entirely.",
    recommendation: "Correct the DMARC record with your mail/IT provider so there is exactly one, correctly formatted record.",
    riskRating: "moderate",
    priority: "now",
    effort: "low",
    status: "attention",
  },
  DMARC_STRONG: {
    controlId: "DMARC_STRONG",
    concept: "dmarc",
    title: "DMARC is configured with an enforcement policy",
    why: "Your domain publishes a DMARC policy that instructs receiving mail systems to reject or quarantine messages that fail authentication.",
    recommendation: "No action needed. Continue reviewing DMARC aggregate reports periodically if you receive them.",
    riskRating: "informational",
    priority: "monitor",
    effort: "very-low",
    status: "good",
  },

  DKIM_NOT_CONFIRMED: {
    controlId: "DKIM_NOT_CONFIRMED",
    concept: "dkim",
    title: "DKIM could not be externally confirmed",
    why: "DKIM selectors generally cannot be discovered from outside without already knowing them. This does not mean DKIM is missing, only that it could not be verified from public information alone.",
    recommendation: "Confirm DKIM is configured directly with your mail provider or IT provider, since this is often set up by default but is worth verifying explicitly.",
    riskRating: "low",
    priority: "next",
    effort: "low",
    status: "attention",
  },
  DKIM_MISCONFIGURED: {
    controlId: "DKIM_MISCONFIGURED",
    concept: "dkim",
    title: "A DKIM record was found but does not look correctly configured",
    why: "A DNS record exists at the expected location for DKIM, but does not contain the fields a valid DKIM key record needs.",
    recommendation: "Review DKIM configuration with your mail provider or IT provider.",
    riskRating: "moderate",
    priority: "next",
    effort: "moderate",
    status: "attention",
  },
  DKIM_CONFIRMED: {
    controlId: "DKIM_CONFIRMED",
    concept: "dkim",
    title: "DKIM was confirmed configured",
    why: "A valid DKIM key record was found for a selector documented as a default for your mail provider.",
    recommendation: "No action needed.",
    riskRating: "informational",
    priority: "monitor",
    effort: "very-low",
    status: "good",
  },

  DNSSEC_NOT_VALIDATED: {
    controlId: "DNSSEC_NOT_VALIDATED",
    concept: "dnssec",
    title: "DNSSEC does not appear to be validated for this domain",
    why: "DNSSEC helps protect against certain DNS manipulation attacks by allowing DNS responses to be cryptographically verified. Most small businesses do not have this configured, and it is a lower-priority item than email authentication or backups.",
    recommendation: "Worth considering once higher-priority items are addressed. Ask your DNS/domain provider whether they support DNSSEC signing.",
    riskRating: "low",
    priority: "later",
    effort: "moderate",
    status: "attention",
  },
  DNSSEC_VALIDATED: {
    controlId: "DNSSEC_VALIDATED",
    concept: "dnssec",
    title: "DNSSEC is validated for this domain",
    why: "A validating DNS resolver confirmed this domain's DNS responses can be cryptographically verified.",
    recommendation: "No action needed.",
    riskRating: "informational",
    priority: "monitor",
    effort: "very-low",
    status: "good",
  },

  REGISTRATION_EXPIRING_SOON: {
    controlId: "REGISTRATION_EXPIRING_SOON",
    concept: "domain-registration",
    title: "Domain registration expires soon",
    why: "If a domain registration lapses, the business can lose control of its website and email entirely, sometimes to whoever registers it next.",
    recommendation: "Confirm the domain is set to auto-renew with your registrar, and that billing details are current.",
    riskRating: "moderate",
    priority: "now",
    effort: "very-low",
    status: "attention",
  },
  REGISTRATION_NOT_AVAILABLE: {
    controlId: "REGISTRATION_NOT_AVAILABLE",
    concept: "domain-registration",
    title: "Domain registration details were not available",
    why: "Registration information could not be retrieved from the registry for this domain during this scan.",
    recommendation: "No action implied by this alone. If you'd like this confirmed, ask your domain registrar directly.",
    riskRating: "informational",
    priority: "monitor",
    effort: "very-low",
    status: "not-checked",
  },

  SUBDOMAIN_NONPRODUCTION_EXPOSED: {
    controlId: "SUBDOMAIN_NONPRODUCTION_EXPOSED",
    concept: "public-footprint",
    title: "A hostname suggesting a development or staging environment is currently resolving",
    why: "Development, staging, and legacy environments can sometimes receive less security attention than production services, while still being reachable from the internet.",
    recommendation: "Confirm whether this host is still required. If so, ensure it receives the same security attention as production; if not, consider retiring it.",
    riskRating: "moderate",
    priority: "next",
    effort: "low",
    status: "attention",
  },
};

export function getKnowledgeBaseEntry(controlId: string): KnowledgeBaseEntry {
  const entry = KNOWLEDGE_BASE[controlId];
  if (!entry) {
    throw new Error(`Unknown remediation knowledge base control ID: ${controlId}`);
  }
  return entry;
}
