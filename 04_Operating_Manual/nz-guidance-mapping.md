---
title: NZ Guidance Mapping
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or when a cited source is updated
---

# NZ Guidance Mapping

This document does two things: it draws a clear line between what's a legal requirement, what's government guidance, what's industry good practice, and what's simply a Pharos recommendation; and it maps Pharos's thirteen assessment domains to the specific NZ guidance behind them, so any finding can be traced back to something real without turning the client report into a compliance audit.

## The four-way distinction

Every piece of guidance Pharos cites, internally or in a report, falls into exactly one of these categories. Mixing them up is the single easiest way to accidentally overstate what a finding means.

| Category | What it means | Example |
|---|---|---|
| **Legal requirement** | A binding obligation under NZ law. Pharos states that a requirement exists as a factual matter, but does not interpret how it applies to a specific client's circumstances — that's a lawyer's job. | "The Privacy Act 2020 requires every agency to have a Privacy Officer." |
| **Government guidance** | Published by a NZ government body (NCSC, OPC) as recommended practice, not a law businesses are required to follow. | "NCSC's Minimum Cyber Security Standards recommend enforcing MFA." |
| **Industry good practice** | Widely recognised outside government (CIS Controls, vendor security guidance) as sensible practice. | "CIS Controls IG1 recommends unique credentials for every account." |
| **Pharos recommendation** | Pharos's own judgement about what's proportionate for this specific business, informed by the above but not dictated by it. | "Given this business handles payment details for customers, Pharos recommends prioritising MFA enforcement this quarter." |

Client reports keep this distinction implicit through plain language (a finding is written as what it means for the business, not as a citation), but the internal record behind every finding states which category applies. This stops "NCSC recommends X" from silently drifting into "you must do X," which the business would reasonably read as a compliance claim Pharos never intended to make.

## The core language rule

**Pharos never tells a client they are "NCSC compliant," "Privacy Act compliant," or "certified" against any framework.** NCSC's Minimum Cyber Security Standards are mandated for GCISO-mandated public sector agencies, not for private businesses, and are used here only as a well-designed, current, NZ-specific practical reference. The standard client-facing description, consistent with the existing one in `pharos-security-baseline.md`, is:

> Informed by recognised New Zealand cyber security guidance and adapted to the needs and realities of small and medium businesses.

Detailed appendices can name specific frameworks for a client, adviser, or insurer who wants that level of detail. The homepage, service pages, and executive summary never do.

## Domain-to-guidance traceability

| Domain | Primary NZ/international guidance | Category |
|---|---|---|
| `GOV` — Governance and risk | NCSC Minimum Cyber Security Standard: Risk Management; NCSC framework function: Guide and Govern | Government guidance |
| `AST` — Asset awareness | NCSC Minimum Cyber Security Standard: Assets and their Importance; CIS IG1 (asset inventory safeguards) | Government guidance / industry good practice |
| `IAM` — Identity and access | NCSC Minimum Cyber Security Standards: Multi-factor Authentication, Least Privilege; CIS IG1 (account and access-control safeguards) | Government guidance / industry good practice |
| `MAIL` — Email and collaboration security | CIS IG1 (email and browser protections); NCSC Minimum Cyber Security Standard: Secure Configuration of Software | Industry good practice / government guidance |
| `END` — Endpoint security | NCSC Minimum Cyber Security Standard: Secure Configuration of Software; CIS IG1 (endpoint safeguards) | Government guidance / industry good practice |
| `VUL` — Vulnerability and patch management | NCSC Minimum Cyber Security Standard: Patching; CIS IG1 (vulnerability management safeguards) | Government guidance / industry good practice |
| `BAK` — Backup and recovery | NCSC Minimum Cyber Security Standard: Data Recovery; CIS IG1 (data recovery safeguards) | Government guidance / industry good practice |
| `EXT` — External exposure | CIS IG1 (network and application protections); passive OSINT good practice | Industry good practice |
| `DET` — Detection and logging | NCSC Minimum Cyber Security Standard: Detect Unusual Behaviour | Government guidance |
| `IR` — Incident readiness | NCSC Minimum Cyber Security Standard: Response Planning; NCSC framework function: Respond and Recover | Government guidance |
| `AWR` — People and security awareness | NCSC Minimum Cyber Security Standard: Security Awareness | Government guidance |
| `TPR` — Suppliers and MSPs | NCSC framework function: Identify and Understand (explicitly includes "where security responsibilities lie between us and our suppliers") | Government guidance |
| `PRIV` — Privacy baseline | Privacy Act 2020 (legal requirement for the Act's existence and its principles); IPP 3A specifically, in force 1 May 2026 (legal requirement); OPC guidance (government guidance) | Legal requirement / government guidance |

This table is the traceability layer referenced by the finding data model's "NCSC mapping" and "Privacy Act/IPP mapping" fields in `evidence-standard.md`. It is an internal working reference; it is not reproduced in full in a standard client report, though a technically-interested reader (an insurer, a board member) can be shown the relevant row for a specific finding on request.

## What this deliberately avoids

Per the operating instruction behind this whole methodology upgrade: framework mappings support the assessment, they don't dominate it. A client should read "here's your risk, and what to do about it," never "you failed control ABC-123." This table exists so that claim is defensible, not so it becomes the report's centrepiece.
