# MSP / IT Provider Security Responsibility Matrix — Template

*Gives the deliverable already named in [it-provider-security-assurance.md](../03_Services/it-provider-security-assurance.md) ("review of stated security responsibilities: what the MSP owns, what the client owns, and what falls into the gap between the two") an actual structure. Produced for the `TPR` domain in [assessment-methodology.md](../04_Operating_Manual/assessment-methodology.md), and included as its own section in the [Security Posture Review report](security-posture-review-report-template.md).*

*Purpose: distinguish "our IT provider looks after it" from "we understand exactly which security responsibilities our provider performs, and which remain ours." An "Unclear" answer in this matrix is itself a finding, not a gap in the exercise — record it with a finding ID like any other.*

---

## [Client Name] — Security Responsibility Matrix

| Security responsibility | Client | MSP / IT provider | SaaS provider | Pharos (advisory only) | Unclear |
|---|---|---|---|---|---|
| MFA enforcement | | | | | |
| Patching (OS/applications) | | | | | |
| Endpoint protection configuration and monitoring | | | | | |
| Privileged/admin account management | | | | | |
| Backup configuration | | | | | |
| Backup monitoring | | | | | |
| Backup restore testing | | | | | |
| Security alert monitoring and response | | | | | |
| Joiner/mover/leaver account changes | | | | | |
| Incident response — technical | | | | | |
| Incident response — coordination/communication | | | | | |
| Break-glass/emergency admin access | | | | | |
| Out-of-hours coverage | | | | | |
| Log retention | | | | | |

Mark each row with an X in the column(s) that actually hold that responsibility today, based on the discovery meeting and, where available, the provider's own documentation or contract. Do not infer a responsibility is covered because a provider exists — confirm it specifically.

## What this evidences

- **Evidence type**: predominantly client-stated and documentary (see [evidence-standard.md](../04_Operating_Manual/evidence-standard.md)), since it depends on what the business and its provider report, unless the provider's own documentation or a direct conversation with them was reviewed.
- **Tone**: this exercise is strictly constructive. Where a provider clearly has something covered, that's recorded plainly as a strength ("your provider has this covered, and here's the evidence"), not treated as a gotcha. See `it-provider-security-assurance.md`.

## Findings this typically produces

- Any row with no clear owner (an "Unclear" mark, or contradictory answers between the client and provider) — recorded as a `TPR` finding with Risk assessed on what that specific gap could mean in practice.
- A plain-English list of questions the business should ask its provider to close any remaining ambiguity, delivered alongside this matrix per `it-provider-security-assurance.md`.

---

*[Internal note: this matrix is reusable at follow-up — re-running it after a client changes providers, or after an initial round of "Unclear" rows gets clarified, is a natural, low-effort check-in.]*
