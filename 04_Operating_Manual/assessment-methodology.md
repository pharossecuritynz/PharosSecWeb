---
title: Assessment Methodology
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or when a domain or a source framework changes materially
---

# Assessment Methodology

This is the operational detail behind the Pharos Security Posture Review, the report produced by the Independent Security Review service (and, in reduced form, by the Exposure Snapshot and IT Provider Security Assurance services). It answers one question:

> What security risks matter most to this organisation, how well are those risks currently managed, and what should the organisation do next?

It sits underneath `pharos-security-baseline.md` (which holds the cited frameworks, the eight-stage lifecycle, and the verification-level concept) and consolidates the 19-area review scope already defined in `03_Services/independent-security-review.md` into thirteen named domains, each with concrete assessment questions. It does not replace either document; it's the layer that turns "review these areas" into "ask these things, and know what a finding looks like when you find one."

This methodology is sized for a 5 to 50 staff New Zealand business, per `02_Business_Strategy/target-market.md`. It is not an enterprise audit framework applied at a smaller scale — several domains below say explicitly what *not* to expect (no SIEM assumption, no penetration testing, no certification claim).

## The thirteen assessment domains

Each domain has a finding-ID prefix (see `evidence-standard.md`), a plain-English purpose, and the questions/evidence a reviewer works through. "Evidence to look for" is illustrative, not exhaustive — the reviewer's judgement, not a checkbox count, decides when a domain is adequately covered.

### GOV — Governance and risk

Whether anyone actually owns security decisions, and whether the business has a realistic sense of its own risk.

- Who owns security decisions day to day, and who would make a call under pressure?
- Does management review security at any regular cadence, even informally?
- Is there any written policy, even minimal, or is everything tribal knowledge?
- Does the business understand its own critical dependencies (the two or three systems it genuinely could not operate without)?
- Has cyber insurance been considered, and if held, does anyone know what it actually requires?

### AST — Asset awareness

Whether the business can name what it has, before assessing how well it's protected.

- People: staff count, contractor/casual access, who has admin-level access anywhere.
- Devices: company-owned vs personal (BYOD), managed vs unmanaged.
- Servers and infrastructure, however minimal.
- Cloud services and SaaS in active use (not just the obvious ones — ask what finance, HR, and operations use day to day).
- Critical applications: what the business could not run without for more than a day.
- Important data: what's actually sensitive (customer records, payment data, employee information, IP) and roughly where it lives.
- Third parties with access to systems or data.

A business that can't answer most of this is itself a finding (typically `GOV` or `AST`), not a blocker to continuing the review.

### IAM — Identity and access

- Is MFA enabled, and is it actually enforced, not just available?
- How are privileged/admin accounts separated from everyday accounts?
- Is there a joiners/movers/leavers process, even an informal one? Are there stale accounts for people who've left?
- How are passwords managed: personal habits, an organisational password manager, or nothing?
- Are passkeys or other modern authentication in use where appropriate, without treating their absence alone as a finding?
- Are service accounts (used by systems, not people) inventoried and are their credentials handled sensibly?
- Is access granted on a least-privilege basis, or does everyone effectively have access to everything?

### MAIL — Email and collaboration security

- Is MFA enforced specifically for email/collaboration platform access?
- SPF, DKIM, and DMARC: present, and DMARC's policy setting (`p=none` is materially weaker than `p=quarantine` or `p=reject`).
- Is legacy authentication (protocols that bypass modern MFA) disabled?
- Are external mail forwarding rules reviewed for signs of mailbox compromise?
- What anti-phishing/anti-spoofing protection exists, and is it configured, not just licensed?
- Is external sharing/guest access in the collaboration platform (M365, Google Workspace) sensibly scoped?
- What controls exist against invoice fraud specifically (verification steps for changed bank details, payment approval processes)?

### END — Endpoint security

- What operating systems are in use, and are any unsupported/end-of-life?
- Patch cadence: is there one, and is it actually followed?
- Endpoint protection: present, enabled, updated, and — where the business has the capability — centrally managed and actually producing visible alerts. The presence of a named product (including Microsoft Defender) is never treated as sufficient on its own; what matters is whether it's configured, current, and someone would notice if it fired.
- Device encryption, especially for laptops that leave the office.
- Local administrator rights: who has them, and why.
- Mobile devices and BYOD: any minimum standard applied (screen lock, remote wipe capability) for devices that touch business data.

### VUL — Vulnerability and patch management

- Operating system and application patch practices, across servers, endpoints, and any self-managed infrastructure.
- Firmware and network-device patching, often overlooked entirely.
- Any platforms genuinely unsupported by their vendor.
- How remediation is tracked once an issue is known — is anything actually followed up, or does it stay a one-off finding?

