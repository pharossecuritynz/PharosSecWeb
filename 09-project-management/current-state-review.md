---
title: Current State Review
status: approved
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: on major directive change
---

# Current State Review

Reconciliation review comparing the existing Pharos Security studio against the Master Build Directive received 2026-07-21. Written before any restructuring or new agent work, per the directive's own instruction not to generate large volumes of files before the state of the project is understood.

**2026-08-22 addendum:** the studio described below (91 files, advisory-only, eight flat services) is what a second directive, Pharos v2, was implemented against. That pass confirmed the "what should remain" findings below were sound (brand voice, operating manual, live website foundation) and acted on the "what is incomplete" and "what should be revised" sections by consolidating the eight services into seven organised around independent security assurance rather than a technical menu, naming the Pharos Security Baseline methodology, and updating the live website's homepage and adding one new page. Full reasoning in `00-business/decisions.md` (2026-08-22 entry); what it deliberately deferred is in `09-project-management/backlog.md`. This document's findings otherwise still stand and are not restated here.

## What exists

A complete 91-file business studio was built on 2026-07-21, structured as:

```
00_README_START_HERE.md
01_Brand/            (10 files: brand brief, mission/vision/values, positioning, tone of voice, visual identity, colour palette, typography, logo direction, taglines, dos and donts)
02_Business_Strategy/ (8 files: overview, target market, customer profiles, competitor positioning, differentiation, pricing strategy, risk boundaries, 90-day launch plan)
03_Services/          (10 files: 8 service definitions plus catalogue and boundaries)
04_Operating_Manual/  (11 files: intake through weekly rhythm SOPs)
05_Client_Templates/  (10 files: questionnaires, report templates, plans)
06_Sales_and_Marketing/ (11 files: website copy, email templates, LinkedIn content, lead magnets)
07_Agents/            (13 files: 11 AI agent prompts plus overview and shared rules)
08_Website/           (5 planning docs plus the live Next.js site in pharos-security-site/)
09_Checklists/        (7 files: client-facing and internal checklists)
10_Admin/             (5 files: NZ business setup, tools, document register, open questions, next actions)
```

A working Next.js, TypeScript, Tailwind CSS website is built, verified against `npm run build` and `npm run lint`, and has been through two design review passes with the founder (a floating hero graphic was added then explicitly rejected and removed).

Pricing across all 8 services has been checked against published NZ and AU market data (vCISO retainer rates, SME security assessment baselines, awareness training pricing) and revised where the research changed the recommended range. See `02_Business_Strategy/pricing-strategy.md`.

## What is useful and should be retained

- The brand voice, positioning, and visual identity work in `01_Brand/` is coherent, specific to Pharos, and already reflected consistently across the website and every service document. It should not be rewritten from scratch.
- The 8-service catalogue in `03_Services/` is detailed (scope, exclusions, deliverables, effort estimates, pricing, sales copy) and matches the directive's emphasis on stated scope, stated exclusions, and honest limitations.
- The operating manual (`04_Operating_Manual/`) already contains working SOPs for intake, discovery calls, proposals, delivery, reporting standards, a quality checklist, communication standards, data handling, escalation and referral rules, and a weekly rhythm. This substantially overlaps with the directive's Phase 5 and Phase 6 requirements.
- The live website is functional, on-brand, and has already had one round of critical design feedback applied.
- `10_Admin/assumptions-and-open-questions.md` and `10_Admin/next-actions.md` already track exactly the kind of open decisions the directive asks for, just under different filenames and without YAML status metadata.

## What is incomplete

- No agent has a formal specification against the directive's 20-field standard (name, purpose, business value, owner, status, build priority, trigger, inputs, data classification, allowed tools, prohibited actions, workflow, decision points, output format, evidence citation requirements, confidence handling, escalation rules, human review requirements, privacy considerations, retention considerations, prompt injection protections, failure modes, test cases, acceptance criteria, version history). The existing `07_Agents/` prompts are usable copy-paste prompts with a lighter structure (purpose, when to use, inputs, output format, rules, boundaries, example, quality checklist). They are not wrong, but they do not meet the new standard.
- No workflow documents exist in the directive's sense (trigger, owner, inputs, steps, decision points, outputs, controls, failure paths, human approvals, records created, completion criteria). The operating manual describes processes in prose, not as controlled workflows.
- No evidence register, risk register, rules of engagement, or authorisation template exists, because the existing service model does not include active technical testing.
- No `CLAUDE.md` exists to govern how AI tools should operate in this repository.
- No formal decision log, scored backlog, sprint file, risk register, changelog, or milestone tracker exists in the directive's format.
- No legal documents exist yet (Terms of Engagement, Rules of Engagement, Testing Authorisation). This was already flagged as a launch blocker in `10_Admin/next-actions.md` before this directive arrived.
- No professional indemnity insurance is confirmed bound. No security testing certification is confirmed held. These are load-bearing facts for one of the decisions below.

