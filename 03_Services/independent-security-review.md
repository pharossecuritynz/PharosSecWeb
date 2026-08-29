# Independent Security Review

**Flagship service. Renamed and expanded from Cyber Risk Review, 2026-08-22, under the Pharos v2 directive.** Previous version archived at `archive/cyber-risk-review.md`. See `00-business/decisions.md`.

## Purpose

An independent review of the security controls protecting a business, followed by a clear, prioritised plan for improvement.

## Who it's for

SME owners and operations leads who know cyber security matters but have no clear, independent picture of where they actually stand, and want an honest, non-technical starting point. Typically the first paid engagement with a new client, following the Free Security Health Check or a direct enquiry.

## Problems it solves

- "Are we actually secure enough?"
- "Are the important controls really in place?"
- "What are our biggest risks, and what should we fix first?"
- "Our IT provider handles security, but nobody's independently checked it."
- "We need something to show our insurer, board, or a customer that we've had our risk assessed."

## Scope

Structured discovery covering business context, systems, data, third parties, and existing controls, then a review across the areas that matter for a business this size:

- identity, MFA, and privileged access
- user account lifecycle: onboarding and offboarding
- devices and endpoint protection
- patching
- email and Microsoft 365 / Google Workspace configuration
- backups and recovery
- cloud services in use
- domain security and external exposure
- network and remote access considerations
- security monitoring and logging, at whatever level exists
- vulnerability management practices (not vulnerability *scanning* — see boundaries)
- third-party and supplier services
- password practices
- policies, where they exist
- staff awareness
- security ownership: who is actually responsible
- incident response readiness
- cyber insurance considerations
- data handling and privacy practices
- critical applications and business continuity dependencies

Assessed against the Pharos Security Baseline (`04_Operating_Manual/pharos-security-baseline.md`), with every finding labelled by verification level.

## Out of scope

- Technical penetration testing or vulnerability scanning of production systems
- Implementation of any recommended changes (covered by Secure Foundations or the client's IT provider)
- Deep, hands-on technical configuration work in any single platform (available as a scoped add-on module: Microsoft 365 configuration deep-dive, email and phishing technical review, staff awareness session, or policy pack, each of which can be added to this review or run standalone — see `archive/microsoft-365-security-basics-review.md`, `archive/email-and-phishing-readiness.md`, `archive/staff-cyber-awareness-sessions.md`, `archive/security-policy-checklist-starter-pack.md` for the source scope and pricing these modules draw on)

## What the report answers

Not a list of every possible control. Seven questions:

1. Where are we now?
2. What are the important risks?
3. What should we fix immediately?
4. What should we improve next?
5. What can reasonably wait?
6. Who should own each action?
7. What evidence would demonstrate improvement?

## Deliverables

1. Discovery session (interview-based, approximately 90 minutes)
2. A Pharos Security Posture Review report (see `05_Client_Templates/security-posture-review-report-template.md`) including:
   - Executive Security Brief (one page, non-technical — see `04_Operating_Manual/reporting-standards.md`)
   - Findings by domain, each with a stable finding ID, stated as evidence, interpretation, action, and labelled by verification level and risk rating (see `04_Operating_Manual/evidence-standard.md` and `risk-and-priority-methodology.md`)
   - A 90-Day Security Improvement Plan (First 14 days / 15–30 / 31–60 / 61–90 days — see `04_Operating_Manual/remediation-and-verification.md`)
3. A 45 to 60 minute walkthrough call to present findings and answer questions

## Inputs required from client

- Completed discovery questionnaire ahead of the session (see `05_Client_Templates/discovery-questionnaire.md`)
- Access to relevant staff (owner, ops lead, IT provider contact if applicable) for the discovery interview
- A high-level list of systems and platforms in use (can be informal)

## Delivery process

1. Scoping and proposal
2. Client completes discovery questionnaire
3. Discovery session (60 to 90 minutes)
4. Analysis and report writing (allow 3 to 5 business days)
5. Findings walkthrough call
6. Report delivered in final form, with the 90-day plan in an easily reusable format

## Estimated effort (founder time)

| Task | Time |
|---|---|
| Scoping/proposal | 1 hour |
| Discovery session | 1.5 hours |
| Analysis & report writing | 4–7 hours |
| Findings walkthrough | 1 hour |
| **Total** | **~7.5–10.5 hours** |

## Suggested pricing range

**NZD $1,800 – $4,200** (excl. GST), scaled by business size and complexity. In line with published NZ market data; see `02_Business_Strategy/pricing-strategy.md`.

## Risks and limitations

- Findings are based on what's reported and what's observable without technical testing; genuinely hidden technical vulnerabilities may not surface, and the report says so clearly
- Not a substitute for penetration testing where a client's risk profile warrants it (flag as a referral)
- Quality depends heavily on client engagement in the discovery session

## Sales copy

> Most businesses know cyber security matters but have never had an honest, independent look at where they actually stand. The Independent Security Review gives you a clear picture, in plain English, of what's working, what's not, and what to prioritise next. No jargon, no scare tactics, just clarity.

## Report/output structure

See `05_Client_Templates/security-posture-review-report-template.md`, the thirteen assessment domains in `04_Operating_Manual/assessment-methodology.md`, and the reporting hierarchy in `04_Operating_Manual/reporting-standards.md`.
