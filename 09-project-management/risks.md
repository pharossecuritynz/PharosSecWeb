---
title: Risk Register (Pharos Security, the business itself)
status: approved
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: monthly, or when a risk materialises
---

# Risk Register

Risks to the Pharos Security business and build process itself, not client-facing security risk findings (which will get their own register once the service model is confirmed, per `03-agents/agent-catalogue.md`).

| Risk | Likelihood | Impact | Priority | Treatment | Owner | Status |
|---|---|---|---|---|---|---|
| Taking a paying client without professional indemnity insurance bound | Medium | High | Now | Confirm insurance status (question 5, `decisions-required.md`), bind before first paid engagement | Oscar | Open |
| Taking a paying client without a lawyer-reviewed Terms of Engagement | Medium | High | Now | Engage a lawyer, treat as launch-blocking | Oscar | Open |
| Silently expanding into active technical testing (vulnerability assessment, external attack surface scanning) without matching certification, insurance, and authorisation controls | Medium | High | Now | Question 1 in `decisions-required.md` must be answered explicitly, not assumed | Oscar | Open |
| Building a second, parallel documentation structure alongside the existing 91-file studio | Low, actively managed | Medium | Ongoing | `CLAUDE.md` and the current-state review both establish the rule against this; check before creating new files | Claude (process), Oscar (oversight) | Managed |
| Attractive technical or agent-building work displacing essential sales, legal, and delivery work | Medium | Medium | Ongoing | Backlog scoring method in `backlog.md` | Oscar | Managed |
| 91 existing files containing the em dash character, which the directive prohibits | High (already true) | Low | Next | Logged as a near-top backlog item, tackled deliberately rather than rushed | Claude | Open |
| Website hero and design drifting toward generic AI-startup visual patterns (glassmorphism, glowing effects, floating decorative cards) | Low, one instance already caught and corrected | Medium | Ongoing | Directive's design principles now recorded in `CLAUDE.md`; Oscar has already rejected one instance | Oscar, Claude | Managed |
| Solo founder capacity: retainer and project work outpacing available hours | Low currently, will rise with client volume | Medium | Later | Capacity guardrails already documented in `04_Operating_Manual/weekly-business-rhythm.md`; revisit once real client data exists | Oscar | Monitored |
| Pricing based on desk research rather than confirmed competitor quotes or real win and loss data | Medium | Low to Medium | Later | Already flagged in `02_Business_Strategy/pricing-strategy.md`; test against the first 5 to 10 real discovery calls | Oscar | Monitored |

## Review trigger

Update this file whenever a risk's status changes, a new risk is identified, or a decision in `decisions.md` closes one of the "Open" items above.
