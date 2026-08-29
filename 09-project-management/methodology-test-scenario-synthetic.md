---
title: Methodology Test Scenario (Synthetic)
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: rerun whenever the methodology changes materially
---

# Methodology Test Scenario (Synthetic)

**Every detail below is fictitious**, invented to sanity-check the 2026-08-29 assessment methodology end to end before it's used on a real client. No real client evidence, names, or data appear anywhere in this document.

## The scenario

**Northbridge Legal Ltd** (fictitious), a 20-person law firm in Wellington. Runs Microsoft 365. Uses an outsourced MSP for day-to-day IT support. Staff use Windows laptops, mostly company-owned. Cloud accounting software. Holds client personal information (a law firm's ordinary case files) and some payment information. No dedicated security staff. MFA is enabled for some accounts but not enforced for all. Backups are described by the MSP as "handled," with no further detail available to the business. No incident plan has ever been written or tested.

## Running it through the methodology

**Stage 1–2 (qualification, scope).** Fits the target market cleanly (`target-market.md`: professional services, 5–50 staff, no in-house security). Independent Security Review scoped.

**Stage 3–5 (questionnaire, evidence request, discovery meeting).** The discovery-questionnaire.md instrument and the thirteen `assessment-methodology.md` domains work through in order without needing new questions invented — a good sign the domain list is complete enough for a genuinely typical client. Two things surface immediately in `GOV`: no one has explicit ownership of security decisions, and the firm has never considered what "critical dependency" actually means for a legal practice (answer, once asked: the practice management system and email, without either of which the firm cannot bill or communicate with clients or the court).

**Stage 6 (technical/external assessment).** Exposure Snapshot-style passive checks find DMARC set to `p=none` and no other external red flags.

**Stage 7–9 (evidence validation, finding development, risk/priority review).** Sample findings, demonstrating the model works as designed:

| Finding ID | Domain | Title | Evidence | Risk | Confidence | Priority |
|---|---|---|---|---|---|---|
| IAM-01 | Identity and access | MFA not enforced for all accounts | Configuration observed (admin centre sighted directly) | High | High | Now |
| MAIL-01 | Email and collaboration | DMARC policy set to `p=none` | External observation (public DNS) | Moderate | High | Now |
| BAK-01 | Backup and recovery | Backup recoverability not demonstrated | Client-stated ("MSP handles it," no restore evidence available) | High | Medium | Next |
| TPR-01 | Suppliers and MSPs | Backup ownership and monitoring responsibility unclear between firm and MSP | Client-stated, corroborated by the MSP responsibility matrix showing an "Unclear" row | High | Medium | Now |
| GOV-01 | Governance and risk | No one owns security decisions | Client-stated, confirmed directly in discovery interview | Moderate | High | Now |
| PRIV-01 | Privacy baseline | No Privacy Officer appointed | Client-stated | Moderate | High | Next |
| PRIV-02 | Privacy baseline | Firm occasionally receives client referral information indirectly (from other firms, or the court) with no IPP 3A notification process | Client-stated, inferred gap (no process exists to check against) | Moderate | Medium | Next |
| IR-01 | Incident readiness | No incident plan exists | Client-stated | High | High | Now |

This confirms the finding-ID scheme, evidence types, and the risk-versus-priority split all work as intended: note `BAK-01` and `TPR-01` are both High risk but land at different priorities-in-practice once effort is weighed (`BAK-01` needs the MSP to actually run and evidence a test restore — Next; `TPR-01` just needs a clarifying conversation — Now), exactly the kind of case the methodology was designed to distinguish. `PRIV-02` demonstrates the IPP 3A domain content is usable in a realistic, easily-missed scenario (indirect collection via referral), not just a theoretical example.

**Stage 10–11 (draft report, QA).** The canonical structure holds together: Executive Security Brief leads with `IAM-01`, `IR-01`, and `TPR-01`'s ownership gap as the headline risks, but the actual **top five actions** section foregrounds `GOV-01` (assign an owner) and `TPR-01` (clarify with the MSP) ahead of some higher-risk items, because both are Very Low effort and No cost — proving the "strongest recommendations" principle in `risk-and-priority-methodology.md` produces a sensible, actionable top-of-report rather than just a sorted-by-severity list.

**Stage 13 (90-day plan).** First 14 days: `GOV-01` (assign ownership), `TPR-01` (clarify MSP backup ownership + get a written answer), `IAM-01` (enforce MFA for remaining accounts). Days 15–30: `MAIL-01` (move DMARC to `p=quarantine`), `PRIV-01` (name a Privacy Officer). Days 31–60: `BAK-01` (commission and evidence a test restore from the MSP), `IR-01` (draft a first incident plan, even a short one). Days 61–90: `PRIV-02` (build a simple IPP 3A check into the firm's referral-intake process). The four-phase structure holds a realistic, non-overwhelming sequence for a 20-person firm.

**Stage 15 (follow-up verification, run conceptually at the next check-in).** `IAM-01` closes cleanly: MFA enforcement screenshot reviewed, status moves to Verified complete. `BAK-01` is more interesting and exactly what the evidence-based follow-up process was built for: the client reports "the MSP says it's done," which is client-stated evidence, not the same as `evidence-standard.md`'s Verified level — status is recorded as **Remediated (unverified)** until an actual restore-test result is reviewed, at which point it can move to Verified complete. This is the concrete case the brief asked this exercise to test for, and it works as designed.

## What this exercise confirmed works

- The thirteen domains cover a realistic SME without needing invented categories.
- Finding IDs stay stable and readable across the assessment, the report, and the plan.
- Risk and priority genuinely diverge in ways that change what gets recommended first, not just how it's labelled.
- The privacy domain, including IPP 3A, produces a realistic, non-generic finding rather than reading as bolted-on.
- The evidence-based follow-up process meaningfully distinguishes "the client says it's fixed" from "Pharos has seen proof," which was the single biggest structural gap this whole upgrade was meant to close.

## What this exercise did not test

Real client ambiguity, contradictory answers between a client and their provider, and genuinely difficult risk-rating judgement calls (this scenario's findings were all fairly clear-cut). Those only get properly tested against real engagements — see `09-project-management/minimum-viable-assessment-checklist.md` for what else needs to be true before that happens.
