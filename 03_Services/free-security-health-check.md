# Free Security Health Check

**New service, added 2026-08-22 under the Pharos v2 directive.** See `00-business/decisions.md`.

## Purpose

The easiest, lowest-risk way into Pharos. A short self-serve questionnaire that gives a business owner an immediate, honest read on where they stand, without any commitment or cost.

## Who it's for

Anyone curious enough to spend ten minutes finding out whether they're doing the basics, including businesses too small for a paid engagement right now. The entry point for almost everyone who finds Pharos through search, a referral, or a Pharos Answers article.

## Problems it solves

- "We've never had any kind of look at this, and a paid review feels like a big first step."
- "I want a sense of whether we're behind before I talk to anyone."
- "Someone recommended Pharos and I want to see what they're about before booking a call."

## Format

A self-serve online questionnaire, targeting **8 to 12 minutes** to complete. Covers, at a plain-English level: identity and access (MFA), devices, backups, email security, cloud platform basics, incident preparedness, and privacy/data handling basics.

## Output

- A simple overview of where the business appears to stand, by area
- Key areas worth a closer look
- Initial, general recommendations
- An invitation to book the 15-minute Security Conversation

## What it is not

Not a scored audit and not a substitute for an independent review. Every answer is self-reported by the person filling it in; nothing is independently checked. The output must say so, plainly, rather than presenting a confident-looking score.

If a numeric or banded result is shown for accessibility (for example, "looks broadly on track" / "a few gaps worth checking" / "worth a closer look soon"), it must be visibly labelled as based on self-reported answers only, with no independent verification, per the verification-level standard in `04_Operating_Manual/pharos-security-baseline.md`.

## Delivery process

1. Client completes the questionnaire online, no account or payment required
2. Automated summary generated immediately
3. Summary offers a next step: book the 15-minute Security Conversation, or (for a business that wants more than self-reported input) the Exposure Snapshot or Independent Security Review

## Estimated effort (founder time)

Near-zero marginal effort per completion once built. Founder time goes into building and periodically reviewing the questionnaire and its output logic, not into individual completions.

## Suggested pricing

**Free.** This is a deliberate zero-cost, zero-obligation entry point, not a loss-leader with a hidden catch.

## Risks and limitations

- Self-reported answers can be wrong, optimistic, or simply mistaken (a respondent may confidently answer "yes" to something they don't actually know) — the output must reflect that limitation, not paper over it
- Must not create false confidence: a "looks broadly on track" result should still name one or two things worth independently checking, since self-report alone can't confirm anything
- Should not be built as a lead-gen trap that demands contact details before showing any value — give the summary first, invite the call second

## Sales copy

> Not sure where to start? Answer a few plain questions about how your business handles the basics, MFA, backups, devices, email, and get an honest, no-obligation read on where you stand. Takes about ten minutes.

## Build note

This is a genuine implementation item (a working questionnaire and results page on the website), not just a content page. See the website conversion path in `08_Website/website-brief.md` and the backlog for build sequencing.
