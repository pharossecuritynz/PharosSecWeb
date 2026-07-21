# Reporting Standards

Every client-facing report, plan, or written deliverable follows these standards, regardless of which service produced it.

## Structure principle: summary first, detail second

Every report opens with a **plain-English executive summary** (max 1 page) that a non-technical business owner can read in under 3 minutes and understand:
1. What was reviewed
2. The overall picture (in words, not just a score/rating)
3. The 3–5 things that matter most
4. What to do next

Technical detail, findings tables, and methodology follow **after** the summary — never before it.

## Formatting standards

- Use the typography hierarchy in [../01_Brand/typography.md](../01_Brand/typography.md)
- Use tables for findings/recommendations lists (Finding → Why it matters → Priority → Suggested action)
- Use a consistent priority scale across all reports:

| Priority | Meaning | Suggested timeframe |
|---|---|---|
| **Now** | Meaningful risk, low effort/cost to fix | Within 30 days |
| **Next** | Worth doing, moderate effort or dependency | Within 90 days |
| **Later** | Good practice, lower urgency or higher effort | Within 6–12 months |
| **Monitor** | Not actionable yet, but worth watching | Revisit at next review |

- Avoid red/amber/green traffic-light colour coding that leans into alarm — use the Now/Next/Later/Monitor labels instead, styled with the brand's restrained palette (see [../01_Brand/colour-palette.md](../01_Brand/colour-palette.md))
- Every finding must include **why it matters in plain English**, not just a technical description
- Every report ends with a clear "what happens next" section

## Language standards

- Follow [../01_Brand/tone-of-voice.md](../01_Brand/tone-of-voice.md) throughout
- Define every acronym on first use
- Avoid absolute claims ("fully secure," "completely eliminates risk") — use "significantly reduces," "meaningfully lowers"
- Every report includes a boundaries/limitations note (see [../03_Services/service-boundaries.md](../03_Services/service-boundaries.md) for standard language)

## File formats

- Final delivery: PDF (locked formatting, professional presentation)
- Working/editable version: available on request as Word/Markdown, particularly for the Uplift Plan and Policy Starter Pack where the client will want to edit and maintain the document themselves

## Confidentiality footer (required on every report)

Every report should include a footer or cover-page note along the lines of:

> This report is prepared exclusively for [Client Name] and contains confidential information about their systems and practices. It should not be shared outside the organisation without the client's consent, and should be stored securely given the sensitive nature of its contents.

## Version and naming convention

`[ClientName]_[ServiceName]_[YYYY-MM-DD]_v[n].pdf` — e.g. `Northstar-Legal_CyberRiskReview_2026-03-14_v1.pdf`

## Assumptions / needs founder input

- Confirm whether reports will be produced in Word/Google Docs and exported to PDF, or authored directly as PDF via a design tool — affects template file format choices in [../05_Client_Templates/](../05_Client_Templates/).
