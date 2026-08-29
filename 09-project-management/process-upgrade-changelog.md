---
title: Process Upgrade Changelog
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: append on every future methodology change
---

# Process Upgrade Changelog

Record of the 2026-08-29 assessment, evidence, risk, and reporting upgrade. See `process-and-reporting-gap-analysis.md` for the discovery behind these changes and `00-business/decisions.md` for the architectural decisions made along the way.

## 2026-08-29 — Assessment, evidence, risk, and reporting upgrade

**What changed:** Evolved (not replaced) Pharos's assessment methodology. Added a finding-ID scheme, a qualitative risk rating kept separate from priority, an extended evidence-type taxonomy with a confidence concept, a full privacy assessment domain (including IPP 3A), a refreshed NCSC guidance mapping, a canonical layered report structure, an MSP responsibility matrix, an internal Management Action Register, an evidence-based follow-up/verification process, and a machine-readable schema for future tooling.

**Why:** The existing methodology (`pharos-security-baseline.md`) was strong on framework citation and verification discipline but had no way to rate a finding's severity distinct from when to act on it, no formal evidence typing beyond four verification levels, no privacy-as-an-assessed-domain, and no structured way to confirm a fix actually happened rather than was reported. See the gap analysis for the full list.

**Files created:**
- `09-project-management/process-and-reporting-gap-analysis.md`
- `04_Operating_Manual/evidence-standard.md`
- `04_Operating_Manual/risk-and-priority-methodology.md`
- `04_Operating_Manual/assessment-methodology.md`
- `04_Operating_Manual/nz-privacy-baseline.md`
- `04_Operating_Manual/nz-guidance-mapping.md`
- `04_Operating_Manual/remediation-and-verification.md`
- `04_Operating_Manual/management-action-register-template.md`
- `05_Client_Templates/security-posture-review-report-template.md`
- `05_Client_Templates/msp-responsibility-matrix-template.md`
- `10-automation/assessment-data-schema.md`
- `09-project-management/methodology-test-scenario-synthetic.md`
- `09-project-management/minimum-viable-assessment-checklist.md`
- `09-project-management/process-upgrade-changelog.md` (this file)

**Files modified:**
- `04_Operating_Manual/pharos-security-baseline.md` — NCSC section updated to the current 5-function/10-standard structure; added a "Related documents" pointer section; risk-presentation bullets extended with the new risk rating and confidence concepts.
- `04_Operating_Manual/reporting-standards.md` — added frontmatter; added the canonical Security Posture Review structure, report layering, Executive Security Brief detail, Security Posture Scorecard, positive-findings requirement, business-language scenario guidance, recommendation-quality standard, outcome-not-product guidance, and document status conventions.
- `04_Operating_Manual/quality-checklist.md` — added frontmatter, finding-ID/evidence-citation checks, risk-vs-priority sanity check, NZ-guidance-currency check, and a sign-off block.
- `03-agents/agent-standard.md` — added the explicit "no evidence, no confirmed finding" rule and the finding-status vocabulary to the evidence-citation/confidence-handling guidance.
- `05_Client_Templates/cyber-risk-review-report-template.md` — marked superseded, pointing to the new report template; retained per the archive-not-delete rule.
- `05_Client_Templates/executive-summary-template.md` — top-matters table extended with finding IDs and effort.
- `05_Client_Templates/client-action-plan-template.md` — row numbering replaced with a finding-ID column; stale service-name reference corrected.
- `05_Client_Templates/security-uplift-plan-template.md` — retitled to match the Secure Foundations service (was still referencing the archived SME Security Uplift Plan and Ongoing Cyber Advisor Support service names); cross-referenced to the new remediation-and-verification process.
- `04_Operating_Manual/delivery-workflow.md` — timeline table updated from the pre-v2 eight-service list to the current seven services; two stale "Risk Review/Uplift Plan" mentions corrected.
- `04_Operating_Manual/weekly-business-rhythm.md`, `05_Client_Templates/microsoft-365-review-template.md` — broken links to the archived Ongoing Cyber Advisor Support file corrected to Security Adviser.
- `06_Sales_and_Marketing/contact-page-copy.md`, `04_Operating_Manual/escalation-and-referral-rules.md`, `09_Checklists/incident-readiness-checklist.md`, `09_Checklists/sme-cyber-readiness-checklist.md`, `07_Agents/incident-readiness-agent.md`, `05_Client_Templates/incident-readiness-plan-template.md` — stale CERT NZ incident-contact references corrected to the NCSC (the merger was already recorded as fact in `risk-boundaries.md` but had not been propagated to these six files); `contact-page-copy.md`'s stale "Book a cyber risk review" CTA text also updated; `escalation-and-referral-rules.md`'s stale "Incident Readiness Workshop / Risk Review" mention updated to current service names.
- `00-business/decisions.md` — new entry recording the Security Posture Review naming decision and the architecture decision against a third folder structure.
- `03_Services/independent-security-review.md` — resolved its own previously-flagged "pending rename" note by pointing to the new report template, finding IDs, risk ratings, and the four-phase 90-day plan.

**Does this break previous methodology?** No. Every existing verification level, priority label, template scaffold, and SOP referenced above is retained; nothing already in use has to be relearned, only extended. The one naming distinction to internalise: the *service* is still called Independent Security Review; the *report* it produces is now called the Pharos Security Posture Review.

**Migration required:** None for past work (there's been no paying client yet — see `decisions-required.md` question 5). Going forward, use the new report template, finding-ID scheme, and risk rating for any new assessment work.

**Future work:** See `09-project-management/minimum-viable-assessment-checklist.md` for what's still needed before a first paid engagement (the business readiness gate, not the methodology), and the "Deferred" section of the gap analysis for what was deliberately left out of this pass.
