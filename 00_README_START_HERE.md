# Pharos Security — Studio README

**Start here.** This is the complete working studio for Pharos Security: an independent cyber security advisory practice for New Zealand SMEs. It contains brand strategy, business strategy, service definitions, an operating manual, client-ready templates, sales and marketing material, AI agent prompts, and the actual local website — everything needed to run this as a real business, not just look like one.

## What this studio is

A structured, practical business operating system, built specifically for a solo/founder-led cyber security advisory. Every document is written to be used, not just read — templates are ready to fill in, processes are ready to follow, agent prompts are ready to copy-paste, and the website is built and running.

It is **not** finished in the sense of "nothing left to do" — a business like this always has founder-specific details (name, credentials, pricing decisions, legal documents) that only the founder can provide. Every place that's true is flagged explicitly as an assumption or open question, never silently glossed over.

## Folder structure

| Folder | Contents |
|---|---|
| [01_Brand/](01_Brand/) | Brand essence, mission/vision/values, positioning, tone of voice, visual identity, colour palette, typography, logo direction, taglines, brand do's and don'ts |
| [02_Business_Strategy/](02_Business_Strategy/) | Business overview, target market, customer profiles, competitor positioning, differentiation, pricing strategy, risk boundaries, 90-day launch plan |
| [03_Services/](03_Services/) | Full definition of all 8 services (purpose, scope, deliverables, pricing, risks, sales copy) plus the service catalogue and service boundaries |
| [04_Operating_Manual/](04_Operating_Manual/) | SOP-style process docs: intake, discovery calls, proposals, delivery, reporting standards, quality checks, communication, data handling, escalation/referral, weekly rhythm |
| [05_Client_Templates/](05_Client_Templates/) | Ready-to-use templates for every client-facing document: questionnaires, reports, plans, executive summaries |
| [06_Sales_and_Marketing/](06_Sales_and_Marketing/) | Website copy, wireframe, email templates, LinkedIn content, referral partner material, lead magnet strategy |
| [07_Agents/](07_Agents/) | 11 copy-paste-ready AI agent prompts (brand, copywriting, service design, advisory, technical reviews, report writing, proposals, marketing, quality review) plus shared operating rules |
| [08_Website/](08_Website/) | Website brief, sitemap, design system, build prompt, and the **actual live Next.js website project** in `pharos-security-site/` |
| [09_Checklists/](09_Checklists/) | Client-facing checklists (readiness, M365 basics, phishing response, incident readiness) and internal QA checklists (onboarding, report quality, website launch) |
| [10_Admin/](10_Admin/) | NZ business setup checklist, tools/software recommendations, document control register, consolidated assumptions list, prioritised next actions |

## How to use this studio

1. **Read this file fully**, then skim [10_Admin/next-actions.md](10_Admin/next-actions.md) to understand what's genuinely still outstanding.
2. **Review the brand and business strategy folders (01–02)** first — everything downstream (services, templates, marketing, agents) is built on these foundations. If anything there doesn't feel right, that's the place to adjust before refining the rest.
3. **Use the operating manual (04) and templates (05)** as your actual day-to-day playbook once client work starts.
4. **Use the agent prompts (07)** in Claude, ChatGPT, or Cursor to speed up drafting reports, proposals, and marketing content — always review output before it reaches a client.
5. **Treat 10_Admin/assumptions-and-open-questions.md as a punch list** — work through it alongside next-actions.md rather than trying to "finish" the whole studio before starting.

## What to review first (priority order)

1. [10_Admin/next-actions.md](10_Admin/next-actions.md) — the sequenced action plan
2. [10_Admin/assumptions-and-open-questions.md](10_Admin/assumptions-and-open-questions.md) — everything needing your input, consolidated
3. [01_Brand/brand-brief.md](01_Brand/brand-brief.md) — does the brand direction feel right?
4. [02_Business_Strategy/pricing-strategy.md](02_Business_Strategy/pricing-strategy.md) — sanity-check the illustrative pricing against your own targets
5. [03_Services/service-catalogue.md](03_Services/service-catalogue.md) — confirm the service lineup matches what you want to offer at launch

## What is ready to use as-is

- All operating manual SOPs (04) — ready to follow from the first client enquiry
- All client templates (05) — ready to fill in for real engagements
- All checklists (09) — the four client-facing checklists are ready to publish as lead magnets right now
- All AI agent prompts (07) — ready to copy-paste
- The website (08) — built, tested, and ready to deploy once a domain is connected

## What needs your input before launch

The full list lives in [10_Admin/assumptions-and-open-questions.md](10_Admin/assumptions-and-open-questions.md), but the genuinely blocking items are:

1. Business structure decision and registration
2. Professional Indemnity + Public Liability insurance
3. Lawyer-reviewed Terms of Engagement
4. Domain registration and business email
5. Your name, background, and bio for the About section

Everything else (pricing validation, named competitors, referral partners, tool choices) can be refined in parallel or after the first few client conversations.

## Recommended next actions

See the full sequenced list in [10_Admin/next-actions.md](10_Admin/next-actions.md). In short: close out the 5 blocking items above, deploy the website, set up core tools, then start warm outreach and discovery calls per [02_Business_Strategy/90-day-launch-plan.md](02_Business_Strategy/90-day-launch-plan.md).

## How to run the website locally

The website lives in [08_Website/pharos-security-site/](08_Website/pharos-security-site/) — a Next.js (App Router) + TypeScript + Tailwind CSS project using Sora (headings) and Inter (body).

```bash
cd "/Users/oscar/Documents/Pharos Security/08_Website/pharos-security-site"
npm install    # only needed if node_modules isn't already present
npm run dev
```

Then open **http://localhost:3000**.

To verify a production build:

```bash
npm run build
```

Full technical detail (file structure, design tokens, component conventions) is in [08_Website/design-system.md](08_Website/design-system.md).

## A living studio, not a static archive

This project is designed to be edited as the business learns. Update pricing once real client data exists, refine customer profiles after real conversations, and log meaningful revisions in [10_Admin/document-control-register.md](10_Admin/document-control-register.md). Treat every document here as a first strong draft of a system that gets sharper with real-world use.
