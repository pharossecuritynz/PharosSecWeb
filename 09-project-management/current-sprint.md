---
title: Current Sprint
status: approved
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: weekly, or when a sprint completes
---

# Current Sprint

## Sprint focus

Resolve the open decisions blocking everything else, and finish the leadership and process scaffolding that does not depend on them. Per the directive's own sprint 1 guidance: resolve positioning, confirm the first service, confirm the free call, build agent foundations, create the intake workflow, create the website specification, prepare market validation, and avoid tool development until service requirements are clearer.

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
- [x] Founder name placeholders corrected to Oscar across 4 files
- [ ] Oscar answers the 5 questions in `decisions-required.md`
- [ ] Business Analyst Agent specification
- [ ] `08-research/market-research-plan.md`
- [ ] Website Strategy Agent specification
- [ ] Intake, discovery call, proposal workflow drafts (using `04_Operating_Manual/` as source material)

## Explicitly not in this sprint

- The remaining 15 agent specifications from the directive's build-now list, beyond Project Lead. Deferred until the sprint's open questions are answered, per the directive's own instruction not to generate hundreds of files before checking in.
- `00-business/pharos-master-plan.md`. Deferred until questions 1 to 3 land.
- Folder migration to the kebab-case taxonomy. Deferred until question 2 lands.
- Any tool development (Domain Intelligence Workbench, Nmap tooling, evidence collectors). Explicitly last in the directive's own priority order, and mostly gated on question 1 regardless.
- Em dash removal from the 91 existing markdown files. Logged as a near-top backlog item, deliberately not rushed in this pass.
- Rebuilding or expanding the live website. The directive explicitly says not to build the production website during this pass.

## Definition of done for this sprint

Oscar has a clear, short decision brief to respond to, the project has a working leadership and governance layer that the next sprint can build on without rework, and nothing has been silently decided that should have been asked.

## Next sprint (proposed, pending this sprint's answers)

Once question 1 is answered: write or confirm the service catalogue changes it implies, then `00-business/pharos-master-plan.md`. Once question 2 is answered: execute the folder migration in the same pass as any service catalogue rewrite. Regardless of both: continue the agent catalogue in the sequencing order set out in `03-agents/agent-catalogue.md`, and begin `08-research/market-research-plan.md`.
