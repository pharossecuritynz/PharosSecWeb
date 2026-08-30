# Exposure Snapshot — Architecture

Status: Milestone 0 and Milestone 1 complete (core scanner engine, tested). No UI, database, or persistence yet — see `EXPOSURE_SNAPSHOT_ROADMAP.md`.

## What this is

A free, automated, self-serve tool: a business enters its domain and gets a plain-English external security report. It answers the question "what can someone learn about our business from the outside, before they ever contact us?" using only passive, publicly available information. It is explicitly **not** a penetration test or a vulnerability scan — that distinction is enforced in code (no active probing capability exists in this codebase), not just in copy.

Full business framing lives in `03_Services/exposure-snapshot.md`. This document covers the technical build.

## Trust boundaries and product levels

Two levels, architected separately from the start so Level 1 can never accidentally leak Level 2 data:

- **Level 1 (public)**: no proof of domain control required. Only passive sources: DNS, RDAP/WHOIS, certificate transparency, and (once credentialed) exposure-intelligence providers like Shodan/Censys that have already observed the internet, not scans Pharos performs itself. Never returns individual employee data, credentials, or personal information — findings are aggregated.
- **Level 2 (verified)**: requires the requester to demonstrate control of the domain (email verification to an address at the domain, or a DNS TXT record challenge). Unlocks domain-wide breach/credential exposure (Have I Been Pwned) and any future authorised lightweight web check. The verification model (state, method, timestamp, expiry) is designed now, in the data model below, even though it isn't wired to a real provider until Milestone 6/7.

This document and the code under `lib/exposure-snapshot/` implement the **scanner engine** shared by both levels. Which providers a given scan is allowed to call, and which findings a given viewer is allowed to see, is an authorisation concern layered on top in a later milestone (UI + persistence), not something baked into the engine itself. The engine is written so that call sites decide what to invoke and show; it does not assume Level 1 by default.

## Scan flow (Milestone 1: library only, no HTTP surface yet)

```
domain input
    │
    ▼
domain validation & normalisation (lib/exposure-snapshot/domain/)
    │  rejects IPs, localhost, malformed input; PSL-aware (handles co.nz correctly)
    ▼
scan orchestrator (lib/exposure-snapshot/scan.ts)
    │
    ├─→ DNS provider (native dns/promises)        → A/AAAA/MX/TXT/NS/CAA
    ├─→ DNSSEC signal check (DoH AD flag)          → validated / not validated / unknown
    ├─→ RDAP provider, WHOIS fallback              → registrar/dates/nameservers
    ├─→ Certificate transparency provider (crt.sh) → hostnames, resolving vs historical
    │
    ▼
analysis layer (lib/exposure-snapshot/analysis/)
    │  SPF parser, DMARC parser, DKIM detector, mail-platform detector,
    │  subdomain classifier
    ▼
finding generation (lib/exposure-snapshot/findings/)
    │  deterministic remediation knowledge base, evidence-standard.md's model
    ▼
structured scan result (findings[], evidence, confidence, risk, priority)
```

Everything above is pure, testable TypeScript with no network calls except through the SSRF-safe fetch wrapper (DNS-over-HTTPS, RDAP, crt.sh) and Node's own DNS resolver (native `dns/promises`, not user-controlled URL fetching, so it sits outside the SSRF surface but is still bounded by per-provider timeouts).

## Provider contract

Every provider (`lib/exposure-snapshot/providers/*`) implements the same shape, so the orchestrator and future UI never need to know which specific service backs a check:

```ts
type ProviderStatus = "ok" | "unavailable" | "error" | "not-configured";

interface ProviderResult<T> {
  provider: string;
  status: ProviderStatus;
  checkedAt: string; // ISO timestamp
  findings: T | null;
  evidence: string;  // what was actually queried/observed
  confidence: "high" | "medium" | "low";
  errors: string[];
}
```

A provider that fails, times out, or has no credentials returns `status: "unavailable"` (or `"not-configured"` when a key is simply absent) with `findings: null` — it never causes the whole scan to fail, and it is never silently interpreted downstream as "nothing found." The finding-generation layer distinguishes "checked, nothing concerning" from "not checked" explicitly; see `findings/` below.

## Finding model — a direct implementation of existing Pharos methodology

This is the most important architectural decision in this build: the scanner does **not** invent its own severity/evidence/confidence vocabulary. It implements, in TypeScript, the model already defined in:

- `04_Operating_Manual/evidence-standard.md` — evidence types, confidence, the finding data model, the finding-ID scheme (`EXT-01`, `EXT-02`, ... — the `EXT` prefix was already reserved for external exposure findings before this tool existed)
- `04_Operating_Manual/risk-and-priority-methodology.md` — the risk rating (Critical/High/Moderate/Low/Informational) and priority (Now/Next/Later/Monitor), kept as two separate axes
- `04_Operating_Manual/reporting-standards.md` — plain-English-first, no fake precision scores

