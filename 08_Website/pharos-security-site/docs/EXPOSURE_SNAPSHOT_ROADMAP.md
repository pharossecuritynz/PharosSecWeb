# Exposure Snapshot — Roadmap

## DONE (Milestone 0, 1, 2, and a first cut of 4)

- Architecture, provider comparison, decisions log, this roadmap
- Core passive scanner engine (`lib/exposure-snapshot/`): domain validation, SSRF-safe fetch, DNS, DNSSEC signal, RDAP + WHOIS fallback, certificate transparency + subdomain classification, SPF/DMARC parsers, DKIM detector, mail-platform detector, finding schema + deterministic remediation knowledge base, scan orchestrator
- Finding-engine polish (Milestone 2): executive-summary model, a "strongest recommendations first" top-actions selector (effort-aware, not just severity-sorted), and a domain-level External Exposure Overview scorecard
- A working public UI and API route, ahead of schedule and **without a database**: `app/exposure-snapshot/page.tsx`, `app/api/exposure-snapshot/scan/route.ts`, and `components/exposure-snapshot/*`. A business can enter a domain and see a real, live result today. This was possible without persistence because the result is returned directly in the API response and rendered client-side — no shareable link, history, or email delivery yet, which is exactly the persistence-dependent part still deferred below.
- A documented, honest stopgap rate limiter (`lib/exposure-snapshot/security/rate-limit.ts`) — in-memory, works within one warm serverless instance, does not provide a hard limit across Netlify's multiple instances. Real protection needs the shared-state store below.
- A new, deliberate amber accent colour for "high priority" status badges, added to `app/globals.css` per `colour-palette.md`'s own instruction to extend the palette deliberately rather than default to red.
- Full unit and security test suite (Vitest, 138 tests), plus a live-browser check (Playwright via the `run` skill) confirming the actual page renders and the full form-to-results flow works with zero console errors.
- Business doc updates reflecting the confirmed free/automated pricing decision

## NEXT (the persistence-dependent half of Milestone 4, plus Milestone 3)

- Milestone 3: wire Shodan/Censys once the founder has decided whether to pay for real credentials (see `EXTERNAL_PROVIDERS.md` for the licensing detail that decision depends on)
- A database (Netlify DB / Neon Postgres + Drizzle, per the architecture doc) — needed for: a shareable report link, scan history, real cross-instance rate limiting, and lead metadata (business name / work email are currently validated but not stored anywhere)
- Cloudflare Turnstile or equivalent bot protection on the form, once real traffic risk justifies it
- Accessibility pass (keyboard navigation, ARIA labelling on the status badges, screen-reader testing) — not yet done
- A `/exposure-snapshot` link somewhere discoverable from the main site (homepage services section, header nav) — the page exists and works but isn't linked from anywhere yet

## LATER (Milestone 5-9)

- Milestone 5: report delivery — email verification, secure/expiring report links, printable report (PDF only if a print-quality HTML page proves insufficient; not assumed necessary)
- Milestone 6: domain-control verification (email-to-domain-address or DNS TXT challenge), unlocking Level 2
- Milestone 7: HIBP integration, gated on Milestone 6 and on the founder committing to a paid HIBP subscription (no free domain-search tier exists)
- Milestone 8: historical snapshots — scan history, normalised state comparison, new/removed/changed/resolved diffing
- Milestone 9: optional weekly monitoring for verified businesses. No paid subscription tier for this until the core free product has proven useful, per the brief's own instruction

## Explicitly deferred, not forgotten

- A restricted internal Pharos analyst view (brief section 40) — minimal, after the public product works, not before
- Lookalike-domain module (brief section 15) — genuinely useful later, explicitly not allowed to delay the MVP
- PDF export as a dedicated pipeline — only if print-quality HTML turns out not to be enough
- A full security review pass (brief section 44: BOLA, auth, log redaction, dependency audit) — appropriate once there's a real HTTP surface and stored data to review; premature against Milestone 1's pure library code, which has no such surface yet, though SSRF and input-validation tests already exist for the pieces that do make network calls
