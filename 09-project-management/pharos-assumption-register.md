---
title: Pharos Assumption Register
status: approved
owner: Jason Hill
last-reviewed: 2026-09-09
review-cycle: update after every batch of buyer/partner conversations, not just at the 30/90-day checkpoints
---

# Pharos Assumption Register

A living register of what Pharos currently believes but has not yet proven. Nothing here is marked validated without real evidence from an actual prospect, partner, or paid engagement; internal reasoning, market research, or AI-generated analysis is not evidence for this table. See `00-business/pharos-current-strategy.md` for the strategy these assumptions sit under, and `09-project-management/validation-checkpoints.md` for what the evidence should trigger.

| Assumption | Importance | Current evidence | Confidence | How to test | Pass condition | Failure condition | Status |
|---|---|---|---|---|---|---|---|
| Target SMEs will pay for independent security advice, separate from their MSP | Critical | Desk research only (market pricing data in `02_Business_Strategy/pricing-strategy.md`); zero real conversations | Low | 15–20 buyer conversations, tracked in `10_Admin/commercial-validation-tracker.csv` | Most conversations show genuine interest, not polite dismissal | Most say "our IT provider already covers this" and mean it | Untested |
| 15 to 50 staff, professional services, is a better initial beachhead than the broader 5 to 50 range | High | Reasoned choice (sensitivity of data, existing habit of external review in these sectors), no direct evidence | Low | Compare conversion and engagement quality between beachhead-sector and other conversations | Beachhead-sector conversations convert to proposals/paid work at a visibly higher rate | No meaningful difference, or the beachhead converts worse | Untested |
| MSPs will engage constructively rather than seeing Pharos as a threat | High | Positioning reasoning only (`01_Brand/positioning.md`, `02_Business_Strategy/competitor-positioning.md`); zero real MSP conversations | Low | 10 MSP/IT-consultant conversations using the pitch in `06_Sales_and_Marketing/validation-outreach-kit.md` | Most MSPs are willing to have a second conversation or introduce a client | Most MSPs are cool, defensive, or unresponsive | Untested |
| MSPs will actively refer clients to Pharos | Medium-high | None | Low | Same 10 MSP conversations; track any referral separately | At least 1 to 2 real referrals within 90 days | Zero referrals after 10+ genuine MSP conversations | Untested |
| Independent Security Review is understandable to a non-technical buyer without explanation | High | Positioning and copy design only | Medium | Watch for confused reactions or repeated "so is this like a pentest?" questions in real calls | Most buyers grasp the offer within the first minute of explanation | Repeated confusion or the need for lengthy re-explanation | Untested |
| Customers will pay approximately $2,500 to $5,000 for the standard-tier review | Critical | Market-validated range is $1,800–$4,200 (`02_Business_Strategy/pricing-strategy.md`); the $2,500–$5,000 figure is a founder-directed hypothesis, not market-tested | Low | Real proposals at this price, tracked by outcome | Proposals at this price convert at a workable rate (see `validation-checkpoints.md`) | Consistent price objections or a conversion rate near zero at this price | Untested |
| A paid pilot ($1,500–$2,500) converts a prospect who wouldn't pay standard price | Medium | Reasoned discount structure, no data | Low | Offer pilot pricing to the first 3–5 qualified prospects specifically | At least 2 of the first 3–5 convert, and produce usable feedback/testimonial | Pilot pricing still gets declined, or produces no usable feedback | Untested |
| Customers value independent remediation verification (Remediation Assurance) enough to pay for it separately | Medium | New service, no market or conversation evidence | Low | Offer it explicitly to every client who completes a review | At least 1 of the first review clients buys it | Zero uptake after 3+ completed reviews | Untested |
| Ongoing advisory (Security Adviser) is attractive as a later upsell | Medium | Existing service design only | Low | Raise it only after a review is delivered, never cold; track reaction | Genuine interest from at least 1 client post-review | No interest even after value is demonstrated | Untested |
| Customer/insurer questionnaires create real urgency to buy | Medium-high | Anecdotal reasoning in `customer-profiles.md`, no direct evidence | Low | Track how often this trigger is the actual stated reason for contact | This trigger appears in a meaningful share of qualified conversations | Rarely or never cited as the real reason | Untested |
| Exposure Snapshot leads to larger paid work | Medium | Built and live, zero usage data yet | Low | Track how many Exposure Snapshot users book a conversation | A meaningful share (even 5 to 10%) convert to a booked call | Near-zero conversion after real traffic | Untested |
| The website's conversation-intake form generates qualified leads | Medium | Built and live, zero submissions analysed yet | Low | Review the first 10 to 20 submissions for genuine fit vs. noise | Most submissions are genuine target-buyer fits | Mostly spam, students, or clear non-fits | Untested |
| The existing free/self-serve entry points (Exposure Snapshot, intake form) are sufficient without also building the Free Security Health Check | Medium | Reasoned decision, no data | Medium | Watch whether prospects ask for a lighter self-assessment option specifically | Nobody meaningfully asks for it in the first 90 days | Repeated requests for a shorter/no-obligation first step the existing tools don't satisfy | Untested |

## How to use this table

- Add a row the moment a new important belief surfaces in a real conversation; don't wait for a formal review.
- Move a row's status from "Untested" to "Supported" or "Contradicted" only when real prospect/partner/client evidence exists, logged in `10_Admin/commercial-validation-tracker.csv`.
- Never mark something "Validated" from a single data point; use "Supported" until there's enough volume to be confident, per the thresholds in `09-project-management/validation-checkpoints.md`.
