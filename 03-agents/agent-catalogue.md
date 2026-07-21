---
title: Agent Catalogue
status: review
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: update whenever an agent's status changes
---

# Agent Catalogue

Index of every agent named in the Master Build Directive, by build priority tier. Full specifications, written against `03-agents/agent-standard.md`, are created in the order set out below. Most of the catalogue is `PROPOSED` rather than specified in full, because writing 16 detailed specifications before question 1 in `09-project-management/decisions-required.md` is answered risks specifying agents for services that may not launch. See `09-project-management/current-state-review.md` for the reasoning.

The original studio's `07_Agents/` folder already contains 11 working, lighter-structure prompts (Brand Strategist, Website Copywriter, Service Designer, NZ SME Cyber Advisor, Microsoft 365 Review, Phishing Readiness, Incident Readiness, Report Writer, Proposal Writer, Marketing Content, Quality Review). These are usable today and are noted against their closest equivalent below.

## Build now

| Agent | Status | Depends on open question | Closest existing equivalent | Full spec |
|---|---|---|---|---|
| Project Lead Agent | CONFIRMED, specified | No | New | `03-agents/project-lead-agent.md` |
| Business Analyst Agent | PROPOSED | No | New | Not yet written |
| Market Research Agent | PROPOSED | No | New | Not yet written |
| Website Strategy Agent | PROPOSED | No | New | Not yet written |
| Website Content Agent | PROPOSED | No | `07_Agents/website-copywriter-agent.md` | Rewrite pending |
| Website Design Reviewer Agent | PROPOSED | No | New | Not yet written |
| Website Technical Architect Agent | PROPOSED | No | New | Not yet written |
| Intake Analyst Agent | PROPOSED | No | New | Not yet written |
| Discovery Call Assistant Agent | PROPOSED | No | New | Not yet written |
| Call Notes Processor Agent | PROPOSED | No | New | Not yet written |
| Proposal Writer Agent | PROPOSED | No | `07_Agents/proposal-writer-agent.md` | Rewrite pending |
| Documentation Architect Agent | PROPOSED | No | New | Not yet written |
| Report Writer Agent | PROPOSED | No | `07_Agents/report-writer-agent.md` | Rewrite pending |
| Report Quality Agent | PROPOSED | No | `07_Agents/quality-review-agent.md` | Rewrite pending |
| SOC Assistant Agent | PROPOSED | Partially: most useful once question 1 answered, but has legitimate advisory-only uses (second opinion on a Digital Exposure Review) | New | Not yet written |
| Security Scope and Authorisation Agent | DEFERRED | Yes, entirely | New | Only relevant if active testing is in scope |

## Build before first paid assessment

| Agent | Status | Depends on open question | Notes |
|---|---|---|---|
| Evidence Register Agent | DEFERRED | Yes | Only needed if engagements produce evidence requiring formal chain of custody, which is more likely with active testing in scope |
| Risk Register Agent | PROPOSED | No | Useful regardless of question 1: every service produces findings that benefit from a structured risk register |
| External Exposure Analyst Agent | DEFERRED | Yes, mostly. Passive-only analysis (DNS, SPF, DKIM, DMARC, TLS, certificate transparency, WHOIS) could proceed under advisory-only; active elements (port scans, Shodan-derived data) cannot | Split spec recommended once question 1 is answered |
| Phishing Analyst Agent | PROPOSED | No, this is advisory-only by nature (header and indicator analysis of client-supplied suspicious emails) | Closest existing equivalent: `07_Agents/phishing-readiness-agent.md` |
| Service Delivery Coordinator Agent | PROPOSED | No | Tracks engagement status regardless of service mix |

## Build after initial client validation

Ongoing Adviser Agent, Research and Threat Update Agent, Client Improvement Tracking Agent, Microsoft 365 Review Assistant, Google Workspace Review Assistant, Incident Readiness Assistant, Tabletop Exercise Assistant, Referral and Partner Coordinator, Marketing Content Agent, Case Study Agent, Service Profitability Analyst, Engagement Retrospective Agent.

All **DEFERRED** per the directive's own instruction (section 11: do not fully implement until the initial service model is validated). Closest existing equivalents already in `07_Agents/`: Marketing Content Agent (`marketing-content-agent.md`), Microsoft 365 Review Assistant (`microsoft-365-review-agent.md`).

## Build later, or do not build unless required

Not yet catalogued individually. Revisit once the build-now tier is complete.

## Sequencing recommendation

1. Business Analyst Agent and Documentation Architect Agent next, since both are needed to do the Phase 3 commercial foundation work well, and neither depends on question 1.
2. Website Strategy, Content, Design Reviewer, and Technical Architect Agents, to support Phase 4.
3. Intake Analyst, Discovery Call Assistant, Call Notes Processor, and Proposal Writer, to support Phase 5.
4. Report Writer, Report Quality, and (advisory-only scope) SOC Assistant, to support Phase 6.
5. Everything gated on question 1, once answered.
