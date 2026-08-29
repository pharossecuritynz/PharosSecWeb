---
title: Backlog
status: approved
owner: Jason Hill
last-reviewed: 2026-07-22
review-cycle: weekly
---

# Backlog

## 2026-08-22: Pharos v2 pass — what changed and what's queued next

The Pharos v2 directive (see `00-business/decisions.md`) was implemented in place: positioning, service architecture (seven services replacing eight), the Pharos Security Baseline methodology, pricing, and the live website (homepage copy across every section, plus a new `/it-provider-security-assurance` page). The items below are what that pass deliberately deferred, added to this backlog rather than left implicit.

| Item | Score | Notes |
|---|---|---|
| Free Security Health Check: build the actual questionnaire and results page | 6 | Content and output rules are defined in `03_Services/free-security-health-check.md`; this is now a real build item, not just a written spec |
| Reconcile `06_Sales_and_Marketing/` copy decks against the live site | 4 | `website-copy.md`, `homepage-wireframe.md`, `service-page-copy.md`, `about-page-copy.md` predate this pass and now describe the pre-v2 site; not rewritten in this pass to keep it focused on the canonical strategy docs and the live website itself |
| Rename old service names to the v2 names across `04_Operating_Manual/`, `05_Client_Templates/`, `06_Sales_and_Marketing/`, `07_Agents/`, `09_Checklists/`, and `10_Admin/` | 3 | Roughly 35 files still say "Cyber Risk Review", "SME Security Uplift Plan", "Ongoing Cyber Advisor Support", or one of the four folded-in service names. Content in each is still valid; only the naming is stale. Same discipline as the em dash cleanup below: a large mechanical pass across files that have already been reviewed once, so it should be done deliberately in its own pass, not rushed as a side effect of this one. Run `grep -rl` for the eight old service names (see `03_Services/archive/` filenames) to find them all. **Partially reduced 2026-08-29**: `delivery-workflow.md`, `weekly-business-rhythm.md`, `client-action-plan-template.md`, `security-uplift-plan-template.md`, and `contact-page-copy.md` were fixed incidentally while working in those files for the assessment methodology upgrade; the remainder of the ~35 files is still open. |
| Pharos Answers article library | 3 | A small number of representative pieces, not the full list in the v2 brief section 22 |
| NZ Small Business Security Brief production pipeline | 3 | Format defined in the v2 brief section 23; no content produced yet |
| Pre-call AI brief automation workflow | 3 | Intake questionnaire content exists in `05_Client_Templates/discovery-questionnaire.md`; the automation (structured record, AI-assisted prep, safe recon, brief generation) is unbuilt |
| Referral partner one-page PDF | 2 | `06_Sales_and_Marketing/referral-partner-one-pager.md` exists as copy; not laid out as a PDF artefact |
| Sanitised sample report | 2 | Would support the "Sample Report" page named in the v2 brief section 21 |
| "For IT Providers and Advisers" partner-facing page | 3 | Distinct from `/it-provider-security-assurance` (which is client-facing); targets MSPs, accountants, brokers as referral partners |
| Individual sub-pages for the remaining five services | 3 | Only Independent Security Review's MSP-adjacent sibling (IT Provider Security Assurance) got a dedicated page this pass; the rest live on the homepage services section |

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
| Answer question 5 in `decisions-required.md` (insurance, legal, certification, registration, domain status) | 7 | Yes | Only remaining open question; questions 1 to 4 answered 2026-07-22 |
| Bind professional indemnity and public liability insurance | 6 | Yes | Was already the top item in `10_Admin/next-actions.md` before this directive |
| Engage a lawyer for Terms of Engagement | 6 | Yes | Same |
| Register business structure (sole trader or limited company) | 5 | Yes | Same |
| Register domain and business email | 5 | Yes | Same |
| Write Jason Hill's founder bio and background for the About section | 5 | No | Currently the largest credibility gap on the website |
| Execute folder migration to kebab-case taxonomy | 5 | No | Unblocked 2026-07-22 (question 2 answered, question 1 kept the service model unchanged so no combined rewrite is needed). Large mechanical pass across roughly 94 files; sequence deliberately rather than rush |
| `00-business/pharos-master-plan.md` | 5 | No | Unblocked 2026-07-22 (questions 1 to 3 answered) |
| Remove em dash from all remaining existing markdown files (85 files as of 2026-07-21) | 4 | No, but close | Mechanical, large, deliberately not rushed; see current-state review |

