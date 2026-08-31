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
  "subdomain-takeover": {
    title: "What is a subdomain takeover?",
    explanation:
      "Some subdomains point to third-party services (like a page builder or cloud host) rather than your own server. If that service account is ever cancelled or deleted but the DNS record pointing to it isn't removed, someone else can claim the same service address and effectively take over your subdomain, potentially using it to host convincing phishing pages under your own domain name.",
  },
  caa: {
    title: "What is a CAA record?",
    explanation:
      "A CAA record specifies which certificate authorities are allowed to issue SSL/TLS certificates for your domain. Without one, any publicly trusted certificate authority can issue a certificate for it, which has been standard practice on the web for years and isn't a serious weakness on its own, but adding one is a small, low-effort way to narrow that down.",
  },
  "tls-certificate": {
    title: "Why does certificate history matter?",
    explanation:
      "Every certificate issued for a public website is recorded in public certificate transparency logs. Checking when your site's certificate was last issued is a useful, indirect way to tell whether your website is currently using HTTPS properly, without Pharos needing to connect to your site directly. This is a lagging signal though: a site can have a perfectly current certificate that just hasn't been logged as recently as expected.",
  },
  "mta-sts": {
    title: "What is MTA-STS?",
    explanation:
      "MTA-STS is a newer standard that tells other mail servers to always use an encrypted, verified connection when delivering email to your domain, rather than allowing a fallback to an unencrypted one. It's a good complement to SPF, DKIM, and DMARC, though less widely adopted than those three.",
  },
  bimi: {
    title: "What is BIMI?",
    explanation:
      "BIMI lets you display your business's verified logo next to your emails in supporting inboxes (like Gmail). It's not a security control on its own, but it only works on top of a strong DMARC policy, so it's a small, visible sign that email authentication has been properly set up.",
  },
  "internet-exposure": {
    title: "What does 'previously observed' mean here?",
    explanation:
      "This comes from internet-wide scanning services that have already looked at your IP address, not from Pharos actively scanning your systems. An IP address can also belong to shared hosting, a cloud provider, or a content delivery network rather than a server your business directly controls, so this is reported as what's been observed, not a certainty about what you're running.",
  },
};
