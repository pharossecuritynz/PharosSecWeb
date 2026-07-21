# Service Boundaries

This is the practical, service-level companion to [../02_Business_Strategy/risk-boundaries.md](../02_Business_Strategy/risk-boundaries.md). Use it as a quick reference during scoping calls and proposal writing.

**Reaffirmed 2026-07-22:** the advisory-only boundary below (no penetration testing, no vulnerability scanning of production systems) was explicitly reconsidered and kept as-is when answering question 1 in [../09-project-management/decisions-required.md](../09-project-management/decisions-required.md). See [../00-business/decisions.md](../00-business/decisions.md) for the reasoning.

## What Pharos Security does

| Category | Included |
|---|---|
| Risk assessment | Structured review of business context, systems, and practices to identify and prioritise cyber risk |
| Practical uplift planning | Turning identified risks into a realistic, sequenced action plan |
| Cloud environment basics review | Reviewing configuration of common SME platforms (primarily Microsoft 365) against sensible baseline practices |
| Human risk reduction | Staff awareness training, phishing readiness guidance |
| Incident preparation | Readiness planning, tabletop exercises, response plan templates |
| Policy support | Plain-English security policies and checklists tailored to the business |
| Ongoing advisory | Continued access to independent advice as the business changes |

## What Pharos Security does not do

| Category | Excluded | Why / where to refer |
|---|---|---|
| Penetration testing | Any active exploitation, vulnerability scanning of production systems, red-teaming | Refer to a licensed pentest firm |
| 24/7 monitoring / SOC | Continuous log monitoring, alerting, threat detection | Refer to an MSSP |
| Forensic incident response | Live breach investigation, malware analysis, evidence handling for legal proceedings | Refer to a digital forensics/IR firm |
| Compliance certification | Issuing ISO 27001, SOC 2, PCI-DSS, or similar certification | Refer to an accredited certification body; Pharos Security can help *prepare* for an audit |
| Software/hardware implementation | Installing, configuring, or managing security tools on an ongoing basis | Refer to the client's MSP/IT provider; Pharos Security can specify *what* is needed |
| Legal advice | Breach notification obligations, contracts, liability | Refer to a commercial/privacy lawyer |
| Deep technical remediation | Rebuilding compromised systems, malware removal | Refer to the client's IT provider or a specialist remediation firm |

## The general rule for scoping any new request

If a prospective piece of work requires:
- Specific technical certification Pharos Security doesn't hold, **or**
- Infrastructure/staffing beyond a solo practice (e.g. round-the-clock coverage), **or**
- Legal or regulatory authority Pharos Security doesn't have

...it's out of scope. Say so clearly, and refer out per [../04_Operating_Manual/escalation-and-referral-rules.md](../04_Operating_Manual/escalation-and-referral-rules.md).

## Boundary language for proposals and reports

Every proposal and report should include a short "what this engagement does not cover" note, using calm, non-alarming language, e.g.:

> "This review assesses your current practices and configuration against sensible baseline recommendations. It does not include penetration testing (active testing of your systems' defences) or continuous monitoring. If either would be valuable for your business, we're happy to help you scope that with a specialist partner."

## Assumptions / needs founder input

- This list should be reviewed against the founder's actual certifications and experience to confirm nothing here is being under- or over-claimed.