## Next (score 3 to 4, not required before first client)

| Item | Score | Notes |
|---|---|---|
| Business Analyst Agent specification | 4 | Supports Phase 3 commercial foundation |
| Documentation Architect Agent specification | 3 | Supports keeping this repository consistent as it grows |
| Website Strategy, Content, Design Reviewer, Technical Architect Agent specifications | 4 | Supports Phase 4, does not require rebuilding the live site |
| Intake, discovery call, call notes, proposal workflow drafts | 4 | Supports Phase 5; discovery call content already rewritten to 15 minutes in `04_Operating_Manual/discovery-call-process.md`, needs restructuring into the formal workflow format rather than fresh writing |
| Market research plan (`08-research/market-research-plan.md`) | 4 | Not blocked by anything, recommended as the next major piece of work |
| Report Writer and Report Quality Agent specifications | 4 | Supports Phase 6, closest existing prompts already exist |
| Digital Exposure Review service definition | 3 | Confirmed in scope 2026-07-22 (question 1), passive research only, sequenced after the master plan names it properly |

## Later (gated on question 5, entirely)

| Item | Score | Gated on |
|---|---|---|
| External Exposure Analyst Agent (active-testing half; passive half is not gated) | 2 | Question 5 answers feeding back into question 1's insurance/certification gate |
| Vulnerability Assessment and External Attack Surface Review service definitions | 2 | Same |
| Security Scope and Authorisation Agent | 1 | Same |
| Nmap Command Builder, Nmap Results Parser, External Exposure Evidence Collector | 1 | Same, and explicitly last in the directive's own tool priority order |

## Do not build unless required

Client dashboard, complex multi-agent orchestration framework, public-facing scanning or assessment tools of any kind. Explicitly excluded by the directive itself (section 15).

## Deferred until client validation

The 12 agents in `03-agents/agent-catalogue.md`'s "build after initial client validation" tier. Not scored individually; revisit as a block once the first paid engagement completes.

## 2026-08-29: Assessment methodology upgrade — what's left, by category

The methodology, evidence, risk, privacy, and reporting upgrade (`09-project-management/process-and-reporting-gap-analysis.md`) built the full assessment framework in one pass. What's left is categorised here per the founder's own request, so technical/methodology work doesn't get built ahead of what the business actually needs next.

**Required before first paying assessment:** nothing methodology-related — see `minimum-viable-assessment-checklist.md`, which confirms the methodology side is done and the only remaining blocker is the business readiness gate already tracked as the top item in this backlog's "Now" section (question 5, insurance, ToE, registration).

**Required before scaling past a solo founder:** a second-reviewer QA step (currently self-check only, flagged in `quality-checklist.md`); full `03-agents/` spec rewrites for Report Writer, Report Quality, and a new Risk Register agent, so AI assistance can be delegated consistently rather than relying on founder judgement alone each time.

**Valuable later:** effort/cost and pricing re-validation against the new methodology's real delivery time (needs actual engagement data, not guesswork); `10_Admin/document-control-register.md` refresh; the remaining ~35-file service-name rename above; named referral partners for the MSP Responsibility Matrix's referral-adjacent findings.

**Future product/tool opportunity:** the machine-readable schema (`10-automation/assessment-data-schema.md`) exists specifically to make this possible later without a redesign — a client portal, a remediation-tracking dashboard, or a report generator, none of which should be built before Pharos has real clients and a proven methodology to automate.
