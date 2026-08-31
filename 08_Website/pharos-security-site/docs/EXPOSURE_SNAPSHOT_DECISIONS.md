# Exposure Snapshot — Decisions

Running log of implementation decisions and reasoning, per the build brief's own request. Business-level decisions (pricing, naming) are logged in `00-business/decisions.md`; this file is for technical/product decisions made while building.

## 2026-08-31: Milestone 0 + 1 decisions

**Reuse the existing Pharos evidence/risk/priority methodology instead of inventing a parallel one.** `04_Operating_Manual/evidence-standard.md`, `risk-and-priority-methodology.md`, and `reporting-standards.md` already define exactly what the build brief's sections 18-19 sketch from scratch (finding schema, severity avoiding "critical" unless exceptional, confidence separate from severity, no fake score). The scanner's `Finding` type is a direct TypeScript implementation of that existing model, using the `EXT` domain prefix already reserved for external exposure findings. Reasoning: one methodology across the whole business, less code, and any human-delivered Independent Security Review can reference the same finding IDs this tool produces.

**RDAP with a WHOIS fallback, not RDAP alone.** Verified directly against IANA's live RDAP bootstrap registry: `.nz` has no RDAP endpoint. Since `.nz`/`.co.nz` is Pharos's core market, RDAP-only would silently fail for most real clients. Built a minimal, purpose-built WHOIS client (raw TCP, not scraping) as a fallback. See `EXPOSURE_SNAPSHOT_ARCHITECTURE.md` and `EXTERNAL_PROVIDERS.md`.

**DNSSEC via a validating DoH resolver's AD flag, not a from-scratch validator.** Full chain-of-trust validation is a specialist undertaking disproportionate to this milestone. Reading Cloudflare's DoH `AD` flag gives a correct, honestly-labelled (medium confidence) signal cheaply.

**Certificate transparency via crt.sh, wrapped in a circuit breaker.** Free and standard, but known to be unreliable under load with no documented rate limit. A failure here degrades to "not checked," never to a false negative, and repeated failures trip a cooldown rather than hammering an already-struggling free service.

**Shodan and Censys built as interfaces only, not wired to their free tiers.** Shodan's genuinely-free InternetDB API is explicitly non-commercial-use only — using it in Pharos's commercial product without a paid plan would be a licensing problem. Censys's free tier is thin (250 queries/month). Both providers report `not-configured` until a real, paid credential is supplied.

**No database in this pass.** Milestone 1 is a pure library, callable from tests with no persistence. Deferred to Milestone 2/4 when scan results actually need to be stored for a shareable link, history, or monitoring. When needed: Netlify DB (Neon Postgres) + Drizzle ORM, chosen for zero-config fit with the existing Netlify host and low operational overhead for a solo founder.

**Vitest for testing, not Jest.** No test infrastructure existed in the repo before this. Vitest was chosen for lighter configuration and better native fit with a modern TypeScript/ESM Next.js project.

**New status-badge colours, deliberately extended, not defaulted to red/amber/green.** `01_Brand/colour-palette.md` explicitly instructs extending the palette deliberately if a status colour is ever needed, rather than reaching for an off-brand default. Proposed: teal (existing accent) for "good," a quiet neutral (charcoal-on-mist, no new hue) for "needs attention," and one new considered warm accent reserved only for "high-priority" status. Exact value to be finalised and documented when the UI (Milestone 4) is built; not needed for Milestone 1's library code, but recorded here so the decision isn't lost.

**SSRF protection built into Milestone 1, not deferred.** RDAP/WHOIS/crt.sh/DoH calls are already outbound requests driven by user-supplied domain input, so the same protections the brief describes for the later web-check module (reject private/reserved ranges, revalidate after redirects) apply from the first provider that makes an HTTP call.

## Bug caught during manual verification

Running the WHOIS fallback against a real `.nz` domain (`internetnz.nz`) during manual verification (see the plan's verification step) surfaced a real bug before it ever shipped: IANA's per-TLD WHOIS record uses a `refer:` field for most gTLDs, but `.nz` (and other ccTLDs) use a `whois:` field instead. The original parser only matched `refer:`, so it silently returned `unavailable` for exactly the TLD this fallback exists to support. Confirmed directly against `whois.iana.org` and fixed to match both field names, with a regression test added (`__tests__/exposure-snapshot/providers/whois.test.ts`). This is exactly why the plan's verification step called for testing against real domains rather than trusting unit tests with hand-written mocks alone — the mocked tests would never have caught a wrong assumption baked into the mock itself.

## Business-model decision (cross-reference)

The pricing/naming decision (automated tool replaces the paid manual Exposure Snapshot service) was confirmed directly with the founder before implementation began, since it's a pricing commitment outside an AI system's standing authority per `CLAUDE.md` rule 8. Full reasoning in `00-business/decisions.md`, 2026-08-31 entry.

## 2026-08-31 (later): concept explainers, a richer overview, and credential-exposure providers rejected

**Added a "what is this?" info disclosure**, keyed by a new `Concept` field on every finding (`spf`/`dmarc`/`dkim`/`dnssec`/`domain-registration`/`public-footprint`), separate from the finding-specific observation/recommendation text. Content lives in `lib/exposure-snapshot/findings/concept-explainers.ts`, deliberately plain-English and not technically deep, per the founder's explicit request. Shown next to both the Priority Actions list and the full Findings list.

**Enriched the External Exposure Overview** with a permanent one-line description under each category (email protection / domain security / internet exposure / credential exposure / public footprint), since a bare "Needs attention" badge with no context was flagged as not helpful. Also added a visible note explaining why credential exposure always shows "not checked" right now, linked from the overview section itself, rather than leaving that unexplained.

**Fixed the concept-info disclosure to float instead of reflowing the page.** It was a block element that pushed everything below it down when opened. Rebuilt as an absolutely-positioned popover anchored to its trigger button, with click-outside and Escape-to-close, matching the reflow-free behaviour a reader would expect from an info tooltip.

**Added two new purely-passive checks, both requested directly:** CAA record presence (data was already being fetched by the DNS provider but never turned into a finding — cheap to add) and subdomain takeover risk (a CNAME lookup on every certificate-transparency-discovered hostname, checked against ~16 known vulnerable third-party service patterns, flagged only when the CNAME target itself no longer resolves). Both ship with their own concept explainers and knowledge-base entries. Subdomain takeover is rated "high" risk, "now" priority — a hijacked subdomain can serve convincing phishing content under the business's own domain name, which is a materially serious outcome for a cheap, low-effort fix (usually just removing a stale DNS record). The internet exposure overview category now weighs a takeover risk finding at double a plain non-production-hostname finding, since it's a meaningfully more serious signal.

**Researched DeHashed, OathNet, OSINTLeak, and Intelligence X as possible credential-exposure providers** (the founder asked specifically, wanting a path to "workable" credential exposure sooner than HIBP's domain-verification requirement). Rejected all four — see `EXTERNAL_PROVIDERS.md`'s "Alternatives considered and rejected" section for the full reasoning. In short: all four index or return actual leaked credential content rather than breach metadata, and none require the requester to prove domain ownership, which is precisely the problem HIBP's own verification requirement exists to prevent. Intelligence X is additionally the most expensive of the four for legitimate commercial use (€7,000/year minimum, confirmed directly against intelx.io). Decision: no substitute provider; HIBP behind Level 2 verification remains the plan.
