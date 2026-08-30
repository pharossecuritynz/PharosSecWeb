/**
 * Mail platform detection from MX records. Confidence-labelled — never
 * stated as absolute fact, per the build brief's explicit instruction.
 * Architected as MailPlatformDetector: { provider, confidence, evidence }.
 */

export type MailPlatform =
  | "microsoft-365"
  | "google-workspace"
  | "mimecast"
  | "proofpoint"
  | "fastmail"
  | "zoho"
  | "unknown";

export interface MailPlatformResult {
  provider: MailPlatform;
  confidence: "high" | "medium" | "low";
  evidence: string;
}

interface PlatformRule {
  provider: MailPlatform;
  patterns: RegExp[];
}

// Ordered: gateway/filtering providers (Mimecast, Proofpoint) are checked
// first, since they commonly sit in front of another provider's mailboxes
// and are the more operationally relevant thing to report.
const RULES: PlatformRule[] = [
  { provider: "mimecast", patterns: [/\.mimecast\.com$/i] },
  { provider: "proofpoint", patterns: [/\.pphosted\.com$/i, /\.proofpoint\.com$/i] },
  {
    provider: "microsoft-365",
    patterns: [/\.mail\.protection\.outlook\.com$/i, /\.outlook\.com$/i],
  },
  {
    provider: "google-workspace",
    patterns: [/aspmx\.l\.google\.com$/i, /\.googlemail\.com$/i, /aspmx\d?\.googlemail\.com$/i],
  },
  { provider: "fastmail", patterns: [/\.messagingengine\.com$/i] },
  { provider: "zoho", patterns: [/\.zoho\.(com|eu|in)$/i, /\.zohomail\.(com|eu|in)$/i] },
];

export function detectMailPlatform(mxExchanges: string[]): MailPlatformResult {
  if (mxExchanges.length === 0) {
    return {
      provider: "unknown",
      confidence: "low",
      evidence: "No MX records were found for this domain.",
    };
  }

  for (const rule of RULES) {
    const matched = mxExchanges.find((mx) => rule.patterns.some((p) => p.test(mx)));
    if (matched) {
      return {
        provider: rule.provider,
        confidence: "high",
        evidence: `MX record "${matched}" matches ${rule.provider}'s documented mail infrastructure.`,
      };
    }
  }

  return {
    provider: "unknown",
    confidence: "low",
    evidence: `MX records present (${mxExchanges.join(", ")}) but did not match a recognised mail platform pattern.`,
  };
}
