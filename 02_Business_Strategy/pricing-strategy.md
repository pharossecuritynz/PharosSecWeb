# Pricing Strategy

**Status: validated against published NZ/AU market data (see [Market validation](#market-validation) below) as of July 2026, restructured 2026-08-22 to match the seven-service v2 architecture, and cross-checked against UK market data 2026-08-22 (see [International benchmark](#international-benchmark-uk-market-added-2026-08-22)). Figures below have been checked against real competitor and market pricing signals, but no NZ competitor publishes exact fixed-fee pricing for a direct like-for-like comparison — treat these as evidence-informed, not confirmed-by-quote. Continue to sanity-check against real proposals and win/loss feedback in the first 90 days.**

**2026-08-22: public display paused, pending further discussion.** Ranges were briefly live on every service card. Jason Hill asked for them to come off, wanting to keep this for further discussion rather than treat the public-ranges question as settled. The ranges and their research below are unchanged and still the working internal reference for quoting; only the decision to *display* them on the website is on hold. See `00-business/decisions.md`.

## Pricing philosophy

1. **Price the outcome, not the hour** wherever possible — fixed-scope pricing is easier for SME buyers to say yes to than open-ended hourly billing, and it protects the advisor from scope creep dragging down effective hourly rate.
2. **Fixed quotes privately; public display currently paused.** The original intent was to show indicative ranges on the website (a transparency differentiator against vague consulting pricing norms). As of 2026-08-22 that's on hold at Jason Hill's request, pending further discussion, not reversed as policy. Either way, the actual quote is always confirmed after the 15-minute Security Conversation or a scoping call, never on the spot.
3. **Keep the entry point genuinely low-commitment** — the Free Security Health Check costs nothing, and the Exposure Snapshot and Independent Security Review are priced to make "yes" easy, since they're the primary lead-to-client conversion points.
4. **No surprise consulting bills.** Every paid engagement is fixed-scope or a clearly tiered retainer. Nothing is billed open-ended.
5. **Build toward recurring revenue** — one-off engagements are valuable, but the Security Adviser retainer is what makes the business sustainable and less dependent on constant new-client acquisition.

## Suggested pricing by service (summary)

| Service | Suggested range (NZD, excl. GST) | Basis |
|---|---|---|
| Free Security Health Check | Free | Zero-cost, zero-obligation entry point |
| Exposure Snapshot | $400 – $900 | Fixed fee; lighter, faster external-only review |
| Independent Security Review | $1,800 – $4,200 | Fixed fee, scaled by business size/complexity |
| IT Provider Security Assurance | $1,500 – $3,500 | Fixed fee, scaled by number of platforms/providers in scope |
| Secure Foundations | $2,000 – $5,000 | Fixed fee, scoped after an initial review |
| Incident Readiness | $900 – $2,000 | Fixed fee, half-day workshop format plus documents |
| Security Adviser | $500 – $1,500 / month | Tiered monthly retainer |

Add-on modules (available within Independent Security Review or Secure Foundations, or standalone on request): Microsoft 365/Google Workspace deep-dive, email and phishing technical review, staff awareness session, policy and checklist pack. Pricing for these follows the ranges in their archived source documents (`03_Services/archive/`) until re-validated as standalone line items.

Full detail and inclusions for each is in the relevant file under `../03_Services/`.

## What drives price within each range

- Business size (headcount, number of systems/locations)
- Complexity of existing environment (number of cloud platforms, degree of custom/legacy systems, number of IT suppliers)
- Urgency/timeline (rush delivery may carry a premium)
- Travel requirement for in-person delivery outside the founder's base region

## Retainer tiers (Security Adviser) — starting structure

| Tier | Suggested monthly fee (NZD) | Includes |
|---|---|---|
| Essentials | $500 – $700 | Monthly email/phone check-in, ad hoc advice (email response within 2 business days), annual mini risk review |
| Standard | $800 – $1,050 | Above, plus quarterly review call, priority response (1 business day), light involvement in vendor/tool decisions |
| Priority | $1,150 – $1,500 | Above, plus more responsive turnaround, more hands-on involvement in ongoing uplift plan execution, discounted rate on additional project work |

Even the top of this range sits well under the $1,500–$3,000/month floor typically seen for a genuine (if limited-scope) vCISO engagement in NZ; that gap is deliberate positioning, not underpricing. If demand consistently pushes against the Priority tier ceiling, that's a signal there's room to introduce a fourth "vCISO-lite" tier above it, not a signal the existing tiers are wrong. This service is deliberately not marketed as vCISO at launch; see `01_Brand/positioning.md` and the founder positioning notes in `06_Sales_and_Marketing/about-page-copy.md`.

## What's shown publicly versus quoted privately

- **On the website currently**: no prices at all. Every conversation about cost happens on a call, not on the page. This was a deliberate transparency choice originally (see the Fractional Wisdom benchmark note in `00-business/decisions.md`) and may return once Jason Hill decides the public-ranges question, but is paused for now.
- **Confirmed on a call**: the specific fixed quote, after the 15-minute Security Conversation or a short scoping exchange, once business size and complexity are known. This part is unaffected either way; a fixed quote was never going on the website.

## Discounting policy

- Avoid discounting the headline price; instead, adjust scope (for example a narrower Exposure Snapshot instead of the full Independent Security Review) to fit a tighter budget.
- Bundle discounts are acceptable and encouraged (for example Independent Security Review + Secure Foundations bundled at a modest discount to the sum of both).
- Avoid "first client" or "founding client" discounts becoming a permanent anchor; if used to build initial case studies, cap it to the first 3 to 5 clients and say so explicitly in internal pricing notes, not necessarily to the client.

## Payment terms (suggested starting point)

- Fixed-scope engagements: 50% deposit on proposal acceptance, 50% on delivery of final report/plan
- Retainers: monthly in advance, no lock-in contract initially (builds trust; revisit once demand is proven)
- Standard payment terms: 7 days from invoice for project balances

## Market validation

Researched July 2026 across published NZ/AU cyber security advisory, vCISO, and awareness-training providers. Findings and how they were applied:

| Finding | Source | Applied as |
|---|---|---|
| NZ baseline SME security assessments start around $2,000; comprehensive penetration testing for small business runs $5,000–$20,000 | [CyberMark Agency – Affordable Penetration Testing NZ](https://cybermarkagency.com/affordable-penetration-testing-nz-small-business/) | Set the Independent Security Review floor at $1,800, kept it well clear of pentest pricing to reinforce the "not a pentest" boundary |
| NZ vCISO engagements typically run $3,000–$12,000/month; smaller-scope engagements start $1,500–$3,000/month; full-time CISO fully-loaded cost is $200k–$330k/year | [Compass IT Compliance – vCISO Cost in 2026](https://www.compassitc.com/blog/how-much-does-a-virtual-ciso-vciso-cost-in-2026), [SideChannel – vCISO Pricing Guide](https://sidechannel.com/blog/the-ultimate-guide-to-vciso-pricing-everything-you-need-to-know/) | Set the Security Adviser ceiling at $1,500/month, confirming this is priced well below even entry-level vCISO, which is the intended, deliberate gap |
| Average NZ cyber security consultant/employee hourly equivalent is $47–$67/hr | [PayScale NZ – Cyber Security Hourly Rate](https://www.payscale.com/research/NZ/Skill=Cyber_Security/Hourly_Rate) | Sanity-checked effective rates implied by fixed fees ÷ estimated effort hours (see below) |
| Security awareness training is typically sold as per-seat SaaS ($5–12/user/month); formal multi-day classroom courses start at $3,395 | [Swerve – Cyber Security Staff Awareness Training](https://www.swerve.nz/cyber-security-awareness-training), [The Knowledge Academy – NZ Cyber Security Awareness Training](https://www.theknowledgeacademy.com/nz/courses/cyber-security-training/cyber-security-awareness/) | Kept the staff awareness add-on at $600–$1,200/session, positioned as a distinct middle offer |
| Enterprise-scale cyber incident tabletop exercises run into the tens of thousands (USD) | General industry sources (US-focused; no NZ SME-specific figure found) | Confirmed Incident Readiness's $900–$2,000 range is correctly and deliberately scaled down for a half-day SME session |
| No NZ provider publishes fixed-fee pricing for a Microsoft 365 configuration review, an IT-provider assurance review, or a policy/checklist documentation pack | Search across NZ security/MSP providers found no comparable published pricing | Flagged as a genuine market pricing gap for the Independent Security Review, IT Provider Security Assurance, and policy pack add-on; an opportunity to lead on transparent pricing, not a risk signal |

### International benchmark: UK market (added 2026-08-22)

Fractional Wisdom (UK), the benchmark named in `00-business/decisions.md`, does not publish specific prices anywhere on its site. Its only pricing-related statement is a philosophy match, not a figure: "Our work is fixed price on an agreed scope, so you know exactly what you're committing to: no surprises or open-ended consultancy." That's already Pharos's stated pricing philosophy (see above), so the comparison below uses broader published UK market data as a proxy, not Fractional Wisdom's own numbers, which don't exist publicly.

**Currency note:** figures are converted to NZD at an illustrative rate of roughly 1 GBP ≈ 2.2 NZD for scale reference only. Treat as directional, not precise; do not use for an actual client quote.

| Finding (UK, GBP) | Illustrative NZD equivalent | Source | Applied as |
|---|---|---|---|
| Cyber Essentials certification (Fractional Wisdom's core product): £500–£5,000/year | ~$1,100–$11,000 | [Cypro – Cyber Essentials Cost 2026](https://cypro.co.uk/insights/cyber-essentials-cost/) | Comparable order of magnitude to the Independent Security Review's $1,800–$4,200 one-off range, despite being a different deliverable (certification vs. independent review); no reason to revise the existing range |
| UK fractional CISO / vCISO monthly retainer: £3,000–£12,000/month | ~$6,600–$26,400/month | [Leadership Services – Fractional CISO UK](https://leadership-services.co.uk/insights/fractional-ciso-uk-cybersecurity-leadership/), [SideChannel – vCISO Pricing 2026](https://sidechannel.com/blog/the-ultimate-guide-to-vciso-pricing-everything-you-need-to-know/) | Confirms, from a second independent market, that the Security Adviser retainer ($500–$1,500/month) sits well below fractional-CISO-level pricing, consistent with the NZ vCISO comparison above. The gap is wider here than against the NZ figures, reinforcing that this retainer should stay positioned as lighter-touch advisory, not vCISO, until there's real demand pressure at the top of the existing tiers |
| UK fractional CISO day rate: £900–£1,500/day (up to £1,500–£2,500 for regulated/complex sectors) | ~$2,000–$3,300/day | [Boardman – Fractional CTO & CISO Cost](https://www.boardman.com/blog/fractional-cto-ciso-cost) | Not directly applied; Pharos doesn't sell day-rate time, only fixed-scope engagements and tiered retainers, so this is context rather than a figure to calibrate against |
| UK external penetration test: £3,500–£7,500 | ~$7,700–$16,500 | Aggregated from UK cyber security cost guides (2026) | Consistent with the existing NZ pentest figure ($5,000–$20,000+) already used to keep the Independent Security Review's ceiling well clear of pentest-level pricing |

**Overall read:** two independent markets (NZ/AU and UK) land on the same conclusions — the one-off review pricing is in a sensible range, and the retainer is deliberately priced well under vCISO/fractional-CISO territory. Nothing here signals a need to change current ranges; if anything, the size of the UK retainer gap suggests there's room for a higher tier later, not urgency to raise prices now.

### Effort-rate sanity check

Using the effort estimates documented in each `../03_Services/` file, the fixed fees imply the following effective hourly rates:

| Service | Estimated hours | Fee range | Implied effective rate |
|---|---|---|---|
| Exposure Snapshot | 4.5–6 | $400–$900 | ~$90–$150/hr |
| Independent Security Review | 7.5–10.5 | $1,800–$4,200 | ~$170–$400/hr |
| IT Provider Security Assurance | 7–10 | $1,500–$3,500 | ~$210–$350/hr |
| Secure Foundations | 10–13 | $2,000–$5,000 | ~$155–$385/hr |
| Incident Readiness | 10–11 | $900–$2,000 | ~$80–$180/hr |

All of these sit at or above the $47–$67/hr employee-equivalent market rate, which is expected: an independent consultant's fee needs to cover business development time, admin, insurance, and non-billable hours that an employee's hourly rate doesn't have to. If real delivery time consistently runs longer than estimated, revisit the fee rather than silently absorbing the gap.

## Assumptions / needs founder input

- **Directionally validated, not quote-confirmed.** The figures above are checked against published market data, but no direct NZ competitor publishes an exact like-for-like fixed fee; continue to test against real discovery call price sensitivity and actual win/loss patterns in the first 90 days.
- GST registration status not yet confirmed; see `../10_Admin/business-setup-checklist-nz.md`. All prices above are stated excl. GST and should be updated once registration status is confirmed.
- Confirm founder's target annual revenue and the implied number of engagements per month needed at these price points, to sanity-check the launch plan's targets.
