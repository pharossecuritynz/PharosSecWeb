---
title: Risk and Priority Methodology
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or when the finding data model changes
---

# Risk and Priority Methodology

Pharos already has a working priority scale (Now/Next/Later/Monitor, defined in `reporting-standards.md`) that tells a client when to act. What it doesn't have is a way to say how much a finding matters on its own terms, independent of how easy or hard it is to fix. This document adds that: a risk rating, kept deliberately separate from priority, plus the effort and cost categories that let the two be weighed against each other sensibly.

This does not replace the existing priority scale or introduce numeric scoring anywhere. `business-pitch.md` already states the working principle correctly: no unexplained jargon, no severity scores without context. A risk rating is a plain-English category with a defined meaning, not a number.

## Why risk and priority are not the same thing

Priority answers "when should this be actioned." Risk answers "how much does this matter." They usually move together, but not always, and the exceptions are exactly where a client needs Pharos's judgement most:

- **High risk, Next priority**: a genuinely significant gap where the fix is expensive or disruptive enough that "immediately" isn't realistic. Still flagged clearly as important, with a sensible timeframe.
- **Moderate risk, Now priority**: a real but moderate weakness where the fix is trivial and high-value enough that there's no reason to wait, even though the underlying risk wouldn't justify urgency on its own.
- **Low risk, Monitor priority**: worth recording so it isn't forgotten, not worth spending client attention or budget on yet.

Reporting only ever the priority (as today) risks a client fixing the ten easiest things and leaving the one hard, important thing for "later," indefinitely. Reporting only risk (with no sense of timing or effort) risks a wall of "High" findings that overwhelms a small business with no way to tell what to actually do this month. Both are needed, and they're recorded and shown separately.

## Risk rating

Five qualitative tiers, applied at the finding level and, where useful, rolled up to a domain level for the scorecard (`reporting-standards.md`).

| Rating | Operational meaning |
|---|---|
| **Critical** | A plausible path to serious, immediate business harm exists right now: for example, an internet-facing admin portal with no MFA, or backups that don't exist for a system the business could not operate without. Warrants direct, same-engagement flagging, not held for the written report. |
| **High** | A significant gap that a realistic, non-exotic threat could exploit or trigger, with meaningful business consequences (financial loss, extended outage, breach of client trust or contractual/insurance obligations). Most "the business should genuinely worry about this" findings land here. |
| **Moderate** | A real weakness, but one that requires a more specific or less likely set of circumstances to cause serious harm, or where the consequence itself is contained. Worth fixing in the normal course of business. |
| **Low** | A minor gap or a deviation from good practice with limited realistic consequence on its own. Often bundled together with other Low findings under one recommendation rather than reported individually. |
| **Informational** | Not a weakness as such — an observation worth recording (a configuration choice, a dependency, something to watch as the business changes) that doesn't call for action now. |

A rating is set by weighing, together, not mechanically scored from:

- the plausibility of a real threat exploiting this specific gap in this specific business
- how exposed the business actually is (public-facing versus internal-only, for example)
- likelihood, in plain terms: common and easy, versus rare and difficult
- business impact if it occurred: financial, operational, reputational, regulatory
- what controls already reduce the risk, even if imperfectly
- the organisation's own context: what it depends on, what it can't afford to lose

A "High" finding should mean the same thing across every Pharos engagement. If two findings both feel like "High" but one is clearly worse, that's a signal one of them is actually "Critical" or "Moderate," not that the scale needs a sixth tier.

## Priority (unchanged, restated for reference)

Priority stays exactly as defined in `reporting-standards.md`: **Now** (within 30 days, meaningful risk reduction for reasonably low effort), **Next** (within 90 days), **Later** (6 to 12 months), **Monitor** (not actionable yet, revisit at the next review). No change is made here; it's restated so this document and `reporting-standards.md` read consistently side by side.

## Effort and cost

Two more plain categories, so a client understands the practical burden of a recommendation, not just its urgency and importance.

**Effort**

| Level | Meaning |
|---|---|
| Very Low | Minutes to a couple of hours; usually a configuration change. |
| Low | A few hours to about a day; a small IT-provider task or a short internal process change. |
| Moderate | Several days, likely spanning more than one session with the IT provider or vendor. |
| Significant | A genuine project: budget approval, planning, and coordination across more than one party. |

**Cost category**

| Level | Meaning |
|---|---|
| None / existing capability | Achievable with what the business already has and pays for. |
| Low | A modest one-off or small recurring cost. |
| Moderate | A real budget line, likely needing sign-off. |
| Significant | A material investment; usually paired with Secure Foundations-style planning. |
| Unknown / requires quote | Pharos genuinely doesn't know without the business getting a specific quote (common for anything requiring a vendor or specialist). Never guessed at. |

Pharos does not claim to know exact implementation costs it hasn't seen evidence for. "Unknown, requires quote" is a legitimate, honestly-stated answer, not a gap in the report.

## The strongest recommendations, made visible

The combination Pharos should actively look for and foreground, because it's the best return on a small business's limited time and money, is **meaningful risk reduction, at Low or Very Low effort, at no or low cost**. The executive brief and top-five-actions section (see `reporting-standards.md`) should surface these first, even ahead of technically more severe findings that are expensive or slow to fix, because they're what a business can actually act on this week.

## Worked example

> **GOV-02.** No one has been given clear ownership of security decisions; it currently defaults to "whoever notices something first."
> **Risk: Moderate** (no single incident is likely to result directly from this, but it increases the chance that other findings go unaddressed).
> **Confidence: High** (directly discussed and confirmed in the discovery interview).
> **Priority: Now** (nothing to buy, nothing to build — just a decision).
> **Effort: Very Low. Cost: None.**
> **Why it's flagged prominently despite a Moderate risk rating:** it's one of the cheapest, fastest actions available, and several other findings in this report depend on someone actually owning follow-through.

This is the shape every high-value, low-effort recommendation should take: risk rating honestly stated on its own terms, priority and effort making clear why it's still worth doing first.
