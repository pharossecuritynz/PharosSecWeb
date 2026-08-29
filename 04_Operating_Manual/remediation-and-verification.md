---
title: Remediation and Verification
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or when the finding data model changes
---

# Remediation and Verification

This document covers the two things that happen after a report is delivered: turning findings into a plan the business can actually work through, and later confirming, with evidence, that the plan was actually followed. Neither existed as a structured process before this pass — remediation planning existed informally (Now/Next/Later, revisited "in 6 to 12 months"), and follow-up had no defined method at all.

## The 90-day improvement plan

For the flagship Security Posture Review, findings convert into a sequenced plan across four phases, ruthlessly prioritised rather than exhaustive — a small business overwhelmed by forty simultaneous actions will complete none of them well.

| Phase | Window | Focus |
|---|---|---|
| **First 14 days** | 0–14 days | Urgent actions and genuine quick wins: anything Critical, plus anything cheap, fast, and high-value regardless of its risk rating (see the strongest-recommendations principle in `risk-and-priority-methodology.md`). |
| **Days 15–30** | 15–30 days | High-value foundational improvements that need a bit more coordination but shouldn't wait. |
| **Days 31–60** | 31–60 days | Process and resilience improvements: things that change how the business operates, not just a setting. |
| **Days 61–90** | 61–90 days | Maturity improvements and verification: closing out anything remaining, and formally checking what was actually completed. |

Each action in the plan carries: finding ID, action, owner, priority, effort, approximate cost, target date, dependencies, and completion evidence expected. This is the same finding data model from `evidence-standard.md`, filtered to what a client needs to track.

For simpler engagements (Secure Foundations, or a lighter Exposure Snapshot follow-up), the existing three-phase Now/Next/Later structure already used in `03_Services/secure-foundations.md` and `05_Client_Templates/security-uplift-plan-template.md` stays as-is — the four-phase structure above is specifically for the flagship review's higher volume of findings, not a mandatory replacement everywhere.

**The client-facing version of the plan** is `05_Client_Templates/client-action-plan-template.md`, extended with a finding-ID column so a client can trace any action back to the finding that produced it. It stays deliberately simple: a business owner should be able to track it without help.

## The Management Action Register

The Management Action Register (`04_Operating_Manual/management-action-register-template.md`) is the fuller, internal counterpart to the client action plan. Where the client plan answers "what do we need to do," the register answers "what's actually happened, with what evidence" — it's Pharos's own tracking instrument, shared with a client only where they specifically want that level of detail.

Statuses: **Not started**, **Planned**, **In progress**, **Blocked**, **Complete**, **Risk accepted**. "Complete" as reported by the client is distinct from "Verified complete" by Pharos — see below.

## Follow-up verification

A follow-up review does not simply ask "did you fix it?" It collects evidence, using the same evidence-type discipline as the original assessment (`evidence-standard.md`).

**Worked example:**

> **Original finding.** `IAM-03`: MFA not enforced for all user accounts.
> **Client says.** "Completed — MFA is on for everyone now."
> **Verification.** Pharos reviews the authentication policy configuration directly (or accepts equivalent evidence: a screenshot of the enforcement policy, an admin-centre export), rather than accepting the statement alone.
> **Status.** Verified complete. *(If the evidence didn't actually support full enforcement — say, three accounts were missed — the status would be "Remediated, partially verified," with the gap named specifically, not rounded up to "complete.")*

This mirrors the evidence-type hierarchy exactly: a client's report of completion is client-stated evidence, useful and recorded, but not the same status as something Pharos has directly observed or tested. The finding's status field (`evidence-standard.md`) carries this distinction through: **Remediated (unverified)** versus **Verified complete** are different statuses, not the same outcome described two ways.

Where a follow-up review finds a previously-closed issue has recurred, or a new instance of the same underlying gap has appeared, it gets a new finding ID with a note cross-referencing the original (see the finding-ID rules in `evidence-standard.md`) — this keeps the history honest rather than silently reopening or renumbering.

## When follow-up happens

Follow-up verification happens naturally at whichever of these comes first: a client-requested check-in, the annual mini risk review under a Security Adviser retainer, or the next full Independent Security Review. There is no separate, standalone "verification product" — it's a discipline applied within whichever engagement touches the business next, not a new service to sell.
