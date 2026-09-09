---
title: What Pharos Does - Service Model
status: draft
owner: Jason Hill
last-reviewed: 2026-09-09
review-cycle: when positioning, service architecture, or service boundaries change
---

**Status note (2026-09-09):** for the current 90-day commercial-validation window, the active offer is narrower than the full progressive pathway described below: Independent Security Review (also sold as IT Provider Security Assurance) plus Remediation Assurance. See `00-business/pharos-current-strategy.md` and the categorised `service-catalogue.md`. This document's target client, methodology, and MSP-relationship framing are unchanged and still the working reference; only "target client" below is narrowed to the current beachhead.

# What Pharos Does: Service Model

This is the canonical definition of what Pharos Security does, who it serves, how the service works, and where its boundaries sit. Use it as the source for proposals, website copy, referral conversations, and shorter descriptions. Detailed scopes remain in the individual service notes linked from the [[service-catalogue|Service Catalogue]].

> [!note] Review status
> This is an internal, AI-assisted draft. Jason Hill must review and approve any client-facing adaptation before it is used.

## Positioning

Pharos Security is an independent cyber security advisory and assessment service for New Zealand small and medium businesses. It helps a business understand where it is exposed, how well its current security arrangements are working, which risks matter most, and what it should do next.

Pharos is not an MSP, product reseller, security operations centre, penetration-testing firm, or forensic incident-response provider. It does not replace the organisation's existing IT provider or internal IT person. Its role is to provide an independent view, translate technical evidence into business decisions, and help the people already responsible for the technology act on a practical plan.

The core promise is simple:

> Your IT provider manages your technology. Pharos helps you know whether your security is good enough.

See [[../01_Brand/positioning|Positioning]], [[../02_Business_Strategy/business-overview|Business Overview]], and [[service-boundaries|Service Boundaries]].

## Target client

**Current beachhead (2026-09-09):** New Zealand professional-services businesses, roughly 15 to 50 staff, on Microsoft 365, with an outsourced MSP, no internal security specialist, handling valuable transactions or confidential information. See `00-business/pharos-current-strategy.md` for the full reasoning and priority sectors. The broader description below remains the general target profile once the beachhead is proven:

The primary client is a New Zealand organisation with roughly 5 to 50 staff that:

- has no dedicated internal security team
- relies on an MSP, outsourced IT provider, or generalist internal IT person
- uses Microsoft 365 or Google Workspace and depends heavily on cloud services
- handles customer, employee, financial, health, professional, or other sensitive information
- faces growing customer, insurance, contractual, board, or privacy expectations
- wants a sensible level of security without importing an enterprise programme it cannot maintain

The usual buyer is an owner, managing director, general manager, COO, CFO, operations manager, practice manager, internal IT manager, or board member. See [[../02_Business_Strategy/target-market|Target Market]] and [[../02_Business_Strategy/customer-profiles|Customer Profiles]].

## Problems Pharos solves

Pharos is designed for businesses asking questions such as:

- Are our security arrangements actually good enough, and how would we know?
- What can someone learn or reach from outside our business?
- Which weaknesses create real business risk, rather than theoretical concern?
- What should we fix first with the time and budget we have?
- Is our IT provider covering the right things, and which responsibilities still belong to us?
- How should we respond to a customer questionnaire, insurer request, board concern, near miss, or suspicious event?
- If an incident happens, who makes decisions, who do we call, and what happens in the first hour?
- How do we keep improving without employing a security team?

The service replaces uncertainty and disconnected technical advice with an evidence-backed view, clear ownership, and an achievable action plan.

## Assessment approach

Pharos begins with the business, not a technology checklist. It establishes what the organisation does, the information and services it depends on, the consequences of disruption or loss, and the people and suppliers responsible for key systems. The depth and scope of the assessment are then agreed before evidence is collected.

Evidence can include interviews, policies and supplier documents, read-only configuration review, guided screen-sharing, existing reports, and lawful external observation. Each important conclusion is labelled according to how strongly it was established: self-reported, documented, observed, or verified. Missing or inconclusive evidence is recorded as such rather than treated as proof that a control is working.

The assessment is informed by the [[../04_Operating_Manual/pharos-security-baseline|Pharos Security Baseline]], with detailed delivery guidance in the [[../04_Operating_Manual/assessment-methodology|Assessment Methodology]] and [[../04_Operating_Manual/evidence-standard|Evidence Standard]]. The baseline draws on recognised international controls and New Zealand guidance, but the client receives plain-English findings rather than a framework compliance exercise.

