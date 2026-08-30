# Exposure Snapshot — Roadmap

## NOW (this pass: Milestone 0 + Milestone 1)

- Architecture, provider comparison, decisions log, this roadmap
- Core passive scanner engine (`lib/exposure-snapshot/`): domain validation, SSRF-safe fetch, DNS, DNSSEC signal, RDAP + WHOIS fallback, certificate transparency + subdomain classification, SPF/DMARC parsers, DKIM detector, mail-platform detector, finding schema + deterministic remediation knowledge base, scan orchestrator
- Full unit and security test suite (Vitest)
- Business doc updates reflecting the confirmed free/automated pricing decision

## NEXT (Milestone 2-4: finding polish, exposure intelligence, and UI)

- Milestone 2: finding-engine polish — executive-summary model, top-three-actions selection logic, domain-level scorecard rollup
- Milestone 3: wire Shodan/Censys once the founder has decided whether to pay for real credentials (see `EXTERNAL_PROVIDERS.md` for the licensing detail that decision depends on)
- Milestone 4: public UI — scan form (business name, domain, work email), progress state, results page, technical-details layer, mobile responsiveness, accessibility. This is also when a database (Netlify DB / Neon Postgres + Drizzle, per the architecture doc) and the first API route (`app/api/exposure-snapshot/scan/route.ts`) get built, since a public endpoint is what actually needs rate limiting, abuse protection (Cloudflare Turnstile), and persistence
- New status-badge colours finalised and added to `app/globals.css`'s `@theme inline` tokens (see the decisions log)

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
