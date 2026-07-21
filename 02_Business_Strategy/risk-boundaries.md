# Risk Boundaries

This document defines what Pharos Security will and will not do, as a business-level policy. It exists to protect clients (from receiving advice or services beyond the practice's realistic capability) and to protect the business (from liability, scope creep, and reputational risk).

## Hard boundaries — never offer or imply

| Boundary | Why |
|---|---|
| **No 24/7 monitoring or SOC services** | Requires infrastructure, staffing, and tooling a solo/small practice cannot realistically or safely commit to. Implying otherwise creates false client expectations with serious consequences during a real incident. |
| **No penetration testing or offensive security testing** | Requires specific technical certification, insurance, and controlled methodology. Refer to a specialist pentest firm. |
| **No forensic incident response** (i.e. actively investigating and remediating a live breach) | Requires specific tooling, chain-of-custody discipline, and often legal coordination. Pharos Security prepares clients *before* an incident (readiness) but does not lead the technical response *during* one. |
| **No compliance certification issuance** (e.g. "certifying" ISO 27001, SOC 2, PCI-DSS compliance) | Only accredited certification bodies can issue formal certification. Pharos Security can help a client *prepare* for an audit, not certify them. |
| **No guarantees of prevention** | Never state or imply that following our advice guarantees a business won't be breached. |
| **No legal advice** | Data breach notification obligations, contract law, and liability questions should be referred to a qualified lawyer. Pharos Security can flag when legal input is needed but must not provide it directly. |

## What happens if a client asks for something out of scope

1. Say clearly and calmly that it's outside what Pharos Security provides, and why (protects them, not just us).
2. Offer a referral to an appropriate specialist (see [../04_Operating_Manual/escalation-and-referral-rules.md](../04_Operating_Manual/escalation-and-referral-rules.md)).
3. Where possible, still add value within scope — e.g. if a client needs a pentest, Pharos Security can help them scope the request to a pentest firm and interpret the resulting report afterwards.

## Active incident handling — what Pharos Security *can* do

If a client contacts Pharos Security **during** a live incident:
- Can provide calm, plain-English guidance on immediate first steps (e.g. isolate affected systems, notify the bank if financial fraud is involved, preserve evidence, who to notify)
- Can help the client understand next steps and coordinate who they need (forensic IR firm, lawyer, insurer, Police / CERT NZ)
- **Cannot** lead technical remediation, forensic investigation, or act as the client's incident response provider
- Should direct urgent live-incident cases to **CERT NZ** (cert.govt.nz) and, where financial fraud is involved, the client's bank and the NZ Police (105, or 111 if urgent)

This is why **Incident Readiness** (preparation, planning, tabletop exercises) is a core service, while **incident response** (live technical handling) is explicitly out of scope.

## Liability and insurance considerations

- Recommend the founder obtain **Professional Indemnity Insurance** and **Public Liability Insurance** appropriate for an advisory (not technical remediation) practice before taking on paying clients.
- All client engagements should be governed by a signed **Terms of Engagement / Statement of Work** that explicitly states scope, exclusions, and limitation of liability. This should be drafted or reviewed by a NZ commercial lawyer — treat the current absence of a reviewed contract template as an open risk.
- Client data handling must follow the **Privacy Act 2020** obligations — see [../04_Operating_Manual/data-handling-and-confidentiality.md](../04_Operating_Manual/data-handling-and-confidentiality.md).

## Reputational risk boundaries

- Never publish or imply specific client vulnerabilities, even anonymised, without explicit written client consent
- Never overstate findings to justify further paid work
- Never guarantee outcomes in proposals or marketing copy (e.g. "we'll make you unhackable")

## Assumptions / needs founder input — high priority

- **No lawyer-reviewed Terms of Engagement exists yet.** This is a genuine gap that should be closed before taking on the first paying client. Flagged as a top item in [../10_Admin/next-actions.md](../10_Admin/next-actions.md).
- Confirm professional indemnity insurance is (or will be) in place before client work begins.
- Confirm the founder's actual technical scope of expertise so these boundaries reflect real capability, not just a generic "safe list."
