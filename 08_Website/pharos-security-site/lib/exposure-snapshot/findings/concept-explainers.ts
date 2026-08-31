import type { Concept } from "./types";

/**
 * Plain-English "what is this and why does it matter" explainers, shown as
 * an info disclosure next to a finding. Deliberately separate from the
 * knowledge base's finding-specific observation/recommendation text — this
 * explains the underlying concept once, regardless of which specific
 * finding (good or bad) is being shown. Not technically deep by design.
 */

export interface ConceptExplainer {
  title: string;
  explanation: string;
}

export const CONCEPT_EXPLAINERS: Record<Concept, ConceptExplainer> = {
  spf: {
    title: "What is SPF?",
    explanation:
      "SPF is a list, published in your domain's DNS settings, of which mail servers are allowed to send email on your behalf. It helps receiving mail systems tell genuine email from your business apart from email faked to look like it came from you.",
  },
  dmarc: {
    title: "What is DMARC?",
    explanation:
      "DMARC builds on SPF and DKIM. It tells receiving mail systems what to do with a message that fails those checks, for example reject it, and lets you see reports on who's sending mail using your domain. It's one of the more effective everyday defences against email impersonation and invoice fraud.",
  },
  dkim: {
    title: "What is DKIM?",
    explanation:
      "DKIM adds a digital signature to outgoing email, so a receiving mail system can confirm a message genuinely came from your domain and wasn't altered along the way.",
  },
  dnssec: {
    title: "What is DNSSEC?",
    explanation:
      "DNSSEC adds a layer of cryptographic verification to the domain name system, helping prevent certain kinds of DNS manipulation where someone could redirect your domain's traffic without your knowledge. For most small businesses this is a lower-priority item, worth addressing after the basics are covered.",
  },
  "domain-registration": {
    title: "Why does domain registration matter?",
    explanation:
      "This covers who your domain is registered with, when it's due for renewal, and whether that's likely to happen automatically. If a domain registration lapses, a business can lose control of its website and email entirely, sometimes to whoever registers it next.",
  },
  "public-footprint": {
    title: "What does 'public footprint' mean?",
    explanation:
      "This looks at what parts of your online presence, like old test sites or forgotten subdomains, are still visible to the public. These are easy to lose track of over time and can end up less protected than your main systems.",
  },
};
