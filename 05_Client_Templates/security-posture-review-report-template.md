# Pharos Security Posture Review — Report Template

*The canonical report template for the [Independent Security Review](../03_Services/independent-security-review.md) service (and, in reduced form, [Exposure Snapshot](../03_Services/exposure-snapshot.md) and [IT Provider Security Assurance](../03_Services/it-provider-security-assurance.md)). Follows [../04_Operating_Manual/reporting-standards.md](../04_Operating_Manual/reporting-standards.md), the thirteen domains in [../04_Operating_Manual/assessment-methodology.md](../04_Operating_Manual/assessment-methodology.md), and the finding data model in [../04_Operating_Manual/evidence-standard.md](../04_Operating_Manual/evidence-standard.md).*

*This replaces `cyber-risk-review-report-template.md` (now marked superseded, kept for reference per the archive-not-delete rule). The service keeps its confirmed name, Independent Security Review; the report it produces is titled the Pharos Security Posture Review — see `00-business/decisions.md`, 2026-08-29 entry.*

---

## Cover page

- Pharos Security logo/wordmark
- Report title: "Pharos Security Posture Review"
- Client name: [Client Name]
- Date: [Date]
- Document status: Working / Draft / Client Draft / Final / Superseded
- Version: v[n]
- Confidentiality note (see [reporting-standards.md](../04_Operating_Manual/reporting-standards.md))

## 1. Executive Security Brief

*(Use [executive-summary-template.md](executive-summary-template.md), extended for the full review: overall security position, the biggest business risks, what's already working well, the top five actions with effort/cost, who needs to act, what should happen over the next 30 to 90 days. Roughly two pages, readable on its own.)*

## 2. Organisation context

- Business size, structure, and key systems (summarised from the discovery questionnaire and discovery meeting)
- What the business depends on, its customers, and any regulatory context
- Existing IT/security arrangements (current MSP or internal IT relationship)

## 3. Assessment scope

- What was assessed, and, just as importantly, what was not
- Method: discovery questionnaire + discovery meeting + technical/external assessment, dated [date]
- Client responsibilities during the engagement (access/information provided)
- What this review does **not** cover (standard boundaries language from [service-boundaries.md](../03_Services/service-boundaries.md))

## 4. Methodology

- Plain-language description only (see the client-facing summary line in [pharos-security-baseline.md](../04_Operating_Manual/pharos-security-baseline.md)) — no framework names or acronyms at this level; detail lives in the appendix.

## 5. Overall security position

- 3–4 sentences, plain English, no score. What's genuinely solid, what needs attention, stated calmly.

## 6. Security Posture Scorecard

| Domain | Position | Priority |
|---|---|---|
| Governance and risk | | |
| Identity and access | | |
| Email and collaboration | | |
| Devices | | |
| Backup and recovery | | |
| External exposure | | |
| Detection and logging | | |
| Incident readiness | | |
| People and awareness | | |
| Suppliers and MSPs | | |
| Privacy | | |

Position: Strong / Reasonable / Needs attention / Weak. Priority: the most urgent finding-level priority within that domain. See [reporting-standards.md](../04_Operating_Manual/reporting-standards.md).

## 7. Existing strengths

- [Genuine strength 1, with brief context]
- [Genuine strength 2]

*(Always included — see the positive-findings requirement in reporting-standards.md.)*

## 8. Priority risks

- The findings that matter most, described as business-language risk scenarios (see reporting-standards.md), before the detailed findings section. This is the "why should I care" bridge between the scorecard and the detail.

## 9. Top five actions

| # | Action | Risk it addresses | Effort | Cost | Owner |
|---|---|---|---|---|---|
| 1 | | | | | |

## 10. Detailed findings, by domain

For each relevant domain (Governance, Asset awareness, Identity and access, Email and collaboration, Endpoint, Vulnerability and patch management, Backup and recovery — external exposure, incident readiness, suppliers, and privacy have their own sections below since they carry additional structure):

| Finding ID | Finding | Why it matters | Evidence (verification level) | Risk | Confidence | Priority | Recommendation | Owner |
|---|---|---|---|---|---|---|---|---|
| GOV-01 | | | | | | | | |

## 11. Privacy baseline

*(See [nz-privacy-baseline.md](../04_Operating_Manual/nz-privacy-baseline.md). Findings use the `PRIV` prefix. Include the standard not-legal-advice framing explicitly in this section, not just in the appendix.)*

## 12. External exposure

*(See the `EXT` domain in assessment-methodology.md. State plainly which activities were passive and which, if any, were active and separately authorised.)*

## 13. Incident readiness

*(Current-state assessment against the `IR` domain — distinct from the full Incident Readiness Plan, which is a separate deliverable; cross-reference it if one already exists for this client.)*

## 14. Supplier / MSP responsibilities

*(Attach or summarise the [MSP Responsibility Matrix](msp-responsibility-matrix-template.md). Explicitly name any "Unclear" ownership rows as findings.)*

## 15. 90-day improvement plan

*(See [remediation-and-verification.md](../04_Operating_Manual/remediation-and-verification.md) for the four-phase structure. Deliver alongside, or embed, the [Client Action Plan](client-action-plan-template.md).)*

## 16. Management action register

*(Internal appendix by default — see [management-action-register-template.md](../04_Operating_Manual/management-action-register-template.md). Share a client-facing excerpt only where useful, e.g. for a client who wants to track progress directly against finding IDs.)*

## 17. Scope and limitations

- Assessed / Not assessed / Limitations / Assumptions / Client responsibilities, per the standard model in `assessment-methodology.md`
- Standard limitations note (see [service-boundaries.md](../03_Services/service-boundaries.md)): this review is based on reported practices, observed configuration, and passive external checks, not penetration testing; it identifies and prioritises risk, it does not guarantee security or certify compliance.

## 18. Reference guidance (appendix)

*(See [nz-guidance-mapping.md](../04_Operating_Manual/nz-guidance-mapping.md). Named frameworks and specific mappings live here, not in the executive layer.)*

## 19. Appendix: technical evidence

*(Layer 3 — screenshots, configuration exports, technical citations supporting specific findings, referenced by finding ID.)*

---

*[Internal note: keep the executive and findings layers (sections 1–15) to roughly 12–18 pages; technical appendices can run longer without affecting how the report reads for a business-owner audience.]*
