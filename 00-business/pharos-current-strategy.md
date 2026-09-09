---
title: Pharos Current Strategy (canonical)
status: approved
owner: Jason Hill
last-reviewed: 2026-09-09
review-cycle: update immediately whenever a strategy, pricing, service, or ICP decision changes; review formally at each 30/90-day checkpoint
---

# Pharos Current Strategy

This is the single canonical answer to "what is Pharos doing right now, and why." Where any other document in this repository disagrees with this one, **this document wins**; the other document is either wrong, stale, or describes something intentionally deferred. Update this file the moment a real decision changes, rather than letting drift accumulate again.

This supersedes, for strategy/positioning/service/pricing purposes, the framing (not necessarily every sentence) of: `02_Business_Strategy/business-overview.md`, `target-market.md`, `customer-profiles.md`, `90-day-launch-plan.md`, `09-project-management/current-sprint.md`, `milestones.md`, and `10_Admin/next-actions.md`. Those files are being brought into line with this one (see each file's own superseded-notice banner) rather than deleted, because their detail (SOPs, checklists, sourcing) is still useful.

## Why this document exists (2026-09-09 pivot)

Pharos has substantial business design, brand, service, and tooling work, and comparatively little evidence that a real business will pay for it. The next phase is **commercial validation, not further construction.** The test for every piece of work from here is:

> Does this improve our ability to learn whether a real customer will pay Pharos? If not, is it necessary to safely deliver work after someone pays? If the answer to both is no, it doesn't happen right now.

## Validation status

**Not yet validated.** Zero paying clients. Zero proposals sent. The business is still legally, contractually, and commercially not ready to take payment for client work (see "What's actually blocking a paying client" below) — that has not changed as of this pivot, and this strategy document does not change it. What has changed is the focus of effort: everything below is aimed at proving demand and pricing through real conversations, in parallel with closing the remaining legal/insurance blockers, rather than continuing to expand the service catalogue, the agent roster, or the website.

## Current ICP (initial validation beachhead)

**New Zealand professional-services businesses, roughly 15 to 50 staff, on Microsoft 365 (or Google Workspace), using an outsourced MSP or IT provider, handling valuable transactions, customer information, or other confidential business information, with no internal security specialist.**

Priority sectors to approach first: accounting, bookkeeping, payroll, legal, property-related professional services (conveyancing, valuation, property management), engineering and technical consultancies, and other financially-sensitive professional-services businesses. These are chosen because they combine real consequence (client money, confidential records, professional reputational risk) with a buyer who already takes "independent review" as a normal professional concept (they get audited, reviewed, and insured routinely in their own work).

This is a **beachhead for testing, not a permanent exclusion list.** Nothing below is closed off forever:

- **Deprioritised for now, not excluded:** very small retail, hospitality, and trades businesses, unless a strong specific trigger exists (a near-miss, an insurer requirement, a customer questionnaire). Previously the broader 5 to 50 (and earlier 5 to 100) target list; the wider range remains a plausible later market once the beachhead is proven.
- **Deliberately not a target for this beachhead:** healthcare and allied health. The existing privacy work (`04_Operating_Manual/nz-privacy-baseline.md`, `nz-guidance-mapping.md`) is a reasonable general Privacy Act baseline, but health information carries materially higher sensitivity and sector-specific expectations than this beachhead needs to prove first. Revisit only if a specific health-sector opportunity arises and the safeguards genuinely support it, not as a default expansion.

Likely buyers: owner, managing director, general manager, operations manager, finance leader (CFO/finance manager), director, or partner (in a professional-services firm's own sense of "partner"). Speak to this person, not a security practitioner. See "Copy and tone rules" below.

## Positioning (unchanged in substance, now sharpened by the ICP)

The existing positioning work in `01_Brand/positioning.md` already states this correctly and should not be rewritten from scratch:

> Your IT provider manages your technology. Pharos helps you know whether your security is good enough.

And the core proposition:

> Independent security assurance that works with your existing IT provider.

**Do not** frame Pharos as "the company that checks whether your MSP is doing its job" or "the independent expert you hire because your MSP can't be trusted." That creates unnecessary conflict and, per `02_Business_Strategy/competitor-positioning.md`, actively works against MSPs becoming a referral channel. The working explanation, already close to what's live on the `/it-provider-security-assurance` page, is:

> Your IT provider's primary job is to operate and support your technology. Pharos independently reviews the security picture from a business-risk perspective, identifies and prioritises the gaps that actually matter, works with your IT provider on remediation where appropriate, and can independently verify that the important issues have actually been addressed.

## Core customer problem (lead with this, not generic threat awareness)

Do not lead with "cyber threats are increasing," "SMEs need better security," or similar generic awareness messaging. It creates awareness, not purchase urgency. Lead with:

> You already have IT support. Do you independently know whether the security protecting your business is actually appropriate?

Supporting questions Pharos exists to help answer: Are we adequately protected? What are our most important security weaknesses? Is our MSP covering what we assume it's covering? What should we fix first? Are our Microsoft 365 security arrangements appropriate? Could invoice fraud or account compromise materially affect us? Could we recover if something serious happened? Are we meeting customer or insurance security expectations? Which improvements are genuinely worth paying for? After our IT provider makes changes, how do we know the important issues were actually addressed?

## Founder credibility (what's true, stated calmly)

Jason Hill: 26 years working in IT, roughly 15 of them substantially focused on cyber security and security operations, most recently heading security operations at timbre Digital (investigating and managing incidents across SIEM, EDR, endpoint, network, email, identity, and cloud platforms). Daily, hands-on exposure to phishing, malicious email, endpoint threats, malware, account-compromise attempts, and suspicious activity, and to what actually happens when a control fails, not a theoretical version of it. Technical training through SANS, Palo Alto Networks, and Splunk; a genuine interest in OSINT, including volunteering with Trace Labs on missing-persons search research.

Tone: **not** "I have seen things you wouldn't believe." **Yes:** "Cyber incidents aren't theoretical to me. I've spent years working around the systems, alerts, investigations, and real-world attempts that organisations face every day." Calm, credible, specific, no exaggeration beyond what's stated here. See `06_Sales_and_Marketing/about-page-copy.md` for the full existing bio (already built to this standard on 2026-08-24; this pivot's only change is the corrected 26/15-year figures and the explicit tone instruction above) and the founder-identity memory this AI has stored.

## Active service offering (see `03_Services/service-catalogue.md` for full detail and categorisation)

**One core paid service, sold two ways, plus one lighter follow-on.** Everything else in the existing seven-service catalogue is retained (not deleted) but is BUILD LATER or a supporting feature, not something actively pitched as a separate flagship during validation. Full ACTIVE NOW / SUPPORTING FEATURE / BUILD LATER / REMOVE categorisation lives in the service catalogue; summary:

1. **Independent Security Review** (core paid service, kept under its existing confirmed name — see "Naming decisions" below). Answers: how well protected is this business, what actually matters, and what should happen next. Scope is already right-sized (see the existing file); this pivot does not change its technical scope, only reconfirms it as the single thing Pharos actively sells right now, and tightens the report's action-grouping (by management / IT provider / specialist referral) so it lands as genuinely actionable rather than a flat findings list.
2. **IT Provider Security Assurance** is the *same underlying review*, entered through a different trigger ("our MSP says we're covered, how would we know?"). It keeps its own page and sales copy because that trigger is real and common, but it is not a second flagship with separate pricing logic — it's an entry angle into service #1.
3. **Remediation Assurance** (new, lighter follow-on — see `03_Services/remediation-assurance.md`). After the review, convert findings into work packages, work constructively with the client's MSP, review evidence of remediation, retest what matters, and report an updated status. Explicitly advisory/assurance, not Pharos performing production changes.
4. **Exposure Snapshot** (free, automated, already built) and the website's short conversation-intake form remain the free entry points / lead qualifiers. Framed plainly as an outside-in snapshot of publicly observable exposure, not a determination that the business is secure — this framing is already correctly in place in `03_Services/exposure-snapshot.md` and the live tool; no change needed there beyond a status label.
5. **Free Security Health Check** stays defined but **unbuilt during validation** (see Build Now/Later below) — the Exposure Snapshot plus the intake form already give enough free-entry capacity to test demand without building a second self-serve tool.
6. **Secure Foundations, Incident Readiness, Security Adviser** remain fully valid, well-designed services, marked BUILD LATER: real, not thrown away, not actively pitched cold. Security Adviser in particular should only ever be an upsell after Pharos has demonstrated value on a review, never the primary cold-sale proposition. Incident Readiness works better, for now, as content inside the core review (readiness is one of the review's scope areas) or a specific event-triggered follow-on, not a standalone acquisition product.

## Naming decisions made in this pass (and why)

- **Core service keeps the name "Independent Security Review"**, not renamed to a new "Pharos Security Review." The 2026-08-22 rename from "Cyber Risk Review" to "Independent Security Review" already did the useful work (states the value proposition in the name) and is validated against market pricing. Renaming again, with no commercial evidence forcing it, would be exactly the kind of low-value internal churn this pivot is supposed to stop, and a name close to "Pharos Security Posture Review" (the confirmed *report* name) would blur two already-distinct things. If real prospect conversations surface that the name itself is a problem, that's a founder decision to revisit with evidence, not something to pre-empt now.
- **"Remediation Assurance" is a new, lighter service, not a rename of Secure Foundations.** Secure Foundations already does most of what a "Remediation Assurance" concept describes, but it's scoped as a 10 to 13 hour, $2,000 to $5,000 coordination period, which is a second full engagement, not a lightweight "did the important things actually get fixed" check-in. Remediation Assurance is deliberately smaller and cheaper, positioned as the natural next paid step after the core review; Secure Foundations stays available for a client who wants the fuller coordination engagement, marked BUILD LATER as an upsell once demand is proven.

## Pricing (reconciled, not overwritten — see `02_Business_Strategy/pricing-strategy.md` and the new `10_Admin/delivery-economics-tracker.csv`)

The existing $1,800 to $4,200 range for the Independent Security Review was validated in July 2026 against published NZ/AU/UK market data and should not be discarded. This pivot sets a **founder-directed active pricing hypothesis** to test against real conversations, which runs slightly higher than that validated range's midpoint. Both figures are kept on record; the gap itself is something to learn from, not a contradiction to hide.

| Tier | Price (NZD excl. GST) | When to use it |
|---|---|---|
| **Paid pilot** | $1,500 to $2,500 | First 3 to 5 reference customers only. The discount buys something concrete: structured feedback, a testimonial if deserved, and reference/case-study permission where appropriate. Never delivered free, and never routinely extended past the first handful of clients. |
| **Standard** | $2,500 to $5,000 | Every core review after the pilot cohort, scaled by business size and complexity. Sits above the previously-validated $1,800 to $4,200 range; treat this gap as an open pricing assumption to test (see the assumption register), not a settled fact. |

Remediation Assurance pricing (new, lighter than Secure Foundations): working hypothesis **$750 to $1,500**, scoped by the number of findings being verified; refine once real delivery time exists.

**Economic target:** a realised effective delivery rate eventually exceeding roughly $180 to $200/hour, preferably $200 to $250+/hour. At the estimated 7.5 to 10.5 hours per Independent Security Review, standard pricing clears this comfortably ($238 to $667/hr); pilot pricing may sit below it for the first few clients ($143 to $333/hr) deliberately, in exchange for what the discount buys. Do not publish an hourly rate anywhere client-facing. Track actual hours per engagement in `10_Admin/delivery-economics-tracker.csv` from the very first paid engagement, so underpriced custom work becomes visible early rather than discovered a year in.

## Acquisition hypothesis and the 30/90-day plan

See `09-project-management/pharos-assumption-register.md` for the full assumption list and `09-project-management/validation-checkpoints.md` for objective double-down/adjust/stop thresholds. Summary targets:

- **30 days:** 15 to 20 genuine target-buyer conversations, roughly 10 MSP/IT-consultant/accountant/broker conversations, at least 3 paid pilot customers (not free assessments).
- **90 days:** 3 to 5+ paid customers total, cumulative revenue roughly $7,500 to $15,000+, at least one referral, at least one follow-on sale, proposal win rate trending toward 30% once there's enough sample to mean anything.

## What's actually blocking a paying client (unchanged by this pivot, still real)

Per `09-project-management/decisions-required.md` question 5 and `00-business/decisions.md`: professional indemnity + public liability insurance is not bound, no lawyer-reviewed Terms of Engagement exists, no business structure is registered, and the domain is not registered. **This pivot does not remove that gate.** Customer-discovery conversations (the 15 to 20 buyer conversations, the MSP conversations) do not require insurance or a signed contract to happen safely; taking money for a paid pilot engagement does. Sequence accordingly: talk to real prospects now, close the legal/insurance gate before the first invoice, not after.

## Build Now / Build Later / Do Manually / Stop

See `09-project-management/build-now-later-stop.md` for the full audited list. In short: nothing gets built right now except what a real paying engagement requires to run safely (scope, methodology, report template, a proposal/ToE, data handling, the website as it stands, the intake form, pricing, a plain tracker, the MSP referral pitch, and the insurance/legal basics). Everything else that looked like a good idea in the last few months (further agent specifications, additional exposure-scanning capability, a client portal, further service design, the folder-taxonomy migration, the remaining service-name rename across ~35 files) is explicitly paused, not deleted, until real demand or real delivery volume justifies the effort.

## Brand name due diligence (open task, not yet done)

"Pharos Security" has not been checked against NZ Companies Office / NZBN name availability, IPONZ trademark registers, domain availability beyond the placeholder, or existing international companies using the same or a confusingly similar name. This is a real risk (other cyber security firms internationally use "Pharos" in their name) and needs proper verification, not an AI-generated legal conclusion. Tracked as a specific action in `10_Admin/next-actions.md`; do not rename the business pre-emptively based on this document alone.

## Copy and tone rules (apply everywhere: website, proposals, sales material)

No em dashes. Write to a business owner, managing director, GM, operations manager, finance leader, director, or partner, never assuming they already understand security terminology. Avoid generic threat-awareness openers and avoid: navigate the evolving landscape, ever-evolving, robust, empower, leverage, unlock, seamless, cutting-edge, holistic, game-changing, tailored solutions, digital transformation, cyber resilience journey, "threat landscape is constantly evolving," and (per the existing brand voice, already in place) hacker, military-grade, bulletproof, revolutionary, world-class, best-in-class. No manufactured urgency, no fear-based framing, no certainty the work can't actually provide ("guarantee," "100% secure," "unhackable"). Short, confident sentences; calm, not casual.

## Related documents

- `03_Services/service-catalogue.md` — full ACTIVE NOW / SUPPORTING FEATURE / BUILD LATER / REMOVE categorisation
- `03_Services/remediation-assurance.md` — new follow-on service definition
- `02_Business_Strategy/pricing-strategy.md` — full pricing detail and market validation
- `10_Admin/delivery-economics-tracker.csv` — per-engagement hours/margin tracker
- `10_Admin/commercial-validation-tracker.csv` — pipeline tracker
- `09-project-management/pharos-assumption-register.md` — living assumption register
- `09-project-management/validation-checkpoints.md` — 30/90-day double-down/adjust/stop criteria
- `09-project-management/build-now-later-stop.md` — full project prioritisation audit
- `06_Sales_and_Marketing/validation-outreach-kit.md` — buyer intro, warm-intro ask, MSP partner pitch, triggered outreach
- `00-business/decisions.md` — full decision history (unchanged entries below this pivot remain valid; this pivot is logged there too)
