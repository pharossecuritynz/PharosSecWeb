---
title: Risk Register (Pharos Security, the business itself)
status: approved
owner: Jason Hill
last-reviewed: 2026-07-22
review-cycle: monthly, or when a risk materialises
---

# Risk Register

Risks to the Pharos Security business and build process itself, not client-facing security risk findings (which will get their own register once the service model is confirmed, per `03-agents/agent-catalogue.md`).

**Note on question 5:** the insurance, legal, certification, and registration status below is an ASSUMPTION ("not yet in place"), not a verified fact, per `00-business/decisions.md` (2026-07-22). It stays Open until Jason Hill corrects it, not because no answer was given, but because the only honest answer available defaults to conservative.

| Risk | Likelihood | Impact | Priority | Treatment | Owner | Status |
|---|---|---|---|---|---|---|
| Taking a paying client without professional indemnity insurance bound | Medium (assumed not bound, unverified) | High | Now | Confirm real status, correcting the assumption in `decisions-required.md` question 5 if wrong; bind before first paid engagement | Jason Hill | Open |
| Taking a paying client without a lawyer-reviewed Terms of Engagement | Medium (assumed not engaged, unverified) | High | Now | Same | Jason Hill | Open |
| Expanding into active technical testing (vulnerability assessment, external attack surface scanning) without matching certification, insurance, and authorisation controls | Low, decision recorded | High if it happened | Now | Answered 2026-07-22: launch advisory-only, active-testing services stay deferred until question 5 confirms insurance and certification are actually in place, not merely asked about | Jason Hill | Managed |
| Building a second, parallel documentation structure alongside the existing 91-file studio | Low, actively managed | Medium | Ongoing | `CLAUDE.md` and the current-state review both establish the rule against this; check before creating new files | Claude (process), Jason Hill (oversight) | Managed |
| Attractive technical or agent-building work displacing essential sales, legal, and delivery work | Medium | Medium | Ongoing | Backlog scoring method in `backlog.md` | Jason Hill | Managed |
| 85 existing files still containing the em dash character, which the directive prohibits (91 minus the 6 cleaned during the founder-name update) | High (already true) | Low | Next | Logged as a near-top backlog item, tackled deliberately rather than rushed | Claude | Open |
| Website hero and design drifting toward generic AI-startup visual patterns (glassmorphism, glowing effects, floating decorative cards) | Low, one instance already caught and corrected | Medium | Ongoing | Directive's design principles now recorded in `CLAUDE.md`; Jason Hill has already rejected one instance | Jason Hill, Claude | Managed |
| Solo founder capacity: retainer and project work outpacing available hours | Low currently, will rise with client volume | Medium | Later | Capacity guardrails already documented in `04_Operating_Manual/weekly-business-rhythm.md`; revisit once real client data exists | Jason Hill | Monitored |
| Pricing based on desk research rather than confirmed competitor quotes or real win and loss data | Medium | Low to Medium | Later | Already flagged in `02_Business_Strategy/pricing-strategy.md`; test against the first 5 to 10 real discovery calls | Jason Hill | Monitored |
| The 2026-09-09 active pricing hypothesis ($2,500–$5,000 standard tier) sits above the July 2026 market-validated range ($1,800–$4,200), untested against real conversations | Medium | Medium | Now | Track win/loss at this price point from the very first proposal, in `10_Admin/commercial-validation-tracker.csv`; revisit at the 30-day checkpoint if price resistance is consistent | Jason Hill | Open |
| MSP cooperation and referral behaviour is assumed, not evidenced (zero real MSP conversations as of 2026-09-09) | Medium | Medium | Now | 10 MSP/IT-consultant conversations per the 30-day plan; track outcome per conversation | Jason Hill | Open |
| "Pharos Security" has not been checked against NZ Companies Office, NZBN, IPONZ trademarks, or existing international companies using the same or a similar name | Medium | Medium to High if an actual conflict exists | Now | Proper due diligence, tracked as an explicit action in `10_Admin/next-actions.md`; do not rename pre-emptively without a real finding | Jason Hill | Open |

## Review trigger

Update this file whenever a risk's status changes, a new risk is identified, or a decision in `decisions.md` closes one of the "Open" items above.
