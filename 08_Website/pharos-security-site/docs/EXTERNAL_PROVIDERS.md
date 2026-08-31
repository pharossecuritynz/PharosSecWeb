# Exposure Snapshot — External Providers

Researched against current, live documentation on 2026-08-31 (not older blog posts or assumptions, per the build brief's explicit instruction). Revisit this document whenever a provider's terms or API might have changed, and before switching any provider from mock/unconfigured to a real credential.

## DNS (native)

| | |
|---|---|
| Purpose | A/AAAA/MX/TXT/NS/CAA record lookups |
| Data returned | Standard DNS records |
| Authentication | None |
| Rate limits | None beyond the resolver's own (uses Node's system resolver) |
| Cost | Free |
| Licence restrictions | None |
| Privacy considerations | None — public DNS data |
| MVP or later | **MVP.** Implemented via Node's built-in `dns/promises`, no external dependency. |

## DNSSEC signal (Cloudflare DNS-over-HTTPS)

| | |
|---|---|
| Purpose | A cheap, correct "is this domain's DNSSEC chain validated" signal, without reimplementing cryptographic validation |
| Data returned | The `AD` (Authenticated Data) flag from a validating resolver's response |
| Authentication | None |
| Rate limits | Generous public-resolver limits; not documented as a hard number, but this tool makes at most one call per scan |
| Cost | Free |
| Licence restrictions | Cloudflare's standard public DNS resolver terms; no redistribution restriction relevant to reporting a yes/no signal |
| Privacy considerations | Sends the domain name being scanned to Cloudflare, same as any DNS query would |
| MVP or later | **MVP.** |

## RDAP (registry-native, via IANA bootstrap)

| | |
|---|---|
| Purpose | Domain registration data: registrar, creation/expiry dates, nameservers, status |
| Data returned | Structured JSON per the RDAP standard |
| Authentication | None (RDAP is a public, standardised protocol) |
| Rate limits | Registry-dependent, not documented centrally; this tool makes one call per scan with a timeout |
| Cost | Free |
| Licence restrictions | None for standard lookups |
| Privacy considerations | Registration data is already public by design of the domain system; some registries redact registrant personal details by default (increasingly common post-GDPR-era privacy defaults) |
| MVP or later | **MVP, with a caveat.** Verified directly against IANA's live bootstrap registry (`data.iana.org/rdap/dns.json`) on 2026-08-31: **`.nz` has no RDAP endpoint.** This materially affects Pharos's core NZ market — see the WHOIS fallback below. |

## WHOIS (fallback for TLDs without RDAP, notably `.nz`)

| | |
|---|---|
| Purpose | The same registration data as RDAP, for TLDs RDAP doesn't cover |
| Data returned | Unstructured text, parsed defensively (never assume every field is present) |
| Authentication | None (standard WHOIS protocol, port 43) |
| Rate limits | Server-dependent, generally more restrictive than RDAP; this tool makes one call per scan with a timeout, no retries against the same server in quick succession |
| Cost | Free |
| Licence restrictions | InternetNZ's `.nz` registry publishes WHOIS via the standard protocol (`whois.srs.net.nz`); use for individual domain lookups only, not bulk harvesting, consistent with this tool's one-scan-at-a-time design |
| Privacy considerations | Same as RDAP — already-public registration data |
| MVP or later | **MVP.** Implemented as a minimal, purpose-built raw-socket client, not screen-scraping a website, per the brief's explicit instruction to avoid brittle scraping. |

## Certificate transparency (crt.sh)

| | |
|---|---|
| Purpose | Historical hostnames associated with a domain, from public CT logs |
| Data returned | Certificate records, from which hostnames are extracted and normalised |
| Authentication | None |
| Rate limits | **Not documented by crt.sh.** Known in practice to be unreliable under load; treat as best-effort, not guaranteed |
| Cost | Free |
| Licence restrictions | None known; it's a public mirror of publicly-logged CT data |
| Privacy considerations | Only reveals hostnames that were already made public by certificate issuance — nothing newly sensitive |
| MVP or later | **MVP, with a circuit breaker.** See the architecture doc's resilience section. A paid, more reliable CT provider (several exist) is a later option if crt.sh's instability becomes a real problem in practice, not built now. |

## Shodan