This domain is about *practices*, not active scanning. Pharos does not scan production systems as part of a standard review; see `03_Services/service-boundaries.md`.

### BAK — Backup and recovery

The central question is not "do backups exist" but **"can this business actually restore what it needs after a destructive incident?"** — treat "3-2-1" as a starting heuristic, not the assessment itself.

- What is actually backed up, and, just as importantly, what isn't (SaaS/cloud data is very commonly missed).
- Retention: how far back can the business go if it needs to?
- Isolation: are backups reachable by the same compromised account or admin session that could destroy production data? Immutability, where the platform supports it and the risk warrants it.
- Administrative separation: does whoever can delete production data also control the backups?
- Recovery testing: has a restore actually been performed and confirmed intact, or is this untested?
- Whose job is recovery: the business, the MSP, or a SaaS vendor's own (often limited) retention window?
- Recovery objectives: does anyone know how long a restore would realistically take, and whether that's tolerable?
- Specifically: could this business recover from a ransomware event or a compromised admin account, given who controls the backup itself?

### EXT — External exposure

Independent technical evidence about what the business exposes to the internet, gathered without becoming an intrusive test. See `03_Services/exposure-snapshot.md` for the standalone service version of this domain.

- Domain and DNS configuration; certificate status.
- Mail authentication (cross-references `MAIL`).
- Exposed services and internet-facing infrastructure — **passive identification only**, never active probing of the client's own systems without separate written authorisation and a defined scope.
- Remote access exposure: VPN portals, RDP, and similar, and whether they look adequately protected from what's externally visible.
- Known technologies in use, inferred from public signals.
- Credential exposure, checked only against lawful, reputable breach-data sources.
- Public organisational information relevant to impersonation risk (for example, how easily an attacker could build a convincing fake invoice or a spoofed executive email using public information).
- Exposed cloud storage or misconfigured public-facing SaaS.

