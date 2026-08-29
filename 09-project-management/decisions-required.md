---
title: Decisions Required
status: approved
owner: Jason Hill
last-reviewed: 2026-07-22
review-cycle: update as answered, or when question 5's status changes
---

# Decisions Required

Questions 1 to 4 answered 2026-07-22: Jason Hill confirmed the stated recommendation for each. Question 5 asked for facts (insurance, legal, certification, and registration status) that only Jason Hill has and that could not be filled in by recommendation or inference. It was closed 2026-07-22 with a conservative **ASSUMPTION** ("not yet in place" by default) rather than left open. On 2026-08-24, Jason Hill confirmed directly that Pharos is still in the idea phase: none of the five items are in place. The table below is now marked **CONFIRMED** rather than assumed. Full resolutions logged in `00-business/decisions.md`.

## 1. Advisory-only versus active technical testing

**ANSWERED, CONFIRMED 2026-07-22.** Pharos launches advisory-only. Vulnerability Assessment, External Attack Surface Review, and their supporting agents and tooling (External Exposure Analyst Agent, Security Scope and Authorisation Agent, Nmap tooling) move to "build after client validation," gated on question 5's insurance and certification answers, not on a target date. Digital Exposure Review (passive research only) is not gated by this and can be scoped as a second entry point alongside Cyber Risk Review. `02_Business_Strategy/risk-boundaries.md` and `03_Services/service-boundaries.md` stand as written; no rewrite required, since the decision keeps the status quo rather than changing it.

## 2. Folder taxonomy migration

**ANSWERED, CONFIRMED 2026-07-22.** Migrate to the directive's kebab-case taxonomy. Because question 1 resolved as "no change to the service model," the migration is no longer blocked on a service catalogue rewrite happening at the same time, so it can proceed as a standalone mechanical pass whenever it is scheduled. **Not yet executed.** This is a large, hard-to-reverse-cleanly operation across roughly 94 files and every cross-reference between them; it is queued as the top "Next" item in `09-project-management/backlog.md` rather than run automatically as a side effect of this decision being confirmed. See the mapping table in `09-project-management/current-state-review.md`.

## 3. First-sale service naming

**ANSWERED, CONFIRMED 2026-07-22.** Keep "Cyber Risk Review" as the front-door service name; do not rename to "Security Posture Review." Digital Exposure Review added as a second, narrower entry point (see question 1).

## 4. Free discovery call length

**ANSWERED, CONFIRMED 2026-07-22.** 15 minutes, structured, per the directive's minute-by-minute format. `04_Operating_Manual/discovery-call-process.md` and `04_Operating_Manual/client-intake-process.md` have been revised to match.

## 5. What is actually in place right now

**CONFIRMED 2026-08-24, superseding the 2026-07-22 ASSUMPTION.** Jason Hill confirmed directly that Pharos Security is still in the idea phase: he was made redundant from his role at timbre Digital and is building Pharos from that starting point, not from an already-trading business. None of the five items below are in place:

| Item | Status | Basis |
|---|---|---|
| Professional indemnity and public liability insurance | **Not bound** | Founder-confirmed 2026-08-24, idea phase |
| Lawyer engaged for Terms of Engagement | **Not engaged** | Founder-confirmed 2026-08-24, idea phase |
| Recognised security certification (for example CREST, OSCP) relevant to active testing | **Not held** | Founder-confirmed 2026-08-24, idea phase |
| Business structure (sole trader or limited company) | **Not registered** | Founder-confirmed 2026-08-24, idea phase |
| Domain (pharossecurity.co.nz or an alternative) | **Not registered** | Founder-confirmed 2026-08-24, idea phase; website and contact material still use it as a placeholder |

**Consequence:** question 1's "build after client validation" gate on active-testing services stays closed, and the business is not ready to take a paying client, engage a real prospect, or send outward-facing material like `06_Sales_and_Marketing/business-pitch.md` to anyone outside Pharos yet. See `10_Admin/next-actions.md` items 1 to 4 and `09-project-management/risks.md` for what closes this out. Update this table again, item by item, as each one is actually completed.

## Work unblocked by the 2026-07-22 answers

- `00-business/pharos-master-plan.md` can now be written: it no longer needs to wait on a service-model rewrite, since question 1 kept the existing model.
- The remaining build-now agent specifications in `03-agents/agent-catalogue.md` can proceed for every agent not gated on question 1.
- Folder migration (question 2) is ready to execute whenever scheduled; it is not blocked on anything further, only queued.
- `08-research/market-research-plan.md` was already unblocked and remains the next major piece of work not touched by this pass.

## Work still blocked

- Everything in `03-agents/agent-catalogue.md` marked `DEFERRED` against question 1, until question 5's table is corrected to show insurance and certification actually in place.
- Any service catalogue entry for Vulnerability Assessment or External Attack Surface Review.
- Taking on any paying client, until question 5's insurance and Terms of Engagement rows are corrected.
