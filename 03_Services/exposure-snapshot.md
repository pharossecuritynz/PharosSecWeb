# Exposure Snapshot

**New service, added 2026-08-22 under the Pharos v2 directive**, standing in for the "Digital Exposure Review" second entry point approved in the 2026-07-22 answer to question 1. **Rebuilt 2026-08-31 as a free, automated, self-serve web tool**, replacing the original manually-delivered, paid version of this service. See `00-business/decisions.md` for both decisions, and `08_Website/pharos-security-site/docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md` for the technical build.

## Purpose

An independent, automated look at what's visible about a business from the outside, its domain, email security, exposed services, and public footprint, without touching or logging into anything internal. The free front door into the Pharos service model: instant, no obligation, genuinely useful on its own.

## Who it's for

Any business owner who wants a fast, no-commitment read on their external footprint before talking to anyone. It's also the natural pre-call input for the 15-minute Security Conversation: a prospect (or the founder, ahead of the call) can run it first to make that conversation more specific and useful.

## Level 1 (public) and Level 2 (verified)

- **Level 1, public**: anyone can run a scan against a domain without proving they control it. Uses only passive, publicly available sources (DNS, RDAP/WHOIS, certificate transparency, public threat intelligence). Never returns individual employee email addresses, credential contents, or other personal information, even in aggregate.
- **Level 2, verified**: available once the business demonstrates control of the domain (see the architecture doc for the verification model). Unlocks domain-wide credential exposure checks (Have I Been Pwned) and any other data too sensitive to show an unverified requester. Level 1 never accidentally exposes Level 2 data.

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

1. An instant, plain-English Exposure Snapshot report on screen: an executive summary, a prioritised top-three actions, and findings by area, each labelled with its evidence type and verification level per `04_Operating_Manual/evidence-standard.md` (predominantly "observed" or "external observation", since this is Pharos's own automated external observation, not client-reported)
2. Optionally emailed to the business, via a verified link (see the architecture doc's email/verification model)
3. A calm, low-pressure invitation to book the 15-minute Security Conversation if the business wants help interpreting the results — not a hard sales pitch built into the report itself

## Inputs required from client

- Business name, domain, and a work email address
- Nothing requiring access, login, or authorisation from the client at Level 1 — that's the point of this service. Level 2 requires proving control of the domain, nothing more.

## Delivery process

Fully automated. A business enters its details, the scan runs (DNS, email authentication, certificate/subdomain history, RDAP/WHOIS, and any configured exposure-intelligence providers), and the report is produced immediately. No founder time is required per scan; founder effort goes into building and maintaining the scanner itself (see the architecture and roadmap docs) rather than delivering each individual report.

## Suggested pricing

**Free.** This is the deliberate, confirmed front door into the Pharos service model (Exposure Snapshot → 15-minute conversation → Independent Security Review / IT Provider Security Assurance → Secure Foundations / Incident Readiness → Security Adviser), replacing the original paid, manually-delivered version of this service. See `service-catalogue.md` for the updated funnel and `00-business/decisions.md` for the reasoning.

## Risks and limitations

- Externally visible findings are necessarily partial: a clean external footprint doesn't mean internal controls are sound, and the report must say so
- Leaked credential findings can be sensitive; handle disclosure calmly and factually, never as a scare tactic, and never show Level 2 data to an unverified requester
- An automated report is not a substitute for a human-reviewed Independent Security Review when a business's risk profile clearly warrants the fuller engagement, and the report should say so plainly
- Provider outages or missing credentials must degrade a specific check to "not checked," never silently to a false "no issue found" — see the architecture doc's resilience section

## Sales copy

> See what your business looks like from the outside, in about a minute. A free, independent check of your domain, your email security, and what's publicly exposed, without touching anything internal.

## Report/output structure

Report structure follows the evidence, interpretation, action standard in `04_Operating_Manual/pharos-security-baseline.md`, implemented directly by the finding schema in `08_Website/pharos-security-site/docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md`.