```ts
type EvidenceType = "client-stated" | "documentary" | "configuration-observed"
  | "technical-test" | "external-observation" | "inferred";

type RiskRating = "critical" | "high" | "moderate" | "low" | "informational";
type Confidence = "high" | "medium" | "low";
type Priority = "now" | "next" | "later" | "monitor";

interface Finding {
  id: string;                 // "EXT-01", stable within a scan
  controlId: string;          // key into the remediation knowledge base, e.g. "DMARC_MISSING"
  domain: "EXT";               // always EXT for this tool; other domains exist elsewhere in the methodology
  title: string;
  observation: string;         // what was actually seen
  evidence: { type: EvidenceType; citation: string; checkedAt: string };
  riskRating: RiskRating;
  confidence: Confidence;
  priority: Priority;
  recommendation: string;
  status: "good" | "attention" | "high-priority" | "informational" | "not-checked";
}
```

`status` is the report-facing simplification used for the per-check badge (see the UI/design note below); `riskRating` and `priority` are the fuller internal fields, present for consistency with every other Pharos finding but not necessarily surfaced as separate labels in the MVP UI. **`"critical"` is reserved for genuinely exceptional evidence** (per the brief's own instruction and `risk-and-priority-methodology.md`'s existing definition) — nothing in the Milestone 1 remediation knowledge base currently assigns it; the highest tier a passive DNS/email check realistically produces is `"high"`.

## Remediation knowledge base — deterministic, not AI-generated per scan

Per the brief's explicit instruction: the same input produces the same recommendation. `lib/exposure-snapshot/findings/knowledge-base.ts` is a plain lookup table, keyed by `controlId` (e.g. `DMARC_MISSING`, `SPF_PERMISSIVE`, `DKIM_NOT_CONFIRMED`), each entry providing the title/why/recommendation text used to build a `Finding`. This makes the tool's output testable, reviewable, and consistent — a QA reviewer can read the whole knowledge base in one file rather than trusting a model to reproduce the same judgement every time. AI may assist with future report *summarisation* (per the brief), but the scanner's findings themselves never depend on a model call.

## Evidence-based check status, not pass/fail

Every check distinguishes three outcomes, never collapsing the second into the third:

1. **Checked, no concern found** → `status: "good"`.
2. **Checked, found something worth attention** → `status: "attention"` or `"high-priority"`.
3. **Not checked** (provider unavailable, no credentials, timed out) → `status: "not-checked"`, with the reason recorded. Never silently reported as "good."

This is the same discipline as the brief's own section 27 example ("Credential exposure was not checked during this scan," never "No credential exposure found") and matches `evidence-standard.md`'s confidence-versus-certainty principle exactly.

## Specific technical decisions, with reasoning

### RDAP with a WHOIS fallback

Verified directly against IANA's live RDAP bootstrap registry (`https://data.iana.org/rdap/dns.json`, checked 2026-08-31): **`.nz` is not listed — there is no RDAP endpoint for New Zealand's ccTLD.** Since `.nz`/`.co.nz` is Pharos's core market, an RDAP-only implementation would silently return "not available" for most real Pharos clients. `lib/exposure-snapshot/providers/rdap.ts` tries RDAP first (correct, structured, no rate-limit concerns for gTLDs and RDAP-supporting ccTLDs), and falls back to a minimal, purpose-built WHOIS client (`lib/exposure-snapshot/providers/whois.ts`, raw TCP to port 43, not HTML scraping) specifically for TLDs the bootstrap registry doesn't cover. WHOIS output is parsed defensively; fields the response doesn't contain are recorded as "not available," never as a failure.

### DNSSEC via a validating resolver's AD flag