| | |
|---|---|
| Purpose | Previously-observed internet-facing services associated with an IP, without Pharos scanning anything itself |
| Data returned | Open ports, banners, hostnames, tags associated with an IP, from Shodan's own prior internet-wide scanning |
| Authentication | API key |
| Rate limits | Plan-dependent |
| Cost | The genuinely-free "InternetDB" endpoint needs no key; a paid membership (from a one-time ~$49 low tier upward, per Shodan's current published pricing) is needed for the full API with more query/scan credits |
| Licence restrictions | **InternetDB's free tier is explicitly for non-commercial use only.** Using it in a commercial Pharos product without a paid plan is a licensing problem, not just a workaround. |
| Privacy considerations | IP-to-organisation attribution must be cautious — an IP can belong to shared hosting, a CDN, or cloud infrastructure, not the business itself; the finding language must reflect uncertainty (see the architecture doc's attribution-caution principle) |
| MVP or later | **Later.** Provider interface built now (`shodan.ts`), returns `not-configured` until a paid `SHODAN_API_KEY` is set. Flagging the licensing point clearly for the founder before this is ever switched on. |

## Censys

| | |
|---|---|
| Purpose | Same category of value as Shodan — previously-observed internet-facing infrastructure |
| Data returned | Host, web property, and certificate lookup data |
| Authentication | API key |
| Rate limits | Free tier: 250 queries/month, single page of 100 results per query |
| Cost | Free tier exists but is thin; paid credit packages start around $100 |
| Licence restrictions | Standard commercial terms for paid tiers; free tier terms should be re-checked at the point of enabling, since these change |
| Privacy considerations | Same attribution-caution principle as Shodan |
| MVP or later | **Later.** Provider interface built now (`censys.ts`), returns `not-configured` until a `CENSYS_API_KEY` is set. |

## Have I Been Pwned (HIBP)

| | |
|---|---|
| Purpose | Domain-wide breach/credential exposure, at Level 2 (verified) only |
| Data returned | Breach names/dates for the domain (and, on paid tiers, stealer-log data) — never raw credential contents in Pharos's own output |
| Authentication | Subscription key |
| Rate limits | Plan-dependent (the current "Core" tier documented up to 1,000 requests/minute, up to 20 monitored domains) |
| Cost | Paid subscription required for **both** email search and domain search — there is no free HIBP domain-search tier |
| Licence restrictions | **Domain-wide search requires the requester to first prove control of the domain** — this is HIBP's own requirement, not a Pharos choice, and is exactly why this capability is gated behind Level 2 verification in the architecture. HIBP's attribution requirements must be respected wherever its data is shown (a visible "data from Have I Been Pwned" credit). Scraping HIBP instead of using the documented API is explicitly against their terms and is not done here. |
| Privacy considerations | Breach data is inherently sensitive; never logged in full, never shown to an unverified requester, never included raw in an email |
| MVP or later | **Later**, and explicitly gated on the domain-verification model existing first (brief's own Milestone 6 before Milestone 7). Provider interface built with a documented mock so the product works without a subscription; no key required for Milestone 1. |

## Have I Been Pwned Pwned Passwords (not currently planned)

Doesn't require a subscription, but isn't part of the current scope — this tool checks domain/email exposure, not individual password strength. Noted here only so it isn't confused with the domain/breach search API above.

## Alternatives considered and rejected for credential exposure (researched 2026-08-31)

The founder asked whether DeHashed, OathNet, OSINTLeak, or Intelligence X ("Data Leak Check" on osint-ui.com) could make credential exposure available sooner than HIBP's domain-verification requirement. Researched directly; **none are recommended, for the same underlying reason across all four, not just cost.**

| Provider | Cost for commercial use | Why not used here |
|---|---|---|
| **DeHashed** | Paid subscription/credits, no free commercial tier | Positioned as "Free the Password" — designed to surface actual leaked credential contents, not just breach metadata. No domain-ownership gate: an anonymous requester could search any domain, including a third party's, and see real people's leaked data. |
| **OathNet** | Free tier (10 lookups/day), paid beyond that | A stealer-log search engine — indexes credentials actively harvested by malware from infected machines. Same no-ownership-gate problem, arguably more sensitive source data (live-harvested, not just old breach dumps). |
| **OSINTLeak** | Free community plan; business/API access from $6,500/year | Same stealer-log/credential category as OathNet. No domain-verification gate found. |
| **Intelligence X** (via "Data Leak Check") | Free tiers explicitly **forbid** third-party product integration; the cheapest licence that permits it is the API tier at €7,000/year (~NZD 12,500/year), rising to €20,000/year for Enterprise | Confirmed directly against intelx.io/product. Even setting cost aside, its searchable categories explicitly include "compromised credentials," dark web/paste-site content, and (on the Identity Portal tier) "password hash analysis" and "export leaked accounts" — the same raw-credential-index category as the other three, not a metadata-only source. |

**The common problem, stated plainly:** all four return or index actual credential/personal content, and none require the requester to prove they control the domain being searched — the exact opposite of HIBP's design, which was built specifically to prevent an anonymous stranger from pulling up someone else's leaked data. Wiring any of them into this tool's public, unverified Level 1 would let anyone type in any business's domain and potentially see real people's leaked passwords. That's a privacy problem, not just a brand-risk one, and it would directly contradict this tool's own Level 1 design rule (evidence-standard.md / the architecture doc: no personal data, even in aggregate, without verification).

**Decision: stay with the original plan.** HIBP remains the credential-exposure provider, gated behind domain-control verification (Milestone 6, before Milestone 7). This is not a technical shortcut being worked around — HIBP's ownership-verification requirement is the correct design for this specific capability, and no researched alternative avoids that requirement without introducing the exact problem it exists to prevent.

## Summary for Milestone 1

Only DNS (native), DNSSEC-via-DoH, RDAP, WHOIS fallback, and certificate transparency are live in this pass. Shodan, Censys, and HIBP all have real provider interfaces implementing the shared `ProviderResult` contract, and all three correctly report `not-configured` with zero cost or licensing exposure until the founder decides to pay for a real key — at which point, re-check this document's terms, since API pricing and licence conditions change.
