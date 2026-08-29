---
title: Minimum Viable Professional Assessment
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: revisit as each item is actually completed
---

# Minimum Viable Professional Assessment

What must exist before Pharos performs its first paid Security Posture Review. Cross-references the business-readiness gate already tracked in `decisions-required.md` question 5, which as of 2026-08-24 confirms none of the five items there (insurance, Terms of Engagement, certification, business registration, domain registration) are yet in place — this checklist covers the *methodology* side, which is now largely built; the *business* side is still gated on that separate, already-tracked list.

## Must have (methodology and process)

- [x] Assessment methodology and domain list (`assessment-methodology.md`)
- [x] Evidence standard and finding data model (`evidence-standard.md`)
- [x] Risk and priority methodology (`risk-and-priority-methodology.md`)
- [x] Privacy baseline, including IPP 3A (`nz-privacy-baseline.md`)
- [x] NZ guidance mapping and the legal/guidance/practice/recommendation distinction (`nz-guidance-mapping.md`)
- [x] Client questionnaire (`05_Client_Templates/discovery-questionnaire.md`, pre-existing, still fit for purpose)
- [x] Report template (`05_Client_Templates/security-posture-review-report-template.md`)
- [x] QA checklist with sign-off (`quality-checklist.md`)
- [x] Client data handling policy (`data-handling-and-confidentiality.md`, pre-existing)
- [x] Scope and limitations model (`assessment-methodology.md`, `service-boundaries.md`)
- [x] 90-day plan structure (`remediation-and-verification.md`)
- [x] Follow-up/verification process (`remediation-and-verification.md`)
- [ ] **Business readiness gate** (not methodology, tracked separately): professional indemnity and public liability insurance bound; lawyer-reviewed Terms of Engagement signed; business structure registered. See `decisions-required.md` question 5 — this is the actual blocker to a first paid engagement, not anything on this list above.

## Nice to have (can follow the first engagement, not before it)

- [ ] MSP Responsibility Matrix used and refined against a real engagement (template exists; untested against a real, possibly contradictory, client/provider answer pair)
- [ ] Management Action Register used through a full remediation cycle
- [ ] Machine-readable schema actually wired into any tooling (schema exists; no tooling built, deliberately)
- [ ] Full `03-agents/` spec rewrites for Report Writer, Report Quality, and a new Risk Register agent
- [ ] Named referral partners (already tracked in `10_Admin/assumptions-and-open-questions.md`)
- [ ] Effort/cost estimates and pricing re-validated against the new methodology's actual delivery time
- [ ] `10_Admin/document-control-register.md` refreshed to reflect all 2026-08-22 through 2026-08-29 changes

## The honest summary

The methodology is no longer the limiting factor. The business readiness gate is. Everything in "must have" above exists and has been conceptually validated against a synthetic scenario (`methodology-test-scenario-synthetic.md`); nothing has been run against a real client yet, and the discovery-call and questionnaire processes are still explicitly self-described elsewhere as untested against real calls. The first real engagement, once the business readiness gate clears, should be treated as a further test of this methodology, not just its first paid use — expect to refine the domain questions and the risk-rating judgement calls once real, messier answers arrive.
