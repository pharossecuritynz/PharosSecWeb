---
title: Reporting Standards
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or when the canonical report structure changes
---

# Reporting Standards

Every client-facing report, plan, or written deliverable follows these standards, regardless of which service produced it.

## Structure principle: summary first, detail second

Every report opens with a **plain-English executive summary** (max 1 page) that a non-technical business owner can read in under 3 minutes and understand:
1. What was reviewed
2. The overall picture (in words, not just a score/rating)
3. The 3–5 things that matter most
4. What to do next

Technical detail, findings tables, and methodology follow **after** the summary — never before it.

## The canonical Pharos Security Posture Review structure

This is the flagship report structure, produced by the Independent Security Review service (and used in reduced form by Exposure Snapshot and IT Provider Security Assurance). The service itself keeps its confirmed name, Independent Security Review; the report it produces is titled the **Pharos Security Posture Review** — see `00-business/decisions.md`, 2026-08-29 entry, for why the report and service names differ deliberately.

1. Cover
2. Confidentiality / document information (see the footer and naming conventions below)
3. Executive Security Brief
4. Organisation context
5. Assessment scope
6. Methodology (plain-language description; see `pharos-security-baseline.md`'s client-facing summary line)
7. Overall security position
8. Security Posture Scorecard
9. Existing strengths
10. Priority risks
11. Top five actions
12. Detailed findings, by domain
13. Privacy baseline
14. External exposure
15. Incident readiness
16. Supplier / MSP responsibilities
17. 90-day improvement plan
18. Management action register (internal appendix, or a client-facing excerpt of it — see `remediation-and-verification.md`)
19. Scope and limitations
20. Reference guidance (appendix only, not the homepage/executive layer)
21. Appendix / technical evidence, where appropriate

Not every service produces every section: Exposure Snapshot, being external-only, naturally omits sections that require internal access (endpoint, identity, backups), and states plainly in its scope section why. A shorter engagement compresses sections rather than dropping the executive-first, evidence-driven discipline.

## Report layering

Every report is written in three layers, so a business owner is never required to read technical detail to understand what decision is being asked of them:

- **Layer 1: Executive.** The Executive Security Brief, the scorecard, priority risks, and the top five actions — for owners, directors, and managers. Plain English throughout, no unexplained jargon, no acronyms without a first-use definition.
- **Layer 2: Findings and remediation.** The detailed findings and the 90-day plan — for management and the client's IT provider, technical enough to act on.
- **Layer 3: Technical evidence.** Raw configuration detail, screenshots, and technical citations — for a technical reader who wants to verify a finding directly. Included as an appendix, not woven through the main body.

## Executive Security Brief

Roughly two pages, read on its own without the rest of the report. Covers: overall security position; the biggest business risks; what the organisation is already doing well; what needs attention now; the top five actions with likely effort and cost; who needs to act; what should happen over the next 30 to 90 days. Plain English throughout — this section is read by people who will never open the detailed findings.

## Security Posture Scorecard

A domain-level summary table, using the same qualitative language as everywhere else in Pharos reporting — never a percentage or numeric score, consistent with the existing false-precision ban below.

| Domain | Position | Priority |
|---|---|---|
| Identity and access | Needs attention | High |
| Email and collaboration | Reasonable | Moderate |
| Devices | Reasonable | Moderate |
| Backup and recovery | Strong | Low |
| Privacy | Needs attention | High |
| Incident readiness | Weak | High |

"Position" uses four plain terms: **Strong**, **Reasonable**, **Needs attention**, **Weak** — a maturity read, not a risk rating (see `risk-and-priority-methodology.md` for how domain-level risk is rolled up separately, where relevant). "Priority" mirrors the finding-level priority scale, rolled up to whichever priority is most urgent within that domain. Internally, a domain's scorecard position can be traced back to the specific findings behind it; the scorecard itself never claims more precision than that.

## Positive findings

Every report includes existing strengths as a named, mandatory section, not an afterthought. Effective controls, good organisational habits, and improvements already underway are recorded with the same discipline as gaps — this is both more accurate (few businesses are doing nothing right) and keeps the report from reading as unrelentingly negative, consistent with the brand's calm-over-fear principle.

## Business-language risk scenarios

Technical findings are translated into what they mean for the business before, or instead of, a purely technical description. Technical evidence is still recorded (Layer 3), but the finding itself leads with consequence, not mechanism.

> Instead of: "DMARC is set to `p=none`."
> Use: "Someone could more easily send fraudulent email that appears to come from your company domain, increasing the risk of invoice fraud, phishing aimed at your customers, and damage to customer trust."

## Recommendation quality

A recommendation is not complete until it answers: what should be done, why, who should probably do it, what "done" looks like, how urgent it is, how difficult it is, what it will likely cost, and how completion will be verified (see `remediation-and-verification.md`). Vague recommendations ("improve security awareness") are rewritten as specific ones ("introduce a short mandatory security-awareness programme for all staff covering phishing, invoice fraud, suspicious-login reporting, and password/MFA practices, repeated annually and included in new-starter onboarding").

## Outcome-focused, not product-prescriptive

Recommendations specify the security outcome needed, not a specific product, unless a specific product is genuinely the only reasonable option and naming it serves the client better than withholding it. Prefer "use an organisation-managed password manager" over naming a specific vendor. This protects the independence claim already central to Pharos's positioning — a client should never reasonably suspect a finding was shaped to sell software.

## Formatting standards

- Use the typography hierarchy in [../01_Brand/typography.md](../01_Brand/typography.md)
- Use tables for findings/recommendations lists (Finding ID → Finding → Why it matters → Risk → Priority → Suggested action). See `evidence-standard.md` for the finding ID scheme and `risk-and-priority-methodology.md` for the risk rating, which is always shown as a plain-English category, never a number.
- Use a consistent priority scale across all reports:

| Priority | Meaning | Suggested timeframe |
|---|---|---|
| **Now** | Meaningful risk, low effort/cost to fix | Within 30 days |
| **Next** | Worth doing, moderate effort or dependency | Within 90 days |
| **Later** | Good practice, lower urgency or higher effort | Within 6–12 months |
| **Monitor** | Not actionable yet, but worth watching | Revisit at next review |

- Avoid red/amber/green traffic-light colour coding that leans into alarm — use the Now/Next/Later/Monitor labels instead, styled with the brand's restrained palette (see [../01_Brand/colour-palette.md](../01_Brand/colour-palette.md))
- Every finding must include **why it matters in plain English**, not just a technical description
- Every report ends with a clear "what happens next" section

## Language standards

- Follow [../01_Brand/tone-of-voice.md](../01_Brand/tone-of-voice.md) throughout
- Define every acronym on first use
- Avoid absolute claims ("fully secure," "completely eliminates risk") — use "significantly reduces," "meaningfully lowers"
- Every report includes a boundaries/limitations note (see [../03_Services/service-boundaries.md](../03_Services/service-boundaries.md) for standard language)

## File formats

- Final delivery: PDF (locked formatting, professional presentation)
- Working/editable version: available on request as Word/Markdown, particularly for the Uplift Plan and Policy Starter Pack where the client will want to edit and maintain the document themselves

## Confidentiality footer (required on every report)

Every report should include a footer or cover-page note along the lines of:

> This report is prepared exclusively for [Client Name] and contains confidential information about their systems and practices. It should not be shared outside the organisation without the client's consent, and should be stored securely given the sensitive nature of its contents.

## Version and naming convention

`[ClientName]_[ServiceName]_[YYYY-MM-DD]_v[n].pdf` — e.g. `Northstar-Legal_SecurityPostureReview_2026-03-14_v1.pdf`

## Document status

Every report version carries a status, tracked on the cover or document-information page: **Working** (internal draft, not reviewed) → **Draft** (internal QA passed, not yet client-facing) → **Client Draft** (shared with the client for discussion, expected to change) → **Final** (delivered, the version of record) → **Superseded** (replaced by a later version, kept for the record). This makes it obvious at a glance whether a given copy of a report is the one to act on.

## Assumptions / needs founder input

- Confirm whether reports will be produced in Word/Google Docs and exported to PDF, or authored directly as PDF via a design tool — affects template file format choices in [../05_Client_Templates/](../05_Client_Templates/).
