---
title: Evidence Standard
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or when the finding data model changes
---

# Evidence Standard

This document extends the four verification levels already defined in `pharos-security-baseline.md` into a full evidence model: what counts as evidence, how confident a finding can be, what a finding actually contains internally, and how findings are identified so they survive from assessment through to a follow-up review years later.

It governs every Pharos assessment and every AI-assisted drafting step behind one. See `03-agents/agent-standard.md` for how these rules bind AI agents specifically.

## The rule behind this document

**No evidence, no confirmed finding.** A finding that cannot point to something that was said, shown, seen, or tested is not a finding yet. It is, at most, a question to ask, or an assumption to flag. This applies equally to a human consultant working from notes and to any AI assistance used to draft findings.

## Evidence types

Six evidence types, more granular internally than the four client-facing verification levels, because the internal record should be richer than what a client reads. Every finding is tagged with exactly one evidence type as its primary source; a finding can cite more than one piece of evidence, but the type recorded is the strongest one actually available.

| Evidence type | Definition | Example |
|---|---|---|
| **Client-stated** | The client said or wrote something, with nothing further seen. | "The office manager says backups run nightly." |
| **Documentary** | A document, export, screenshot, or contract the client provided demonstrates the control, without Pharos having seen the live configuration. | "The MSP's monthly report shows a backup completion log." |
| **Configuration observed** | Pharos directly saw the relevant configuration, screen, or setting during the engagement. | "MFA enforcement policy sighted in the Microsoft 365 admin centre during the review session." |
| **Technical test** | Pharos performed an authorised check itself, beyond simply observing a stated configuration. | "A test restore was performed and the recovered file confirmed intact." |
| **External observation** | Passive or authorised external investigation, not reliant on client-provided access. | "SPF record for the domain resolved and checked directly via public DNS." |
| **Inferred** | A reasonable conclusion drawn from available evidence, but not itself directly verified. | "No password policy was sighted or mentioned; industry-typical default settings are assumed to still apply unless stated otherwise." |

**Client-facing verification levels** (from `pharos-security-baseline.md`: self-reported, documented, observed, verified) remain the language clients see in reports, because four plain-English tiers communicate better than six technical ones. The mapping is direct: client-stated → self-reported; documentary → documented; configuration observed and external observation → observed; technical test → verified; inferred is disclosed in the finding's interpretation text rather than given its own client-facing label, since "inferred" without context reads as a guess rather than a disciplined judgement call.

"Verified" stays narrow, as the baseline document already insists: an assessment that only ever reaches "observed" for most findings should say so rather than stretch the label.

## Confidence versus risk versus maturity

These three concepts are kept separate on purpose, because collapsing them produces reports that either overstate certainty or understate risk.

- **Risk** is how much a finding matters to the business if it stays unaddressed. See `risk-and-priority-methodology.md`.
- **Confidence** is how sure Pharos is that the finding is accurate, independent of how severe it would be if true.
- **Maturity** (used only where relevant, e.g. a domain-level scorecard) is how developed a control or practice is, not how urgent fixing it is.

A finding can combine these in ways that are all individually coherent:

- **Risk: High, Confidence: High** — a clearly significant gap, directly observed. The default combination for most findings.
- **Risk: High, Confidence: Medium** — a likely significant weakness where direct configuration access wasn't available; for example, a client describes a practice that, if accurately described, would be a serious gap, but Pharos could not independently confirm it.
- **Risk: Low, Confidence: High** — a minor, clearly confirmed issue. Still worth recording, not worth much airtime.

Confidence is assessed per finding, using three levels:

| Confidence | Meaning |
|---|---|
| **High** | Evidence type is configuration observed, technical test, or external observation, and there's no reason to doubt it reflects current reality. |
| **Medium** | Evidence type is documentary or client-stated, from a source with no obvious reason to be wrong, or partial direct observation exists but doesn't cover the full claim. |
| **Low** | Evidence type is client-stated from an uncertain source, inferred, or conflicting information was received. |

