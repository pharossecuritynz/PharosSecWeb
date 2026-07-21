---
title: Backlog
status: approved
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: weekly
---

# Backlog

## Scoring method

Every item is scored against the commercial focus test from the Master Build Directive section 20, one point per yes:

1. Does this help acquire a client?
2. Does this help deliver a service?
3. Does this improve trust?
4. Does this reduce delivery time?
5. Does this reduce operational risk?
6. Does this improve consistency?
7. Is it required before the first client?

Score out of 7. Items scoring 5 or higher, or scoring anything on question 7, sort to the top regardless of how interesting the work is otherwise. This exists specifically to stop attractive technical work (tool building, agent architecture) from displacing legal, sales, and delivery essentials, per the directive's explicit instruction.

## Now (score 5 to 7, or required before first client)

| Item | Score | Required before first client | Notes |
|---|---|---|---|
| Answer the 5 questions in `decisions-required.md` | 7 | Yes | Blocks a large share of downstream work |
| Bind professional indemnity and public liability insurance | 6 | Yes | Was already the top item in `10_Admin/next-actions.md` before this directive |
| Engage a lawyer for Terms of Engagement | 6 | Yes | Same |
| Register business structure (sole trader or limited company) | 5 | Yes | Same |
| Register domain and business email | 5 | Yes | Same |
| Remove em dash from all 91 existing markdown files | 4 | No, but close | Mechanical, large, deferred from this pass deliberately; see current-state review |
| Write Oscar's founder bio and background for the About section | 5 | No | Currently the largest credibility gap on the website |

## Next (score 3 to 4, not required before first client)

| Item | Score | Notes |
|---|---|---|
| Business Analyst Agent specification | 4 | Supports Phase 3 commercial foundation |
| Documentation Architect Agent specification | 3 | Supports keeping this repository consistent as it grows |
| Website Strategy, Content, Design Reviewer, Technical Architect Agent specifications | 4 | Supports Phase 4, does not require rebuilding the live site |
| Intake, discovery call, call notes, proposal workflow drafts | 4 | Supports Phase 5, most content already exists in `04_Operating_Manual/` and needs restructuring rather than fresh writing |
| Market research plan (`08-research/market-research-plan.md`) | 4 | Not blocked by the two open questions, recommended as the next major piece of work |
| Report Writer and Report Quality Agent specifications | 4 | Supports Phase 6, closest existing prompts already exist |
| `00-business/pharos-master-plan.md` | 3 | Deferred until questions 1 to 3 land, to avoid rewriting it immediately after |

## Later (score 1 to 2, or explicitly gated on question 1)

| Item | Score | Gated on |
|---|---|---|
| Digital Exposure Review service definition | 3 | Nothing (passive research only), but sequenced after the front-door service is confirmed |
| External Exposure Analyst Agent (passive-only split) | 2 | Question 1 for the active-testing half |
| Vulnerability Assessment and External Attack Surface Review service definitions | 2 | Question 1, entirely |
| Security Scope and Authorisation Agent | 1 | Question 1, entirely |
| Nmap Command Builder, Nmap Results Parser, External Exposure Evidence Collector | 1 | Question 1, entirely, and explicitly last in the directive's own tool priority order |
| Folder migration to kebab-case taxonomy | 3 | Question 2 |

## Do not build unless required

Client dashboard, complex multi-agent orchestration framework, public-facing scanning or assessment tools of any kind. Explicitly excluded by the directive itself (section 15).

## Deferred until client validation

The 12 agents in `03-agents/agent-catalogue.md`'s "build after initial client validation" tier. Not scored individually; revisit as a block once the first paid engagement completes.
