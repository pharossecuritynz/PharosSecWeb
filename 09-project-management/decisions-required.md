---
title: Decisions Required
status: approved
owner: Oscar
last-reviewed: 2026-07-22
review-cycle: update as answered
---

# Decisions Required

Questions 1 to 4 answered 2026-07-22: Oscar confirmed the stated recommendation for each. Question 5 remains open; it asks for facts only Oscar has, not a judgement call, and is not something that can be answered by recommendation. Full resolutions logged in `00-business/decisions.md`.

## 1. Advisory-only versus active technical testing

**ANSWERED, CONFIRMED 2026-07-22.** Pharos launches advisory-only. Vulnerability Assessment, External Attack Surface Review, and their supporting agents and tooling (External Exposure Analyst Agent, Security Scope and Authorisation Agent, Nmap tooling) move to "build after client validation," gated on question 5's insurance and certification answers, not on a target date. Digital Exposure Review (passive research only) is not gated by this and can be scoped as a second entry point alongside Cyber Risk Review. `02_Business_Strategy/risk-boundaries.md` and `03_Services/service-boundaries.md` stand as written; no rewrite required, since the decision keeps the status quo rather than changing it.

## 2. Folder taxonomy migration

**ANSWERED, CONFIRMED 2026-07-22.** Migrate to the directive's kebab-case taxonomy. Because question 1 resolved as "no change to the service model," the migration is no longer blocked on a service catalogue rewrite happening at the same time, so it can proceed as a standalone mechanical pass whenever it is scheduled. **Not yet executed.** This is a large, hard-to-reverse-cleanly operation across roughly 94 files and every cross-reference between them; it is queued as the top "Next" item in `09-project-management/backlog.md` rather than run automatically as a side effect of this decision being confirmed. See the mapping table in `09-project-management/current-state-review.md`.

## 3. First-sale service naming

**ANSWERED, CONFIRMED 2026-07-22.** Keep "Cyber Risk Review" as the front-door service name; do not rename to "Security Posture Review." Digital Exposure Review added as a second, narrower entry point (see question 1).

## 4. Free discovery call length

**ANSWERED, CONFIRMED 2026-07-22.** 15 minutes, structured, per the directive's minute-by-minute format. `04_Operating_Manual/discovery-call-process.md` and `04_Operating_Manual/client-intake-process.md` have been revised to match.

## 5. What is actually in place right now

**Still open.** This cannot be resolved by recommendation; it is a direct request for facts:

- Is professional indemnity and public liability insurance bound, in progress, or not started?
- Has a lawyer been engaged for the Terms of Engagement, or is this not started?
- Does Oscar hold any recognised security certification relevant to active testing work?
- Is a business structure (sole trader or limited company) registered yet?
- Is the domain (pharossecurity.co.nz or an alternative) registered?

Until answered, `09-project-management/risks.md` treats all five as unconfirmed (the conservative default), and question 1's "build after client validation" gate on active-testing services stays closed. Nothing downstream assumes insurance or certification is in place.

## Work unblocked by the 2026-07-22 answers

- `00-business/pharos-master-plan.md` can now be written: it no longer needs to wait on a service-model rewrite, since question 1 kept the existing model.
- The remaining build-now agent specifications in `03-agents/agent-catalogue.md` can proceed for every agent not gated on question 1.
- Folder migration (question 2) is ready to execute whenever scheduled; it is not blocked on anything further, only queued.
- `08-research/market-research-plan.md` was already unblocked and remains the next major piece of work not touched by this pass.

## Work still blocked

- Everything in `03-agents/agent-catalogue.md` marked `DEFERRED` against question 1.
- Any service catalogue entry for Vulnerability Assessment or External Attack Surface Review.
