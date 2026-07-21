# Website Brief

## Objective

A polished, one-page marketing website for Pharos Security that establishes credibility, explains the service offering clearly, and converts visitors into discovery-call bookings — reflecting the brand's premium, calm, boutique positioning.

## Status: built

The site is implemented and living at [pharos-security-site/](pharos-security-site/). This brief documents the requirements it was built against, for future reference and iteration.

## Requirements

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS
- **Fonts:** Sora (headings), Inter (body), loaded via `next/font/google`
- **Structure:** Component-based — see [design-system.md](design-system.md) for the file structure
- **Responsive:** Fully responsive, mobile-first considerations for all sections
- **Performance:** Static generation (no server-side data dependency for v1)

## Sections (in order)

1. Header — sticky navigation, logo mark, primary CTA
2. Hero — headline, subheading, dual CTA, abstract beacon/beam visual
3. Problem/positioning — why Pharos Security exists
4. Services — 8-card grid of the full service catalogue
5. Process — 4-step approach (Understand, Prioritise, Improve, Prepare)
6. Built for SMEs — differentiation value props
7. About/credibility — founder narrative and operating principles
8. Final CTA — second conversion opportunity
9. Footer — navigation, contact, legal line

Full copy for every section: [homepage-copy.md](homepage-copy.md) (mirrors [../06_Sales_and_Marketing/website-copy.md](../06_Sales_and_Marketing/website-copy.md)).

## Visual requirements

Deep navy backgrounds, white/mist content sections, restrained teal/cyan accents, abstract beacon/light-beam motif — see [../01_Brand/visual-identity.md](../01_Brand/visual-identity.md) and [design-system.md](design-system.md) for full implementation detail.

## What's explicitly out of scope for v1

- Multi-page site (service detail pages, blog, resources library) — see [sitemap.md](sitemap.md) for the planned future structure
- Functional contact form with backend submission handling (currently mailto links) — see [../10_Admin/next-actions.md](../10_Admin/next-actions.md)
- CMS integration — copy is hardcoded in components for v1, appropriate for a founder-maintained site at this stage
- Blog/content hub — deferred until there's a content cadence established (see [../06_Sales_and_Marketing/linkedin-post-ideas.md](../06_Sales_and_Marketing/linkedin-post-ideas.md) for where content lives for now)
- Analytics/tracking setup — see [next-actions.md](../10_Admin/next-actions.md)

## Success criteria

- Loads fast, looks premium and trustworthy on both desktop and mobile
- A visitor unfamiliar with Pharos Security can understand what it does and who it's for within 10 seconds of landing
- Clear, low-friction path to booking a discovery call from anywhere on the page

## Assumptions / needs founder input

- Domain (pharossecurity.co.nz or alternative) not yet registered/connected
- Hosting/deployment platform not yet chosen (Vercel is the natural fit for a Next.js app — see [next-actions.md](../10_Admin/next-actions.md))
- Real founder photo/bio pending — see [../06_Sales_and_Marketing/about-page-copy.md](../06_Sales_and_Marketing/about-page-copy.md)