## External exposure checks

External exposure work looks only at what can lawfully and safely be observed from outside. Depending on the service, this can include:

- domain and DNS configuration
- SPF, DKIM, and DMARC email-security records
- certificate status and publicly visible infrastructure
- exposed services identified through passive sources
- public information that could support impersonation or invoice fraud
- credential exposure checked through reputable, lawful breach-data services
- obvious public cloud or SaaS exposure

These checks do not include active exploitation, password testing, intrusive scanning, attempts to log in, or interaction with third-party systems. A clean external result is not evidence that internal controls are sound. See [[exposure-snapshot|Exposure Snapshot]].

## Security posture areas

A full review considers the areas most likely to affect a small organisation's real security posture:

- governance, ownership, and risk decisions
- asset, system, data, and dependency awareness
- identity, MFA, privileged access, and joiner-mover-leaver practices
- email, collaboration, phishing, and payment-fraud controls
- endpoint protection, encryption, patching, and unsupported systems
- vulnerability-management practices
- backup coverage, isolation, restoration testing, and recovery expectations
- external exposure and public footprint
- logging, alert ownership, and realistic detection capability
- incident readiness, decision authority, communications, and emergency contacts
- staff awareness and reporting culture
- MSP, supplier, and third-party responsibilities
- New Zealand privacy and information-handling practices, without providing legal advice

The review recognises what is already working as well as what is missing. It does not assume that every SME needs enterprise tools, a SIEM, or a large policy library.

## Evidence to risk to action

Every material conclusion follows one chain:

1. **Evidence:** What was seen, supplied, stated, or independently observed? How strong is that evidence, and what was not checked?
2. **Risk:** What could realistically happen in this business, how plausible is it, and what would the operational, financial, reputational, contractual, or privacy impact be?
3. **Action:** What specific change would reduce that risk, who should own it, what effort or cost is likely, and how should completion be checked?

This Evidence to Risk to Action method prevents raw technical observations from being presented without context. It also prevents a recommendation from being made merely because a framework contains a control. See [[../04_Operating_Manual/risk-and-priority-methodology|Risk and Priority Methodology]].

## Prioritised roadmap

The output is a staged plan, not a flat list of findings:

- **Immediate:** urgent communication or containment where a critical issue is identified during the engagement. It is raised directly and is not held for the final report.
- **Within 30 days:** high-value actions that reduce meaningful risk now, particularly low-effort or low-cost improvements.
- **Within 60 days:** work that needs coordination, approval, supplier input, or a little more preparation.
- **Within 90 days:** larger or dependent improvements that complete the first practical uplift period.
- **Later or monitor:** worthwhile work that can reasonably wait, or an issue that should be watched until circumstances change.

Each action should name an owner, timing, expected outcome, likely effort and cost category, dependencies, and a way to verify completion. The roadmap complements the formal Now, Next, Later, and Monitor priority model used in reports.

## Working alongside MSPs and IT providers

Pharos works with the client's existing IT provider, not around them. The provider usually holds valuable operational knowledge and will often implement agreed technical changes. Pharos adds an independent assessment of the security outcome, clarifies who owns each responsibility, translates proposals into business risk, and helps the client ask precise questions.

The approach is constructive. It does not assume the provider has failed, attempt to audit the provider's entire business, or manufacture conflict. A valid outcome is confirmation, supported by evidence, that an important control is already being handled well. Good MSPs can be delivery partners and referral partners. See [[it-provider-security-assurance|IT Provider Security Assurance]] and the [[../05_Client_Templates/msp-responsibility-matrix-template|MSP Responsibility Matrix]].

## Incident-readiness role and boundaries

Pharos helps a business prepare before an incident. This includes clarifying decision authority, documenting internal and external contacts, defining first-hour actions, connecting incident response with backups and continuity, preparing communication and privacy-escalation prompts, and facilitating a realistic tabletop exercise.

During a live incident, Pharos may help the client follow its plan, coordinate calls, frame decisions, and identify the right specialist. It does not provide 24-hour monitoring, emergency-response service levels, forensic investigation, malware removal, evidence handling for legal proceedings, or legal advice. Technical containment and recovery remain with the client's IT provider or a specialist incident-response firm. Legal and notification decisions remain with appropriately qualified advisers and the client. See [[incident-readiness|Incident Readiness]], [[service-boundaries|Service Boundaries]], and [[../04_Operating_Manual/escalation-and-referral-rules|Escalation and Referral Rules]].

