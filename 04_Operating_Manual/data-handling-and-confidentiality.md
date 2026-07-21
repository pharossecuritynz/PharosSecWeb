# Data Handling and Confidentiality

Pharos Security routinely handles sensitive information about clients' systems, vulnerabilities, and practices. This document sets the operating rules — it is a practical policy, not a legal document (a formal Privacy Policy and Data Processing terms should still be lawyer-reviewed — see [../02_Business_Strategy/risk-boundaries.md](../02_Business_Strategy/risk-boundaries.md)).

## Guiding principle

Treat every piece of client information — findings, credentials, business context — as **more sensitive than the client themselves would assume**, because a leak of "here's where Company X is exposed" is uniquely damaging.

## What we collect and why

| Data type | Purpose | Retention |
|---|---|---|
| Business contact details | Managing the relationship | Duration of relationship + 2 years |
| Discovery questionnaire responses | Scoping and delivering services | Duration of relationship + 2 years, then archived/deleted |
| Temporary system access (e.g. read-only M365 admin access) | Delivering technical reviews | Revoked immediately at end of review; never retained |
| Findings and reports | Deliverables | Retained per client agreement, typically duration of relationship + statutory record-keeping period |
| Call/workshop notes | Service delivery quality | Duration of relationship, then archived |

## Access rules

- Only the founder (and, in future, any engaged associate bound by the same confidentiality terms) accesses client data
- Temporary system access credentials are never stored beyond the review window — request just-in-time access, revoke immediately after
- No client data is stored in personal (non-business) accounts, personal devices without encryption/passcode protection, or unsecured shared drives

## Storage and tooling

- Use business-grade (not personal free-tier) cloud storage with MFA enabled — see [../10_Admin/tools-and-software.md](../10_Admin/tools-and-software.md)
- Reports and working files stored in a structured client folder system, access-controlled
- No client-identifying information in filenames on any publicly synced or shared folder
- Email account protected with MFA; consider a dedicated password manager for any credentials temporarily handled during engagements

## Confidentiality commitments to clients

- Client engagement (even the fact that a business is a client) is never disclosed publicly without explicit permission — this includes case studies, testimonials, and referral conversations
- Findings are never shared, discussed, or referenced (even anonymised) without written client consent
- Anonymised, generalised learnings (e.g. "a common issue I see across clients is...") are acceptable for content/marketing purposes **only** when genuinely non-identifiable — apply a strict test: could this client, or someone who knows them, recognise themselves?

## Privacy Act 2020 considerations

- Pharos Security must handle any personal information encountered during engagements (e.g. staff email addresses seen during a phishing review) in line with the **Privacy Act 2020** principles: collect only what's needed, use it only for the stated purpose, keep it secure, and don't retain it longer than necessary
- If an engagement surfaces a client's own personal information handling gaps, that's a finding to report — not something Pharos Security remediates directly (see [../02_Business_Strategy/risk-boundaries.md](../02_Business_Strategy/risk-boundaries.md))

## Incident response for Pharos Security's own data

If Pharos Security's own systems (email, storage, laptop) were ever compromised or lost:
1. Immediately assess what client data was accessible
2. Notify affected clients promptly and honestly
3. Follow Privacy Act 2020 notification obligations if personal information is involved (consult the Office of the Privacy Commissioner guidance, and a lawyer if needed)

## Assumptions / needs founder input

- A formal, lawyer-reviewed Privacy Policy (for the website) and Data Processing terms (for client contracts) do not yet exist — flagged in [../10_Admin/next-actions.md](../10_Admin/next-actions.md).
- Confirm specific tooling choices (password manager, cloud storage provider) to finalise the "Storage and tooling" section.