**Passive versus active, stated plainly for every engagement:** passive activities (DNS lookups, certificate inspection, public OSINT, checking known breach-data sources) require no special authorisation beyond the standard engagement agreement. Anything active (attempting to interact with, log into, or test a client's systems) is out of scope for a standard review and requires a separate, explicitly authorised, and separately scoped engagement — which Pharos does not currently offer; see `03_Services/service-boundaries.md`.

### DET — Detection and logging

Scoped to what's realistic for an SME, not an enterprise SOC assumption. **A SIEM is never assumed or implied as necessary.**

- Is audit logging enabled where the platform provides it for free (Microsoft 365, Google Workspace both have meaningful built-in options)?
- Are built-in security alerts (Microsoft/Google security centre, endpoint protection alerts) actually reaching someone, or firing into a void?
- Privileged-account activity: would anyone notice an unexpected admin action?
- Retention: how long do logs actually persist on the current plan/tier?
- Alert ownership: if something did fire, whose job is it to look at it — the business, the MSP, nobody?
- Where an MSP provides monitoring, what specifically is monitored and what isn't (cross-references `TPR`).
- Would unusual account behaviour (a login from an unexpected location, a sudden mass file download) actually be noticed by anyone, today?

### IR — Incident readiness

Assessed here as *current state*, feeding into (not duplicating) the dedicated Incident Readiness service and its templates.

- Does a written incident plan exist, and has anyone looked at it in the last year?
- Are emergency contacts (MSP, insurer, lawyer, bank) documented and current?
- Is it clear who has decision authority during an incident?
- Containment basics: would staff know to disconnect a device, or who to call, in the first hour?
- Does the plan link to backup recovery and business continuity, or exist in isolation?
- Communications: is there any plan for what gets said to staff, customers, or the public?
- Evidence preservation: would anything be accidentally destroyed in a well-meaning attempt to "just fix it"?
- Has the plan ever been tested, even informally (a tabletop exercise, a walk-through)?

See `03_Services/incident-readiness.md` and `05_Client_Templates/incident-readiness-plan-template.md` for the deliverables this domain feeds into.

### AWR — People and security awareness

- Do staff receive any phishing/security awareness training, and how often?
- Is there an onboarding step that covers security basics for new starters?
- Do people know how, and feel safe, to report something suspicious? (The blame-free reporting culture already established across Pharos's people-risk material is assumed and reinforced here, not re-litigated.)
- What financial fraud controls exist specifically (payment verification, executive-impersonation awareness)?
- General password behaviour, observed rather than assumed.
- A general sense of security culture: is it something people think about, or something that exists only on paper?

### TPR — Suppliers and MSPs

One of Pharos's most important domains, because it's where the gap between *"our IT provider looks after it"* and *"we understand exactly which security responsibilities our provider performs, and which remain ours"* actually gets tested. See `05_Client_Templates/msp-responsibility-matrix-template.md` for the artefact this domain produces.

- Which providers have privileged access to the business's systems, and what can they actually do with it?
- What does the contract actually say about security responsibilities, versus what's assumed?
- Escalation paths: who does the business call, and does the provider have a documented one back?
- Who owns backups: configuring them, monitoring them, testing restores?
- Who owns monitoring and alert response, concretely (cross-references `DET`)?
- Who's responsible for incident response, and is that written down anywhere?
- Offboarding: when the business changes providers, or a staff member leaves, who actually disables access?
- How does the provider handle the business's data, and where does it live?
- What assurance has the provider actually given (a compliance certificate, a security policy, or just a verbal assumption)?

**Every "unclear" answer in this domain is itself a finding**, not a gap in the assessment. Ambiguous ownership is often the single most valuable thing a review surfaces.

### PRIV — Privacy baseline

Covered in full in `nz-privacy-baseline.md`, referenced here as the thirteenth domain for finding-ID and scorecard consistency. Operational review only; Pharos never provides legal advice on Privacy Act obligations. See that document for the complete domain detail, including IPP 3A.

## How the domains map to the existing review scope

`03_Services/independent-security-review.md`'s 19-area scope list and "seven questions" report framework are retained in full; the thirteen domains above are simply the structured version of that same scope, organised for finding IDs and for the scorecard rather than left as a flat list. Nothing in the original service definition needs to change: this methodology is what a reviewer works from during the engagement; the service file remains the client/sales-facing description of what's included.

## Assessment workflow

This expands the "Data/information gathering" through "Draft/findings review" stages of `delivery-workflow.md`'s generic seven-stage lifecycle into the specific steps of a full Security Posture Review. It does not replace `delivery-workflow.md`, `discovery-call-process.md`, `client-intake-process.md`, or `proposal-process.md` — those already cover qualification, scoping, and proposal in detail and are cross-referenced, not duplicated, below.

| Stage | What happens | Existing SOP it draws on |
|---|---|---|
| 1. Qualification | Initial conversation, fit check | `04_Operating_Manual/client-intake-process.md`, `discovery-call-process.md` |
| 2. Scope and engagement agreement | Priced proposal, agreed scope, boundaries stated | `04_Operating_Manual/proposal-process.md` |
| 3. Pre-assessment questionnaire | Client completes intake instrument | `05_Client_Templates/discovery-questionnaire.md` |
| 4. Evidence/document request | Ask for what's needed ahead of the discovery meeting (policies, prior reports, admin-centre access arrangements) | New: see the evidence-request note in `05_Client_Templates/discovery-questionnaire.md`'s companion use |
| 5. Discovery meeting | Structured interview against the thirteen domains | This document |
| 6. Technical and external assessment | Exposure Snapshot-style passive checks, screen-share/read-only admin review where agreed | `03_Services/exposure-snapshot.md`, this document's `EXT` domain |
| 7. Evidence validation | Confirm evidence actually supports what it's being cited for; resolve conflicting information | `evidence-standard.md` |
| 8. Finding development | Draft findings against the finding data model, each with a stable ID | `evidence-standard.md` |
| 9. Risk and priority review | Assign risk rating, priority, effort, and cost to each finding | `risk-and-priority-methodology.md` |
| 10. Draft report | Assemble the layered report | `reporting-standards.md`, `05_Client_Templates/security-posture-review-report-template.md` |
| 11. Internal QA | Mandatory pre-send check, no exceptions | `quality-checklist.md` |
| 12. Client readout | Walkthrough call, findings discussed before the plan is finalised | `delivery-workflow.md` |
| 13. 90-day plan | Convert findings into a sequenced plan | `remediation-and-verification.md` |
| 14. Remediation support | Help the business and its IT provider work through the plan | `03_Services/secure-foundations.md` |
| 15. Follow-up verification | Evidence-based check that remediated findings were actually fixed | `remediation-and-verification.md` |

Entry/exit criteria for each stage follow the same discipline already established in `delivery-workflow.md`'s "no exceptions, even under time pressure" QA gate: a stage isn't complete because time has passed, it's complete because its actual output exists (a signed proposal, a completed questionnaire, a drafted finding with a citation, a QA sign-off).

## Testing this methodology

`09-project-management/methodology-test-scenario-synthetic.md` runs a fictitious SME through every stage and domain above, to check the methodology actually produces sensible, usable output before it's used on a real client.