## What is duplicated (once the new structure is introduced)

If the directive's `00-business/` through `12-testing/` structure is created alongside the existing `01_Brand/` through `10_Admin/` structure without consolidation, the following would become duplicated:

| Existing | Directive equivalent | Overlap |
|---|---|---|
| `10_Admin/next-actions.md` | `09-project-management/backlog.md` | High, different framing (linear checklist vs scored backlog) |
| `10_Admin/assumptions-and-open-questions.md` | `09-project-management/decisions-required.md` | High |
| `10_Admin/document-control-register.md` | Parts of `03-agents/agent-standard.md` metadata convention | Partial |
| `02_Business_Strategy/*` | `00-business/pharos-master-plan.md`, capability matrix, ideal client profile | High |
| `03_Services/*` | Service catalogue content required in directive section 18 | High |
| `07_Agents/*` | `03-agents/*` full specifications | Same subject, different rigour |
| `08_Website/*` | `11-architecture/website-architecture.md`, website strategy/content/design agents' outputs | High |
| `04_Operating_Manual/*` | Workflow documents in section 22 | High, different format (SOP prose vs controlled workflow) |

This is why this review recommends migration and enrichment over parallel construction. Building a second, competing structure would leave two sources of truth and contradict the directive's own instruction not to create disconnected documents.

## What conflicts directly with this directive

Two conflicts are substantive enough that they should not be resolved by assumption. Both are raised as questions in `09-project-management/decisions-required.md`.

### 1. Service scope: advisory-only versus active technical testing

The existing `02_Business_Strategy/risk-boundaries.md` and `03_Services/service-boundaries.md` state, as a deliberate founder-safety decision, that Pharos Security does not perform penetration testing or vulnerability scanning of production systems, and refers that work to a licensed specialist. This was written because the founder's certification status, professional indemnity insurance, and legal contract templates were not yet confirmed, and active testing carries meaningfully different liability and insurance requirements than advisory work.

The directive's section 19 (initial service model) includes Vulnerability Assessment and External Attack Surface Review as launch-track services, and section 15 lists tooling (Nmap Command Builder, External Exposure Evidence Collector) to support them. Section 10.3 (External Exposure Analyst Agent) and section 9.16 (Security Scope and Authorisation Agent) both assume this capability exists.

This is not a wording conflict. It is a decision about what kind of work Pharos actually does, and it has real consequences for insurance, certification, and contract requirements. It should not be resolved by inference from a long document; it needs a direct answer. See question 1 in the decisions file.

### 2. Folder taxonomy

The existing structure uses numbered, Title_Case folders (`01_Brand`, `02_Business_Strategy`, and so on). The directive specifies numbered, kebab-case folders (`00-business`, `01-operations`, and so on) with YAML frontmatter on every important document. These are incompatible naming conventions for what is substantially the same content.

Renaming 91 files and every cross-reference between them is a mechanical but non-trivial piece of work, and it touches content that has already been reviewed once with the founder. It is lower stakes than question 1, but it should still be a decision, not an assumption, because it determines whether the next phase of work is "extend what exists" or "extend a parallel new structure." See question 2 in the decisions file.

## What should be revised regardless of the two open decisions

- Every existing document uses the em dash character. The directive's absolute punctuation rule prohibits this. This is a mechanical but large cleanup (91 markdown files). The 4 instances inside the live website's React components have already been corrected in this pass, because they are the most visible artefact. The remaining 91 markdown files are logged as the top item in the backlog rather than rewritten in this same pass, because a rushed find-and-replace across 91 files of carefully worded content risks damaging phrasing that was already reviewed. It should be done deliberately, file by file.
- Four files contain a `[Founder Name]` placeholder. The directive confirms the founder's name is Oscar. These have been updated in this pass, since it required no judgement call.
- The free discovery call is specified as "20 to 30 minutes" in `04_Operating_Manual/discovery-call-process.md` and as a structured 15 minutes in the directive. This is a direct, factual conflict, not a matter of framing. See question 4.