Full DNSSEC chain-of-trust validation (walking DS/RRSIG/DNSKEY records up to a trust anchor) is a specialist undertaking, not a reasonable thing to reimplement for Milestone 1. Instead, `lib/exposure-snapshot/providers/dnssec.ts` queries a public DNS-over-HTTPS resolver that already performs validation (Cloudflare's `1.1.1.1/dns-query`) and reads the response's `AD` (Authenticated Data) flag. This is a correct, cheap, honestly-labelled signal (`confidence: "medium"`, evidence text states which resolver reported it) rather than a from-scratch reimplementation or an overclaimed "validated" result.

### Certificate transparency via crt.sh, with a circuit breaker

crt.sh's JSON endpoint is free and the de facto standard source, but is known to be unreliable under load and publishes no documented rate limit. `lib/exposure-snapshot/providers/certificate-transparency.ts` wraps it in a strict timeout and a simple circuit breaker (if it fails N times in a row within the process, stop calling it for a cooldown period and return `unavailable` immediately) so one flaky external service can't slow down or break every scan. A paid CT provider as a more reliable alternative is noted in the roadmap, not built now.

### Shodan and Censys: interface built, not wired to free tiers

Researched current terms directly (2026-08-31): Shodan's genuinely-free "InternetDB" API is explicitly licensed for **non-commercial use only** — using it in a commercial Pharos product without a paid plan would be a licensing problem, not just a technical shortcut. Censys's free tier is heavily rate-limited (250 queries/month). `lib/exposure-snapshot/providers/shodan.ts` and `censys.ts` implement the full `ProviderResult` contract and return `status: "not-configured"` whenever `SHODAN_API_KEY`/`CENSYS_API_KEY` env vars are absent, exactly matching the brief's own instruction that a disabled provider must never cause a scan to fail. See `EXTERNAL_PROVIDERS.md` for the full licensing detail and cost implications before either is switched on for real.

### SSRF protection

Every provider that makes an HTTP request driven by user-supplied domain input (RDAP, crt.sh, the DoH resolver) goes through `lib/exposure-snapshot/security/safe-fetch.ts`, which:

- resolves the hostname first and rejects private (RFC1918), loopback, link-local, and cloud-metadata address ranges before connecting
- re-validates the resolved address after any redirect (does not trust the original hostname's safety to apply to a redirect target)
- restricts scheme to `https`/`http` and disallows non-standard ports
- applies a hard request timeout

This exists from Milestone 1, not deferred to the later web-check module, since RDAP/crt.sh/DoH calls are already outbound requests shaped by user input.

### Rate limiting and abuse

Not yet implemented in Milestone 1 (no HTTP surface exists yet — there's nothing to abuse until Milestone 4 exposes a public endpoint). The engine's own per-provider timeouts and circuit breakers already bound how expensive a single scan can be; request-level rate limiting (per-IP, per-domain, Turnstile) is designed in the roadmap for Milestone 4, when the API route is built.

## Data model (designed now, not built until persistence is needed)

The brief's proposed entities (`Organisation`, `Domain`, `User/Contact`, `DomainVerification`, `Scan`, `ProviderRun`, `Finding`, `SnapshotState`, `Report`, `MonitoringSubscription`, `AuditEvent`, `Consent`) map directly onto the `Finding` shape above plus straightforward wrapper records. No schema is created in this pass — see the "No database yet" note below — but the `Finding`/`ProviderResult` TypeScript types in this codebase are designed to serialise cleanly into exactly those tables when persistence is added, so Milestone 2+ doesn't need to redesign what a finding is.

## No database in this pass

Milestone 1 is explicitly scoped by the brief as "independently testable before UI work" — the scanner is a pure library (domain in, structured result out), callable directly from tests with no persistence layer. A database only becomes necessary once results need to be stored for a shareable report link, history, or monitoring (Milestone 2/4 onward). Building it now would mean provisioning real infrastructure before there's a working engine to justify it. When it is needed: **Netlify DB (Neon-backed Postgres) with Drizzle ORM** is the recommended choice — zero-config with this host, standard SQL, low operational overhead, good fit for a founder-led solo practice. Not built in this pass.

## Deployment impact

No deployment changes required for Milestone 1 — this is library code with unit tests, not yet reachable from any route. When Milestone 4 adds `app/api/exposure-snapshot/scan/route.ts`, Netlify's Next.js runtime handles Route Handlers as serverless functions automatically; no `netlify.toml` or separate Netlify Functions convention is needed. New environment variables (`SHODAN_API_KEY`, `CENSYS_API_KEY`, later `HIBP_API_KEY`, email provider keys) will need to be set in the Netlify dashboard when those providers are actually switched on — none are required for Milestone 1, which runs with zero external credentials.

## Privacy model

Full detail in `04_Operating_Manual/nz-privacy-baseline.md` (Pharos's general privacy methodology) and, once built, `docs/PRIVACY_AND_DATA_HANDLING.md` (this tool's specific data handling — not yet written, since no personal data is collected or stored until Milestone 4's form exists). Principles that already shape this milestone's code even without a live form:

- Findings never include individual employee email addresses, usernames, or raw credential/breach records at Level 1 — the finding schema has no field for them, so Level 1 code paths cannot accidentally populate one.
- Every finding records its evidence type and confidence, so a future report never implies more certainty than a passive scan can honestly support.

## What Milestone 1 deliberately does not include

No UI, no API route, no database, no email, no domain verification, no HIBP, no Shodan/Censys with real credentials, no PDF, no monitoring, no rate limiting (nothing to rate-limit yet). See `EXPOSURE_SNAPSHOT_ROADMAP.md` for when each of these arrives.
