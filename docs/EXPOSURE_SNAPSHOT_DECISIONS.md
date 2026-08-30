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
