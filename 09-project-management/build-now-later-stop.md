---
title: Build Now / Build Later / Do Manually / Stop
status: approved
owner: Jason Hill
last-reviewed: 2026-09-09
review-cycle: revisit at each validation checkpoint (see validation-checkpoints.md)
---

# Build Now / Build Later / Do Manually / Stop

A full audit of every active Pharos initiative, categorised against one test: **does this improve our ability to learn whether a real customer will pay Pharos, or is it necessary to safely deliver work after someone pays?** If the answer to both is no, it's paused, not deleted. See `00-business/pharos-current-strategy.md` for the strategy this serves, and `03_Services/service-catalogue.md` for the equivalent categorisation at the service level (not repeated here).

## BUILD NOW

Only what's necessary to acquire customers, safely deliver paid work, produce professional outputs, invoice customers, manage client information, or meet legal/professional obligations.

- The core offer itself: Independent Security Review / IT Provider Security Assurance, and the new Remediation Assurance follow-on
- Assessment methodology, evidence standard, risk-and-priority methodology, reporting standards (`04_Operating_Manual/`) — already built, confirmed sound in `09-project-management/backlog.md`'s 2026-08-29 entry, nothing further required here before a paid engagement
- Report template (`05_Client_Templates/security-posture-review-report-template.md`) and discovery questionnaire — already built, only needed a naming fix (done this pass)
- Proposal process and a lawyer-reviewed Terms of Engagement / Statement of Work (proposal *process* exists in `04_Operating_Manual/proposal-process.md`; the lawyer-reviewed contract itself does not exist yet — this is the single most important BUILD NOW gap, see Risks below)
- Data-handling and confidentiality process (`04_Operating_Manual/data-handling-and-confidentiality.md`) — already built
- The live website, as it now stands after this pass — no further redesign needed
- The website's short conversation-intake lead form — already built, lightly extended this pass (industry field)
- Pricing (`02_Business_Strategy/pricing-strategy.md`, reconciled this pass) and the new `10_Admin/delivery-economics-tracker.csv`
- The new `10_Admin/commercial-validation-tracker.csv` (a plain sales tracker, not a CRM)
- The MSP partner pitch and other outreach material (`06_Sales_and_Marketing/validation-outreach-kit.md`)
- Professional indemnity + public liability insurance, and the business/domain registration — genuinely blocking, tracked in `10_Admin/next-actions.md`

## BUILD LATER

Potential value once demand is demonstrated; real, designed work, not discarded.

- Secure Foundations, Incident Readiness (as a standalone product), Security Adviser — see `03_Services/service-catalogue.md`
- Free Security Health Check questionnaire build (the service is defined; the actual web questionnaire is unbuilt and should stay that way for now)
- The remaining ~35-file service-name rename across `04_Operating_Manual/`, `05_Client_Templates/`, `06_Sales_and_Marketing/`, `07_Agents/`, `09_Checklists/`, `10_Admin/` (per `09-project-management/backlog.md`)
- Folder-taxonomy migration to kebab-case (confirmed as a decision in `09-project-management/decisions-required.md` question 2, still queued, still not urgent)
- Pharos Answers article library, NZ Small Business Security Brief production pipeline, pre-call AI brief automation workflow, referral partner one-page PDF, sanitised sample report, "For IT Providers and Advisers" partner-facing page, individual sub-pages for the BUILD LATER services (all per `09-project-management/backlog.md`)
- `00-business/pharos-master-plan.md`, second-reviewer QA step, further `03-agents/` spec rewrites (Report Writer, Report Quality, a new Risk Register agent)
- Any service catalogue entry for Vulnerability Assessment or External Attack Surface Review (still gated on question 5's insurance/certification answers, unaffected by this pivot)
- The machine-readable assessment data schema's actual client-facing product (portal, remediation-tracking dashboard, report generator) — the schema itself already exists specifically so this can happen later without a redesign, but building the product now would be exactly the kind of premature construction this pivot exists to stop

## DO MANUALLY (for the first customers; do not automate yet)

- Discovery and the discovery session itself
- Evidence requests and evidence review
- Judgement calls on risk rating, priority, and confidence
- Report writing and report QA (currently self-check only; a second-reviewer step is BUILD LATER, not needed at solo, low-volume scale)
- Recommendation-writing and presentation
- Follow-up and referral requests
- Filling in the CSV trackers themselves — no automation, no integration, just open the spreadsheet after each conversation

## STOP / PAUSE

Explicitly paused for the validation window, not deleted. Revisit only once real demand or delivery volume justifies the effort.

- Building new AI agent specifications beyond what already exists in `03-agents/` and `07_Agents/` (the existing Project Lead Agent spec and the lighter-structure `07_Agents/` prompts are enough for now; no SOC Assistant, Security Scope and Authorisation Agent, or further specialist agents)
- Any active-testing tooling or agents (Nmap Command Builder, External Exposure Evidence Collector, Security Scope and Authorisation Agent) — already gated on question 5, unaffected and unchanged by this pivot
- Further Exposure Snapshot scanning capability beyond what's already built and live; the tool is feature-complete for its lead-qualifier purpose
- A client portal, remediation-tracking dashboard, or report-generation automation of any kind
- Elaborate lead-generation tooling beyond the existing short intake form and Exposure Snapshot
- Website perfectionism: no further homepage redesign, no new pages, no visual-identity changes, unless a real usability problem surfaces from actual prospect use
- Excessive content generation: no LinkedIn post backlog, no Pharos Answers article library, no NZ Small Business Security Brief, until there's an audience and a reason
- Any further service design or new service concepts beyond what this pass already introduced (Remediation Assurance)
- The em-dash cleanup across the remaining pre-2026-07-21 markdown files — real, but purely cosmetic and non-blocking; lowest priority of everything tracked

## The test to apply to anything new that comes up

> Does this improve our ability to learn whether a real customer will pay Pharos? If not, is it necessary to safely deliver work after someone pays? If the answer to both is no, it doesn't happen right now.

If a new idea fails this test, add it to BUILD LATER or STOP above rather than building it "just in case." This file should be the first thing checked before starting any new piece of work until the 90-day checkpoint.