## What should be deferred

- The full 16-agent specification catalogue (section 9), the additional 5 agents required before the first paid assessment (section 10), and the 12 agents deferred until after client validation (section 11): deferred until question 1 is answered, because several of the agents (External Exposure Analyst, Security Scope and Authorisation Agent, Phishing Analyst, SOC Assistant) only make sense if active testing is in scope, and writing full specifications for services that may not exist would be wasted, disconnected work.
- The 8 required workflow drafts in section 26 step 7: same reasoning. Report production and intake workflows can be drafted safely; the SOC peer review and tool development workflows depend on question 1.
- `00-business/pharos-master-plan.md`: deferred until questions 1 to 3 are answered, because the master plan's service model, website page list, and agent team all depend on those answers. Writing it now would mean rewriting it immediately after.
- `11-architecture/*` (website, agent, tool architecture): deferred for the same reason as the master plan.
- `08-research/market-research-plan.md`: deferred, but not blocked. This can be built in the next pass without waiting on the two open decisions, and is recommended as the next major piece of work after the decision brief is answered.
- Physical migration of the 91 existing files into the new folder taxonomy: deferred until question 2 is answered, and if approved, should happen in the same pass as any service model rewrite driven by question 1, to avoid doing the mechanical rename twice.

## Main risks

1. **Taking a paying client without insurance or a reviewed contract.** This was already the top risk before this directive arrived (`10_Admin/next-actions.md` item 1 to 3). It remains the top risk. No amount of agent or website work changes this.
2. **Silently expanding into active technical testing without the certification, insurance, and authorisation paperwork the directive itself specifies as required (section 9.16, section 16).** The directive is internally consistent about requiring strong controls around active testing; it would be a mistake to adopt the service list from section 19 without also adopting the controls from sections 16 and 24.
3. **Building a second parallel documentation structure.** Duplicated, contradictory sources of truth are explicitly called out as a failure mode in the directive itself (section 7: "do not overwrite meaningful work", section 21 Phase 1: "create a proposed consolidation plan" rather than rebuilding).
4. **Scope inflation before the first client.** Section 20 of the directive itself provides the test: does this help acquire a client, deliver a service, improve trust, reduce delivery time, reduce operational risk, or improve consistency. A 16-agent catalogue with full specifications for services that may not launch fails that test until question 1 is resolved.

## Recommended sequence

1. Resolve the five questions in `09-project-management/decisions-required.md` (this pass surfaces them; answers unblock the rest).
2. Once question 1 is answered, revise or confirm the service catalogue and write `00-business/pharos-master-plan.md`.
3. Once question 2 is answered, execute the folder migration in one pass (mapping table below), ideally combined with any service catalogue rewrite from step 2.
4. Write the full agent catalogue and specifications for the confirmed service model only.
5. Draft the workflows that do not depend on question 1 (intake, free call, proposal, website development, report production) now; draft the remainder once question 1 lands.
6. Resume the market research programme, which is not blocked by either open decision.

## Proposed folder mapping (for approval, not yet executed)

| Current | Proposed | Notes |
|---|---|---|
| `01_Brand/` | `00-business/brand/` | |
| `02_Business_Strategy/` | `00-business/strategy/` | |
| `03_Services/` | `00-business/services/` | |
| `04_Operating_Manual/` | `01-operations/` | Content becomes source for controlled workflow documents in `10-automation/` |
| `05_Client_Templates/` | `05-templates/` | |
| `06_Sales_and_Marketing/` | `07-website/marketing/` | |
| `07_Agents/` | superseded by `03-agents/` | Existing prompts retained as reference during rewrite, then retired |
| `08_Website/` | `07-website/` | `pharos-security-site/` (the actual Next.js project) stays where it is; only the planning docs move |
| `09_Checklists/` | `05-templates/checklists/` | |
| `10_Admin/` | split across `00-business/`, `02-sops/`, `09-project-management/` | `business-setup-checklist-nz.md` and `tools-and-software.md` to `00-business/`; the rest folds into `09-project-management/` |
| `00_README_START_HERE.md` | stays at root, content revised to describe new structure | |

This mapping is a proposal. No files have been moved. See question 2.
