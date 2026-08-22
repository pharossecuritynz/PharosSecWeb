---
title: Pharos Security Baseline
status: approved
owner: Oscar
last-reviewed: 2026-08-22
review-cycle: annually, or when a source framework issues a major revision
---

# Pharos Security Baseline

The internal methodology behind every Pharos assessment. Not invented doctrine: a transparent, cited synthesis of recognised frameworks, scaled to what a 5 to 50 staff New Zealand business can realistically act on. This document is for internal and technically-interested use. Client-facing material should describe it in plain language (see the summary line at the bottom) rather than naming frameworks and acronyms.

## Why a named baseline exists

Without one, every assessment risks being an informal checklist that varies by mood and memory. With one, every finding can be traced back to a recognised control, and every report can say, honestly, what it was measured against.

## Source frameworks

| Source | What it's used for | Reference |
|---|---|---|
| **CIS Critical Security Controls v8.1, Implementation Group 1 (IG1)** | The practical control baseline. IG1 is CIS's own "essential cyber hygiene" tier, explicitly designed for organisations with limited IT and security expertise defending against general, non-targeted attacks — which describes the great majority of Pharos clients. 56 safeguards. | [cisecurity.org/controls/implementation-groups/ig1](https://www.cisecurity.org/controls/implementation-groups/ig1) |
| **NIST Cybersecurity Framework 2.0** | Governance, risk, and organisational structure. Its six functions (Govern, Identify, Protect, Detect, Respond, Recover) give the Independent Security Review report its shape, independent of any specific control list. | [nist.gov/cyberframework](https://www.nist.gov/cyberframework) |
| **NIST CSF 2.0 Small Business Quick Start Guide (NIST SP 1300)** | Keeps the framework application scaled to small-business reality rather than enterprise assumptions. Published alongside CSF 2.0, February 2024. | [nist.gov/publications/nist-cybersecurity-framework-20-small-business-quick-start-guide](https://www.nist.gov/publications/nist-cybersecurity-framework-20-small-business-quick-start-guide) |
| **NCSC Cyber Security Framework (New Zealand)** | Keeps the methodology grounded in New Zealand context and language, and aligns Pharos reporting with the framework a NZ business's insurer, board, or bank is most likely to have already encountered. Functions broadly align with NIST CSF. | [ncsc.govt.nz/protect-your-organisation/ncsc-cyber-security-framework](https://www.ncsc.govt.nz/protect-your-organisation/ncsc-cyber-security-framework/) |
| **New Zealand Privacy Act 2020** | The security-safeguards obligation (personal information must be protected by reasonable security safeguards, scaled to business size and data sensitivity) is assessed as a practical, operational matter. Legal interpretation is explicitly out of scope; see the boundary below. | [privacy.org.nz/privacy-principles](https://www.privacy.org.nz/privacy-principles/) |

Note on incident reporting: CERT NZ has fully merged into the NCSC. Incidents are reported at [ncsc.govt.nz/report](https://www.ncsc.govt.nz/report) (0800 114 115), not a separate CERT NZ channel. Any Pharos material still referencing "CERT NZ" as a distinct body should be corrected.

## Client-facing description

Website and report copy should describe the methodology as:

> A practical security baseline for New Zealand small businesses, informed by recognised international security controls and New Zealand guidance.

Detailed report appendices can map specific findings back to the source frameworks above for a client, adviser, or insurer who wants that detail. The homepage and service pages should not.

## Verification levels

This is one of the more important disciplines in the baseline, because it stops a report from implying more certainty than the engagement actually produced. Every finding is labelled with exactly one of these four levels, defined precisely enough to be checked:

| Level | Definition | Example |
|---|---|---|
| **Self-reported** | The client states a control exists. Nothing further was seen. | "Client states backups run nightly." |
| **Documented** | A document or report the client provided demonstrates the control, but Pharos has not independently seen the live configuration. | "MSP's monthly report shows a backup completion log." |
| **Observed** | Pharos has directly seen the relevant configuration, screen, or evidence during the engagement. | "MFA enforcement policy sighted in the Microsoft 365 admin centre during the review session." |
| **Verified** | Pharos has performed an appropriate check itself, beyond simply observing a stated configuration. | "A test restore was performed and the recovered file confirmed intact." |

"Verified" is used narrowly. An assessment that only ever reaches "observed" for most findings, because deeper checks were out of scope or unavailable, should say so rather than stretch the label. Overusing "verified" is the fastest way to damage the credibility this whole standard exists to build.

## Evidence, interpretation, action

Every material finding in a Pharos report follows this structure. It is the same discipline behind the Signal Window visual concept (see `01_Brand/`) applied to writing.

1. **Evidence** — what was actually seen or stated, and at what verification level.
2. **Interpretation** — what that evidence means for the business, in plain language.
3. **Action** — what the client should do next.

Example:

> **Evidence.** Client states that backups run nightly. No restore test evidence was available. *(Self-reported.)*
> **Interpretation.** Backups appear to exist, but recoverability has not been demonstrated. A backup that can't be restored is not a working backup.
> **Action.** Perform and document a restoration test within 30 days.

## The eight-stage assessment lifecycle

1. **Understand** — business context: what the business does, what it depends on, who its customers and regulators are.
2. **Observe** — evidence collection against the baseline, labelled by verification level as it's gathered.
3. **Verify** — confirm the controls that matter most, where verification is within scope.
4. **Interpret** — translate findings into actual business risk, not technical severity alone.
5. **Prioritise** — weigh likelihood, business impact, cost, difficulty, dependencies, current exposure, available capability, and any regulatory or contractual pressure. See the 90-day plan structure in `05_Client_Templates/`.
6. **Plan** — turn the prioritised list into a realistic, sequenced set of actions.
7. **Support** — help the client and their IT provider work through the plan.
8. **Revisit** — verify progress, not just intent.

## Risk presentation

Findings are never reduced to a single overall percentage score in a client-facing review. A number like "Security Score: 72%" implies false precision and hides which findings are self-reported versus verified. Instead, reports present:

- maturity by area (identity, devices, backups, and so on)
- risk themes, in plain language
- verification level per finding
- priority (Now / Next / Later)
- business impact, not just technical severity

The Free Security Health Check is the one exception, and even there the output must distinguish self-reported input from anything independently checked (there is nothing independently checked in a self-serve questionnaire, so its output should read as indicative, not as a score with false authority).

## Boundary: privacy is assessed operationally, not legally

Pharos assesses whether sensible privacy-related security practices are in place (who has access to personal information, where it's stored, retention, breach procedures, staff awareness). Pharos does not provide legal advice on Privacy Act obligations, breach notification thresholds, or liability. Where legal interpretation is genuinely needed, the recommendation is to engage a suitable privacy or commercial lawyer. See `02_Business_Strategy/risk-boundaries.md`.
