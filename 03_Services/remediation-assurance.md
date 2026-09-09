# Remediation Assurance

**New service, added 2026-09-09 under the commercial-validation pivot.** See `00-business/pharos-current-strategy.md` for why this is a new, deliberately lighter service rather than a rename of `secure-foundations.md`, which remains valid but is marked BUILD LATER.

## Status

**ACTIVE NOW.** The intended natural follow-on paid step after an Independent Security Review or IT Provider Security Assurance engagement, for the current 90-day validation window.

## Purpose

After Pharos has identified the important issues, Remediation Assurance answers a narrower, concrete question: **did the important things actually get fixed, and what's still outstanding?**

## Who it's for

A client who has completed an Independent Security Review or IT Provider Security Assurance, has asked their MSP or internal IT team to act on some or all of the findings, and wants an independent check that the important ones were genuinely addressed, rather than taking it on trust or leaving it unverified.

## Problems it solves

- "Our MSP said they've fixed it. How do we know?"
- "We don't want to pay for a whole second review just to check three things."
- "We need to show our board or insurer that the priority issues from the last review are actually closed out."
- "Our IT provider has questions about what a finding actually means; can you clarify directly with them?"

## How this differs from Secure Foundations

Secure Foundations (`secure-foundations.md`, BUILD LATER) is a bounded 90-day coordination period across an entire improvement roadmap, roughly 10 to 13 hours of founder time. Remediation Assurance is smaller and cheaper: it verifies a defined, already-agreed set of findings, not a full programme. A client who wants ongoing coordination across a broader roadmap is a Secure Foundations conversation, not this.

## Scope

- Convert the prior review's Now/Next findings into clear, individually named work packages the client can hand to their MSP or internal IT team
- Answer clarification questions from the client's IT provider about what a finding means and what "fixed" looks like for it
- Review evidence of remediation supplied by the client or their IT provider (screenshots, configuration exports, a short screen-share, written confirmation)
- Retest what can reasonably be independently re-checked without further access requests (for example, an external check via Exposure Snapshot, or a repeat of a specific configuration check where access already exists)
- Identify anything still unresolved or only partially addressed, and why
- Provide a short, plain-English updated status: fixed, partially fixed, not yet addressed, or no longer relevant, against each original finding

## Out of scope

- Verifying findings never previously raised by Pharos (that's a new review, not this)
- Hands-on implementation of any fix (stays with the client's IT provider)
- Open-ended, ongoing verification (that's Security Adviser territory, not this)
- Production changes performed directly by Pharos

## Deliverables

1. A work-package breakdown of the prior review's Now/Next findings, ready to hand to the client's IT provider
2. A short remediation-status update: what's fixed, what's partial, what's outstanding, each against the original finding ID
3. A brief call to walk through the status, with the option to include the client's IT provider

## Inputs required from client

- The prior Independent Security Review or IT Provider Security Assurance findings to verify against
- Evidence of remediation from the client or their IT provider (does not need to be exhaustive; approximate or partial evidence is fine, and the status update says so where it applies)
- Access already granted for the original review, where retesting depends on it

## Delivery process

1. Confirm which findings are in scope for verification (usually the Now/Next items from the prior review)
2. Client/IT provider supplies remediation evidence
3. Review evidence and retest where independently possible
4. Draft the updated status
5. Short walkthrough call

## Estimated effort (founder time)

| Task | Time |
|---|---|
| Work-package breakdown | 1–1.5 hours |
| Evidence review and retesting | 1.5–3 hours |
| Status write-up | 1 hour |
| Walkthrough call | 0.5–1 hour |
| **Total** | **~4–6.5 hours** |

## Suggested pricing range (working hypothesis, not yet market-tested)

**NZD $750 – $1,500** (excl. GST), scoped by the number of findings being verified. At the estimated effort above, this implies roughly $115 to $375/hour; treat the lower end as acceptable for the first few clients while the process is being proven, and revisit if real delivery time consistently pushes below the $180/hour floor set in `00-business/pharos-current-strategy.md`.

## Risks and limitations

- Verification quality depends on the evidence the client's IT provider is willing to share; a provider that's slow or unwilling to cooperate is the main schedule and quality risk
- Not every finding can be independently retested without broader access than the original review had; the status update should say plainly where a "fixed" claim rests on the provider's word rather than direct observation, per the existing verification-level standard in `04_Operating_Manual/pharos-security-baseline.md`
- Should stay strictly constructive in tone toward the IT provider, consistent with `01_Brand/positioning.md`'s MSP-relationship framing

## Sales copy

> You've had the review. Your IT provider says the important things are handled. Remediation Assurance checks that independently, in plain English, so you're not just taking it on trust.

## Report/output structure

A short status document, not a full second report: one line per original finding ID, its new status, and what that status is based on (self-reported, documented, observed, or verified), per `04_Operating_Manual/evidence-standard.md`.

## Assumptions / needs founder input

- Pricing and effort estimates are working hypotheses, not yet tested against a real engagement. Revisit after the first 2 to 3 completed engagements.
