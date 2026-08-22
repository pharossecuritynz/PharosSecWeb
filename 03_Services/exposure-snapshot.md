# Exposure Snapshot

**New service, added 2026-08-22 under the Pharos v2 directive**, standing in for the "Digital Exposure Review" second entry point approved in the 2026-07-22 answer to question 1. See `00-business/decisions.md`.

## Purpose

An independent look at what's visible about a business from the outside, its domain, email security, exposed services, and public footprint, without touching or logging into anything internal. A lower-cost, lower-commitment entry point than the Independent Security Review.

## Who it's for

Businesses that want an independent check but aren't ready to commit to the full review, or that have a specific external concern (a domain, a public-facing system, a supplier who asked "what's exposed?"). Also useful as a fast pre-call input: the founder can run one before the 15-minute Security Conversation to make that call more useful.

## Problems it solves

- "What does our business actually look like from the outside, to someone trying to find a way in?"
- "We just want a lighter-touch check before committing to a full review."
- "Our domain/email security has never been checked."

## Scope

External, passive, and lawful only. Typically includes:

- Domain and DNS configuration
- Email security records (SPF, DKIM, DMARC presence and configuration)
- Exposed services and public infrastructure, observed from outside (no scanning that requires authorisation)
- Basic OSINT: what's publicly discoverable about the business and its people
- Leaked credential exposure, checked only against lawful, reputable public breach-data sources
- Obvious public configuration issues
- Public company exposure (what a search of the business surfaces)

## Explicitly not a penetration test

This is passive, external-only observation of what's already public. It does not include active exploitation, authenticated testing, or anything requiring the client's authorisation to test a specific system. State this plainly in every proposal and report, per `03_Services/service-boundaries.md`.

## Safe operating boundaries

- No active scanning of systems that would require client authorisation
- No attempts to access anything beyond what's publicly discoverable
- No interaction with third-party systems (suppliers, partners) even if referenced by the client's public footprint
- Leaked credential checks use only reputable, lawful public data sources, never active credential-testing against the client's live systems

## Deliverables

1. Exposure Snapshot Report: plain-English summary of what's externally visible, flagged by verification level (mostly "observed", since this is Pharos's own external observation, not client-reported)
2. Prioritised list of anything worth addressing
3. A short call to walk through findings (20 to 30 minutes)

## Inputs required from client

- Domain name(s) and any known public-facing systems
- Nothing requiring access, login, or authorisation from the client — that's the point of this service

## Delivery process

1. Scoping/proposal — confirm domain(s) and any specific concern
2. External research and observation (allow half a day)
3. Report written
4. Findings call
5. Report delivered, with a clear next-step recommendation (Independent Security Review if broader gaps are suspected)

## Estimated effort (founder time)

| Task | Time |
|---|---|
| Scoping/proposal | 0.5 hour |
| External research | 2–3 hours |
| Report writing | 1.5–2 hours |
| Findings call | 0.5 hour |
| **Total** | **~4.5–6 hours** |

## Suggested pricing range

**NZD $400 – $900** (excl. GST). Deliberately priced below the Independent Security Review, as a lighter, faster, lower-commitment entry point. See `02_Business_Strategy/pricing-strategy.md`.

## Risks and limitations

- Externally visible findings are necessarily partial: a clean external footprint doesn't mean internal controls are sound, and the report must say so
- Leaked credential findings can be sensitive; handle disclosure calmly and factually, never as a scare tactic
- Should not be marketed as a substitute for the Independent Security Review when a business's risk profile clearly warrants the fuller engagement

## Sales copy

> A fast, independent look at what your business looks like from the outside, your domain, your email security, what's publicly exposed, without touching anything internal. A practical first step if you're not ready for a full review, or want to know before anyone else does.

## Report/output structure

Report structure follows the evidence, interpretation, action standard in `04_Operating_Manual/pharos-security-baseline.md`.
