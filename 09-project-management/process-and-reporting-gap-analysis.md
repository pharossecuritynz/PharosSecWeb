---
title: Process and Reporting Gap Analysis
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: revisit when the assessment methodology next changes materially
---

# Process and Reporting Gap Analysis

This is the discovery output behind the 2026-08-29 assessment, evidence, risk, and reporting upgrade. It follows a full inventory of `03_Services/`, `04_Operating_Manual/`, `05_Client_Templates/`, `09_Checklists/`, `03-agents/`, `07_Agents/`, `02_Business_Strategy/`, and `10_Admin/`, plus a repository-wide search for privacy, NCSC, risk, and evidence content. See `09-project-management/process-upgrade-changelog.md` for what was actually built from this analysis, and `00-business/decisions.md` for the architectural decisions it produced.

The instruction behind this pass was to evolve the existing Pharos methodology, not replace it. This document exists so that instruction could actually be followed: understand what's here before changing anything.

## Existing strengths (retain)

- **`04_Operating_Manual/pharos-security-baseline.md`** is a genuinely strong methodology core: cited source frameworks (CIS Controls v8.1 IG1, NIST CSF 2.0, the NCSC Cyber Security Framework, the Privacy Act 2020), a four-level verification model (self-reported, documented, observed, verified), the evidence/interpretation/action finding structure, an eight-stage assessment lifecycle, and an explicit, principled ban on false-precision scores like "Security Score: 72%." It is the only document in the corpus with proper frontmatter and the only one already reviewed as recently as 2026-08-22.
- **`independent-security-review.md`** already has a real 19-area review scope and a "seven questions" report framework (where are we now, what matters, what to fix immediately, what to improve next, what can wait, who owns each action, what would demonstrate improvement) that closely matches what a "flagship assessment methodology" should ask.
- **`reporting-standards.md`** already bans traffic-light colour coding, bans absolute claims ("fully secure"), defines a working Now/Next/Later/Monitor priority scale with real timeframes, and specifies a sane file-naming convention.
- **`quality-checklist.md`** is a genuine pre-send QA gate, not a placeholder, and `04_Operating_Manual/operating-principles.md` makes it mandatory with no exceptions.
- **`data-handling-and-confidentiality.md`, `escalation-and-referral-rules.md`, `discovery-call-process.md`, `client-intake-process.md`, `delivery-workflow.md`** are mature, concrete SOPs. `discovery-call-process.md` in particular has a minute-by-minute structure and a verbatim no-fit script.
- **`05_Client_Templates/`** templates share a consistent, sensible scaffold (executive summary first, then findings, then what's working well, then prioritised actions, then a limitations appendix). `incident-readiness-plan-template.md` is the most operationally developed asset in the whole repo, with real first-hour scenario content. `discovery-questionnaire.md` is a real, usable 17-question intake instrument, not a placeholder.
- **`03-agents/agent-standard.md`** already defines the right fields for AI governance: evidence citation requirements, confidence handling, prohibited actions (including "must not invent evidence" and "must not conceal uncertainty"), prompt-injection protections, and a minimum test-case matrix. It's approved and ready to receive extensions.
- **The blame-free, non-punitive culture thread** (phishing test results never named to individuals, staff awareness sessions never report identifiable results to management) is consistent across every file that touches people-risk. Worth explicitly preserving in anything new.
- **The brand's anti-fake-precision, anti-fear stance** is consistent and load-bearing across `pharos-security-baseline.md`, `reporting-standards.md`, `executive-summary-template.md`, and `business-pitch.md`. Any new risk-scoring work has to be designed to fit inside this, not around it.

## Duplication

- **`03-agents/` vs `07_Agents/`**: not a live content conflict today, but a structural duplication risk. `07_Agents/` holds 11 working, lighter-weight prompts already in a usable state; `03-agents/agent-catalogue.md` names each of them as the "closest existing equivalent" for a heavier `03-agents/` spec that mostly doesn't exist yet (only Project Lead Agent is fully written). The migration policy is already documented in `agent-standard.md` (rewrite, then mark the `07_Agents/` original "superseded," never delete) but zero files have gone through it. Recommendation: **consolidate later, per the existing migration policy** — not part of this pass, but flagged so it isn't mistaken for an oversight.
- **`09_Checklists/report-quality-checklist.md` vs `04_Operating_Manual/quality-checklist.md`**: not true duplication — the checklist folder version is an explicit condensed pointer to the fuller operating-manual version. No action needed beyond keeping them in sync when the fuller one changes.
- **`client-action-plan-template.md` vs the brief's "Management Action Register"**: these are related but not duplicates once properly scoped. The existing template is the lightweight, client-facing tracker (kept as-is, extended only with a finding-ID column). The Management Action Register is a new, internal-only artefact with completion evidence and Pharos-side verification status. Keeping both, clearly scoped apart, avoids collapsing a client-facing simplicity tool into an internal audit tool.

## Missing components

1. **No finding-ID scheme anywhere.** Every findings table in every template uses a bare, per-table row counter. Nothing survives from assessment to report to action plan to a future follow-up.
2. **No risk/severity rating distinct from priority.** The only rating that exists is the four-tier Now/Next/Later/Monitor priority label, which is a timing decision, not a severity judgement. A trivial-to-fix, high-value item and a hard-to-fix, business-critical gap can both show up as "Now" with no way to tell them apart.
3. **No confidence concept, and no separation between confidence and risk.** A finding is either stated or not; there's no way to say "this is likely a significant gap, but we could not directly verify it."
4. **No privacy baseline as something Pharos assesses in a client's business.** The Privacy Act 2020 is referenced twice: once as an input to Pharos's own internal data-handling policy, and once as a hedged, non-legal-advice flag in the incident-readiness plan template ("this may be a notifiable breach, consult a lawyer"). Nothing evaluates a client's own privacy practices (Privacy Officer, notice, access/correction requests, retention, breach process) as a reviewed domain. **IPP 3A (indirect-collection notification, in force 1 May 2026) appears nowhere in the repository.**
5. **No MSP/IT-provider responsibility matrix**, despite being named as a deliverable in `it-provider-security-assurance.md` ("review of stated security responsibilities: what the MSP owns, what the client owns, and what falls into the gap") and echoed in `security-uplift-plan-template.md`'s ownership-summary section. The concept exists; no artefact does.
6. **No structured evidence-based verification/follow-up process.** Follow-up is currently informal: "revisit in 6 to 12 months," or folded into the Security Adviser retainer relationship. Nothing collects evidence that a remediated finding was actually fixed, as opposed to reported fixed.
7. **No machine-readable schema.** Every finding, report, and plan lives only as free-form markdown prose inside a table. There's no structure that a future tool (portal, tracker, report generator) could read.

## Weakly defined components

- **The Free Security Health Check** is specified at the level of what it should cover and what constraints its output must respect, but has no actual question set, branching logic, or output template — a real implementation gap behind a well-specified concept.
- **The "annual mini risk review"** named in `security-adviser.md` as part of the retainer has no defined structure — it's described as "a condensed version" of a review that itself (the Independent Security Review) only had a loose seven-questions framework until this pass.
- **The referral partner network** is fully specified process-wise (`escalation-and-referral-rules.md` has a complete four-category framework) but has zero actual partners named. This is a business-development gap, not a methodology gap, and is already tracked in `10_Admin/assumptions-and-open-questions.md`.
- **Effort and cost estimates in `02_Business_Strategy/pricing-strategy.md`** are calibrated against the current, lighter assessment process. A materially deeper methodology (this pass) will likely make those effort-hour assumptions optimistic. Flagged for the founder to revisit once the new methodology's real delivery time is known; not something this pass can responsibly guess at.

## Conflicting methodologies

- **Risk-scoring tension with brand voice.** `business-pitch.md` states the current position plainly: "no unexplained jargon, no severity scores without context," implicitly warning against exactly the kind of formal severity model this upgrade introduces. Resolved by keeping risk rating strictly qualitative (Critical/High/Moderate/Low/Informational, each with a plain-English operational meaning, never a number) and by keeping it a second axis alongside — not a replacement for — the plain-English Now/Next/Later priority language clients already see. See `04_Operating_Manual/risk-and-priority-methodology.md`.
- **Service-naming tension.** The brief asks for a flagship "Pharos Security Posture Review" as the primary structured assessment. The service catalogue was deliberately renamed from "Cyber Risk Review" to "Independent Security Review" on 2026-08-22, with recorded commercial reasoning (see `00-business/decisions.md`). Re-renaming the service now, on the authority of this pass, would silently reverse a considered decision. **Resolution:** the service keeps its confirmed name, "Independent Security Review"; the report it produces is titled the "Pharos Security Posture Review." This is recorded as a decision, not picked silently — see `00-business/decisions.md`, 2026-08-29 entry.
- **NCSC framework staleness.** `pharos-security-baseline.md` currently describes NCSC alignment in terms borrowed from NIST CSF 2.0's six functions ("Govern, Identify, Protect, Detect, Respond, Recover... functions broadly align with NIST CSF"). Verified via current NCSC guidance (ncsc.govt.nz, checked 2026-08-29) that NCSC now publishes its own five-function Cyber Security Framework (Guide and Govern, Identify and Understand, Prevent and Protect, Detect and Contain, Respond and Recover) plus ten Minimum Cyber Security Standards mapped to those functions. The baseline doc is updated to the NZ-specific structure rather than the borrowed NIST one, which is both more current and more defensible as "NZ guidance."

## Outdated assumptions / stale references found

- `delivery-workflow.md`'s per-service timeline table still lists the pre-v2 service names (Cyber Risk Review, SME Security Uplift Plan, Microsoft 365 Basics Review, and so on) rather than the seven current service names.
- `weekly-business-rhythm.md` links to `../03_Services/ongoing-cyber-advisor-support.md`, which no longer exists at that path — the service was renamed to `security-adviser.md` and the old file moved to `archive/` on 2026-08-22.
- Six files still told a client or an internal reader to contact `cert.govt.nz` in an urgent/incident situation: `06_Sales_and_Marketing/contact-page-copy.md`, `04_Operating_Manual/escalation-and-referral-rules.md`, `09_Checklists/incident-readiness-checklist.md`, `09_Checklists/sme-cyber-readiness-checklist.md`, `07_Agents/incident-readiness-agent.md`, and `05_Client_Templates/incident-readiness-plan-template.md`. `02_Business_Strategy/risk-boundaries.md` already records the correct fact (CERT NZ fully merged into the NCSC; incidents now report via ncsc.govt.nz/report or 0800 114 115) but that correction had only been propagated to that one file. (Two further mentions, in `00-business/decisions.md` and `10_Admin/document-control-register.md`, are legitimate historical references describing the correction itself or a past event, and were correctly left as-is.)
- `10_Admin/document-control-register.md` shows every row as last-reviewed 2026-07-21 with status "Ready," despite `02_Business_Strategy/` and `03_Services/` having been materially revised on 2026-08-22 and 2026-08-24. Noted here as a real staleness gap; refreshing the register itself is deferred (see below), since it's a housekeeping task orthogonal to the methodology work.

All stale references above (nine files in total, plus one broken link each in `weekly-business-rhythm.md` and `microsoft-365-review-template.md` pointing to the archived Ongoing Cyber Advisor Support file) are corrected as part of this pass, since they were found while working directly in or near the affected files, or by a targeted grep once the pattern was recognised. This is not a claim that every stale reference in the repository has been found — the ~35-file service-naming cleanup already tracked in `09-project-management/backlog.md` remains open. The document-control register refresh is not attempted here, since it touches the whole repository and is better done as its own pass.

## Recommended changes, classified

| Area | Classification | What happens |
|---|---|---|
| `pharos-security-baseline.md` verification levels, evidence/interpretation/action structure, 8-stage lifecycle | **Retain** | Unchanged in substance |
| `pharos-security-baseline.md` NCSC framework description | **Refine** | Updated to the current 5-function/10-standard structure |
| `reporting-standards.md` priority scale, exec-summary rules, file naming | **Retain** | Unchanged |
| `reporting-standards.md` overall report structure | **Refine** | Extended to the canonical layered Security Posture Review structure |
| `independent-security-review.md` 19-area scope and seven-questions framework | **Retain, consolidated into** | Folded into the new `assessment-methodology.md` domain list rather than left to drift as a separate, competing list |
| Now/Next/Later/Monitor priority label | **Retain** | Kept exactly as-is, now explicitly paired with (not replaced by) the new risk rating |
| `quality-checklist.md` | **Refine** | Finding-traceability and sign-off fields added |
| `agent-standard.md` | **Refine** | Explicit evidence rule and finding-status vocabulary added to existing fields |
| Finding ID scheme | **Add** | New, domain-prefixed, stable across the full lifecycle |
| Risk rating (Critical/High/Moderate/Low/Informational) | **Add** | New second axis alongside priority |
| Confidence rating | **Add** | New, decoupled from risk |
| Evidence-type taxonomy | **Add, extending** | Builds on the existing four verification levels rather than replacing them |
| Privacy baseline as an assessment domain | **Add** | New file, operational scope only, explicit IPP 3A coverage |
| NZ guidance mapping / traceability | **Add** | New file |
| MSP/IT-provider Responsibility Matrix | **Add** | New client-facing template |
| Management Action Register | **Add** | New internal-only template |
| 90-day plan phasing | **Refine** | Existing Now/Next/Later plans gain an optional 4-phase (14/30/60/90-day) structure for the flagship review, cross-referenced rather than replacing the simpler version used elsewhere |
| Machine-readable schema | **Add** | New, markdown-hosted, no application built |
| `03-agents/` vs `07_Agents/` reconciliation | **Defer** | Already has a documented migration policy; out of scope for this pass |
| Referral partner network | **Defer** | Business-development gap, already tracked elsewhere |
| `document-control-register.md` refresh | **Defer** | Housekeeping, orthogonal to this pass |
| Pricing/effort re-validation against the new methodology | **Defer** | Needs real delivery-time data this pass cannot fabricate |
| Full `03-agents/` spec rewrites for Report Writer, Report Quality, Risk Register agents | **Defer** | Separately scoped, larger build already tracked in `agent-catalogue.md` |
| Stale service-name and CERT NZ/NCSC references found while working in affected files (11 files total) | **Refine** | Corrected in this pass, incidentally; the wider ~35-file service-naming cleanup remains a separate, tracked backlog item |

See `09-project-management/process-upgrade-changelog.md` for the record of what was actually built against this table.
