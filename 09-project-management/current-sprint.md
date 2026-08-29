---
title: Current Sprint
status: approved
owner: Jason Hill
last-reviewed: 2026-07-22
review-cycle: weekly, or when a sprint completes
---

# Current Sprint

## 2026-08-22 update: Pharos v2 pass complete

A separate, more detailed directive (Pharos v2: positioning, service architecture, and website improvement) was received and implemented in this pass. This explicitly required implementation, not just recommendations, which supersedes the "not in this sprint: rebuilding or expanding the live website" line below for this specific pass. Full detail in `00-business/decisions.md` (2026-08-22 entry) and `09-project-management/backlog.md` (2026-08-22 section) for what's now queued next. The question-5 gate below (insurance, legal, certification, registration, domain) is unaffected: it still blocks taking a paying client regardless of how good the positioning or website now are.

## Sprint focus

Questions 1 to 4 are answered. Question 5 is closed with an explicit conservative assumption rather than a real answer, since only Jason Hill has the actual facts. The sprint now shifts to the work questions 1 to 4 unblocked: the master plan, the folder migration, and continuing the agent catalogue. Taking a paying client stays blocked until question 5's assumption is corrected with real status.

## In this sprint

- [x] Reconciliation review (`09-project-management/current-state-review.md`)
- [x] Decision brief with 5 prioritised questions (`09-project-management/decisions-required.md`)
- [x] Decision log established (`00-business/decisions.md`)
- [x] Project management scaffolding: this file, backlog, risks, changelog, milestones
- [x] `CLAUDE.md`
- [x] Agent standard and workflow standard
- [x] Project Lead Agent, full specification
- [x] Agent catalogue, indexed by build priority tier
- [x] Em dash removed from the live website's React components
- [x] Founder name placeholders corrected to Jason Hill across 4 files
- [x] Questions 1 to 4 answered and recorded (`00-business/decisions.md`, 2026-07-22)
- [x] `04_Operating_Manual/discovery-call-process.md` and `client-intake-process.md` revised to the confirmed 15-minute call
- [x] Question 5 closed with an explicit ASSUMPTION (all five items default to "not yet in place") rather than left open indefinitely; genuinely cannot be answered without Jason Hill's real status, see `00-business/decisions.md`
- [ ] Jason Hill corrects any of question 5's five assumed statuses that are wrong
- [ ] `00-business/pharos-master-plan.md`
- [ ] Execute folder migration to kebab-case taxonomy
- [ ] Business Analyst Agent specification
- [ ] `08-research/market-research-plan.md`
- [ ] Website Strategy Agent specification
- [ ] Intake, discovery call, proposal workflow drafts (using the now-revised `04_Operating_Manual/` as source material)

## Explicitly not in this sprint

- The remaining 15 agent specifications from the directive's build-now list, beyond Project Lead. Continuing in the sequencing order in `03-agents/agent-catalogue.md`, not all at once.
- Anything gated on question 1's active-testing services (Vulnerability Assessment, External Attack Surface Review, their agents and tooling). Stays deferred regardless of question 5's answer, until insurance and certification are actually confirmed in place, not just asked about.
- Em dash removal from the remaining 85 existing markdown files. Logged as a near-top backlog item, deliberately not rushed in this pass.
- Rebuilding or expanding the live website. The directive explicitly says not to build the production website during this pass.

## Definition of done for this sprint

`00-business/pharos-master-plan.md` written, and the folder migration either executed or explicitly scheduled with Jason Hill's confirmation of timing. Question 5 does not need a final answer to close this sprint; it needs to stay visibly open rather than quietly forgotten.

## Next sprint (proposed)

Once Jason Hill corrects any wrong items in question 5's assumed status table: update the launch-readiness view in `09-project-management/risks.md` and `10_Admin/next-actions.md` to reflect real status, and if insurance and certification are confirmed, reopen question 1's active-testing gate as a new, separate decision rather than assuming it follows automatically. Continue the agent catalogue in sequencing order. Begin `08-research/market-research-plan.md`.
