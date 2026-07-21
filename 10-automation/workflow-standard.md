---
title: Workflow Standard
status: approved
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: review when a workflow spec fails to fit the template
---

# Workflow Standard

The required structure for every workflow document in `10-automation/`. A workflow differs from an agent specification: a workflow describes a business process end to end, which may involve Oscar, one or more agents, and manual steps together. An agent specification describes one component within a workflow.

## Required fields

| Field | Purpose |
|---|---|
| Trigger | What starts this workflow |
| Owner | Who is accountable for the workflow running correctly |
| Inputs | What must exist before the workflow can start |
| Steps | Numbered, in order |
| Decision points | Where a human or an agent must choose between paths |
| Outputs | What exists once the workflow completes |
| Controls | What prevents the workflow from producing a bad outcome (approvals, checks, gates) |
| Failure paths | What happens when a step cannot complete |
| Human approvals | Which steps require Oscar's explicit sign-off before continuing |
| Records created | What gets logged, and where |
| Completion criteria | How to know the workflow is actually finished, not just that steps were run |

## Relationship to the operating manual

`04_Operating_Manual/` already documents most of Pharos's processes in SOP prose (client intake, discovery calls, proposals, delivery, reporting, quality checks, communication, data handling, escalation, weekly rhythm). These are the source material for the controlled workflow documents in `10-automation/`, not a competing structure. Each SOP becomes one or more workflow documents when it is rewritten to this standard, at which point the original SOP file is marked superseded and kept as background, not deleted.

## Naming and location

One file per workflow, kebab-case, in `10-automation/`, named `<workflow-name>-workflow.md`. The catalogue in `10-automation/workflow-catalogue.md` indexes every workflow and its status.

## Order of construction

Workflows that do not depend on the open questions in `09-project-management/decisions-required.md` come first: intake, free call, proposal, website development, report production. Workflows tied to active technical testing (SOC peer review as specified in the directive, scope and authorisation, evidence collection for scanning-based services) wait for question 1.
