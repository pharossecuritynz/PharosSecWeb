# Website Launch Checklist

*Run through before pointing the live domain at the website, and again before any major relaunch.*

## Content

- [ ] All copy matches [../06_Sales_and_Marketing/website-copy.md](../06_Sales_and_Marketing/website-copy.md) (no leftover placeholder/lorem ipsum text)
- [ ] Founder bio/photo added to About section (currently placeholder — see [../06_Sales_and_Marketing/about-page-copy.md](../06_Sales_and_Marketing/about-page-copy.md))
- [ ] Contact email is a real, monitored inbox (not a placeholder)
- [ ] All links (nav, CTAs, footer) point to working destinations
- [ ] No broken anchor links (#services, #process, #about, #contact all scroll correctly)

## Technical

- [ ] `npm run build` completes with no errors
- [ ] `npm run lint` passes clean
- [ ] Site tested on desktop, tablet, and mobile viewport sizes
- [ ] Site tested in at least two browsers (e.g. Chrome and Safari)
- [ ] Favicon set (currently default — needs the final logo mark, see [../01_Brand/logo-direction.md](../01_Brand/logo-direction.md))
- [ ] Page title and meta description are accurate and compelling (see current values in `app/layout.tsx`)

## Domain and hosting

- [ ] Domain registered (pharossecurity.co.nz or confirmed alternative)
- [ ] Hosting/deployment platform chosen and configured (Vercel recommended for Next.js)
- [ ] DNS pointed correctly, SSL/HTTPS working
- [ ] www vs. non-www redirect configured consistently

## Legal and compliance

- [ ] Privacy Policy published (lawyer-reviewed — see [../02_Business_Strategy/risk-boundaries.md](../02_Business_Strategy/risk-boundaries.md))
- [ ] Terms of Website Use published, if applicable
- [ ] Any tracking/analytics tool disclosed appropriately if added

## Marketing readiness

- [ ] At least one lead magnet available and linked (see [../09_Checklists/sme-cyber-readiness-checklist.md](sme-cyber-readiness-checklist.md))
- [ ] LinkedIn profile/company page linked appropriately
- [ ] Google Business Profile created (helps local NZ search visibility) — optional but recommended

## Post-launch

- [ ] Analytics tool installed to track visits and conversion (see [../10_Admin/tools-and-software.md](../10_Admin/tools-and-software.md) for tool choice)
- [ ] Test the full CTA flow yourself (click "Book a cyber risk review" through to actually booking/emailing)
- [ ] Share the launch on LinkedIn (see [../06_Sales_and_Marketing/linkedin-post-ideas.md](../06_Sales_and_Marketing/linkedin-post-ideas.md) — "why I started Pharos Security" is a strong launch post)

## Assumptions / needs founder input

- Domain, hosting, and analytics tool decisions are all outstanding — see [../10_Admin/next-actions.md](../10_Admin/next-actions.md).