Confidence is never inferred automatically from evidence type alone (a documentary source could still be very reliable; a directly observed configuration could still be a point-in-time snapshot that's since changed) — it's a judgement call the assessor records deliberately, same as the finding itself.

## The finding data model

The internal record for every finding is richer than what appears in a client report. Not every field below belongs in client-facing material; see `reporting-standards.md` for what surfaces where.

| Field | Purpose |
|---|---|
| Finding ID | Stable identifier, domain-prefixed. See below. |
| Domain | Which of the thirteen assessment domains this belongs to. See `assessment-methodology.md`. |
| Title | Short, plain-English name for the finding. |
| Observation | What was actually seen, said, or tested. |
| Evidence | The evidence type and a specific citation (which screenshot, which questionnaire answer, which test). |
| Affected system/process | What this actually touches in the client's environment. |
| Business context | Why this matters given how this specific business operates, not a generic statement. |
| Threat scenario | What could plausibly happen because of this gap. |
| Potential consequence | The realistic business impact if the threat scenario occurred. |
| Likelihood | Input to the risk rating; see `risk-and-priority-methodology.md`. |
| Impact | Input to the risk rating. |
| Risk rating | Critical / High / Moderate / Low / Informational. |
| Confidence | High / Medium / Low, as above. |
| Recommendation | What should be done. |
| Priority | Now / Next / Later / Monitor, per `reporting-standards.md`. |
| Remediation effort | Very Low / Low / Moderate / Significant. |
| Likely cost category | None (existing capability) / Low / Moderate / Significant / Unknown, requires quote. |
| Owner | Who should act: the business, the IT provider/MSP, a named specialist, or Pharos (advisory support only). |
| Target completion | A realistic date or window, not always "immediately." |
| Dependencies | Anything this needs to happen first. |
| Verification method | How completion will actually be confirmed later, not just asked about. See `remediation-and-verification.md`. |
| Source/reference | Which NZ guidance or control this maps to, if any. See `nz-guidance-mapping.md`. |
| NCSC mapping | The relevant Minimum Cyber Security Standard(s), where applicable. |
| Privacy Act/IPP mapping | Where relevant, per `nz-privacy-baseline.md`. |
| Status | Open / In progress / Blocked / Remediated (unverified) / Verified complete / Risk accepted. |
| Notes | Anything else worth recording. |

Client-facing reports present a deliberately reduced view of this: observation (in plain language), why it matters, priority, and recommendation, per the existing `reporting-standards.md` findings-table format, now joined by the risk rating and finding ID. The full internal record supports the Management Action Register and any future follow-up review, without cluttering the client's copy.

## Finding identifiers

Every finding gets a stable ID at the point it's first recorded, in the form `[DOMAIN]-[NN]`, for example `IAM-03` or `PRIV-01`. IDs never get reused within an engagement, even if a finding is later merged or withdrawn — a withdrawn finding keeps its ID and gets a status note explaining why, rather than leaving a silent gap that looks like an error.

Domain prefixes, matching the thirteen domains in `assessment-methodology.md`:

| Prefix | Domain |
|---|---|
| `GOV` | Governance and risk |
| `AST` | Asset awareness |
| `IAM` | Identity and access |
| `MAIL` | Email and collaboration security |
| `END` | Endpoint security |
| `VUL` | Vulnerability and patch management |
| `BAK` | Backup and recovery |
| `EXT` | External exposure |
| `DET` | Detection and logging |
| `IR` | Incident readiness |
| `AWR` | People and security awareness |
| `TPR` | Suppliers and MSPs |
| `PRIV` | Privacy baseline |

IDs stay identical across the assessment worksheet, the client report, the Management Action Register, and any follow-up review. If a follow-up review finds a new instance of a previously-closed issue, it gets a new ID (for example `IAM-07` following an earlier `IAM-03`), with a note cross-referencing the earlier finding — this keeps the history honest rather than reopening or renumbering old records.

## AI-assisted evidence discipline

Where AI assistance is used to draft or organise findings (see `agent-standard.md`), the same rule applies without exception: a draft finding must cite its evidence, and where evidence is incomplete, it must be marked accordingly using the finding-status vocabulary (unverified, inferred, client-stated, requires validation), not silently upgraded to a stronger status. AI drafting never changes a finding's evidence type or confidence level from what a human reviewer set; it may only propose one, flagged as a proposal, for the reviewer to accept or change.