## Progressive service pathway

The pathway lets a business start with low commitment and add support only when it is useful:

1. **Free guidance and self-assessment.** Pharos Answers content and the [[free-security-health-check|Free Security Health Check]] help a business understand common issues and self-report its current practices.
2. **Exposure Snapshot.** The free [[exposure-snapshot|Exposure Snapshot]] adds an independently observed view of the external footprint. It complements self-assessment but does not judge internal security.
3. **Security Posture Review.** The paid [[independent-security-review|Independent Security Review]] is the main full assessment service. It produces the **Pharos Security Posture Review** report: an evidence-backed picture of current posture and a prioritised 90-day plan. [[it-provider-security-assurance|IT Provider Security Assurance]] is an alternative entry point when the main question concerns an existing IT arrangement.
4. **Secure Foundations.** [[secure-foundations|Secure Foundations]] coordinates the initial 90-day improvement period. The client's IT provider or other specialists implement technical changes while Pharos keeps priorities, ownership, evidence, and progress clear.
5. **Incident Readiness.** [[incident-readiness|Incident Readiness]] establishes and exercises the practical plan for what happens when something goes wrong. It can follow a review or be scoped separately where readiness is the immediate need.
6. **Ongoing advisory.** [[security-adviser|Security Adviser]] provides periodic review, decision support, supplier and proposal sense-checking, plan refreshes, and access to an independent adviser as the business changes.

The [[service-catalogue|Service Catalogue]] holds the current commercial names, scopes, and internal pricing guidance.

## Differentiators

- **Independent:** no product sales, commissions, or implementation margin driving the recommendation.
- **Built for New Zealand SMEs:** advice is scaled to the organisation's size, resources, risks, and local context.
- **Evidence-led:** conclusions state what supports them and how confidently the control was checked.
- **Business-first:** technical observations are translated into realistic consequences and decisions.
- **Prioritised:** immediate, 30, 60, and 90-day actions make the work achievable.
- **Plain English:** calm, specific language without fear-based selling or unexplained technical scores.
- **Constructive with IT providers:** Pharos clarifies and verifies rather than replacing or undermining the existing provider.
- **Honest boundaries:** specialist testing, incident response, certification, legal advice, and implementation are referred to the right provider.
- **Continuity without an internal team:** clients can move from a one-off assessment into measured improvement and ongoing advice.

See [[../02_Business_Strategy/differentiation|Differentiation]] and [[../02_Business_Strategy/competitor-positioning|Competitor Positioning]].

## Concise pitch

Pharos Security helps New Zealand small and medium businesses understand where they are exposed, which cyber security risks matter most, and what to do next. We provide independent, practical assessments without selling software, replacing your IT provider, or imposing enterprise-level requirements that a smaller organisation cannot maintain.

We combine lawful external exposure checks with evidence from the way the business actually operates. Depending on the agreed scope, we review identity and access, email and phishing risk, devices and patching, backups and recovery, suppliers, privacy practices, incident readiness, security ownership, and the controls managed by an existing IT provider. Every conclusion follows a clear chain: what the evidence shows, what risk that creates for the business, and what action is proportionate.

The result is a plain-English view of the current security posture and a prioritised roadmap covering urgent issues and practical improvements over the next 30, 60, and 90 days. Pharos can then help the business and its MSP coordinate the work, prepare for incidents, verify progress, and make security decisions with greater clarity.

Pharos can remain involved as an independent Security Adviser as the organisation grows and changes. The aim is to give smaller businesses access to experienced security judgement and an honest second opinion without requiring an internal security team or an ongoing managed security service.

## Related notes

- [[service-catalogue|Service Catalogue]]
- [[service-boundaries|Service Boundaries]]
- [[../02_Business_Strategy/business-overview|Business Overview]]
- [[../02_Business_Strategy/target-market|Target Market]]
- [[../02_Business_Strategy/differentiation|Differentiation]]
- [[../04_Operating_Manual/assessment-methodology|Assessment Methodology]]
- [[../04_Operating_Manual/pharos-security-baseline|Pharos Security Baseline]]
- [[../06_Sales_and_Marketing/business-pitch|Extended Business Pitch]]
