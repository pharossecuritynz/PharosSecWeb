# Build Prompt

The original build brief used to generate the current website — kept here as a reusable reference for rebuilding, extending, or briefing another developer/AI tool on the site.

## Prompt

```
Build a professional, production-quality local website for Pharos Security using Next.js, TypeScript, Tailwind CSS, and the App Router.

This is a polished one-page marketing website for a premium boutique cyber security advisory business in New Zealand focused on SMEs.

The site should feel: premium, calm, practical, New Zealand-focused, professional, trustworthy, clear, not too technical, not salesy, not casual.

Brand: Pharos Security

Positioning: Pharos Security helps New Zealand SMEs understand cyber risk, strengthen practical controls, prepare for incidents, and build safer everyday habits without jargon or scare tactics.

Visual direction:
- Deep navy background, white content sections, restrained teal/cyan accents
- Abstract beacon/light beam idea, subtle coastal/lighthouse influence
- Premium boutique consultancy feel
- Avoid hacker visuals, padlocks, matrix code, skulls, red/black fear-based design, or military styling

Colours: Deep Navy #071A2D, Midnight Blue #0B2438, White #FFFFFF, Soft Mist #EEF5F6, Restrained Teal #2FA7A0, Pale Cyan #B8EEF0, Charcoal #17212B

Fonts: Sora for headings, Inter for body text.

Create: app/page.tsx, app/layout.tsx, app/globals.css, components/Header.tsx, components/Hero.tsx, components/Services.tsx, components/Process.tsx, components/About.tsx, components/CTA.tsx, components/Footer.tsx (plus Problem.tsx and BuiltForSMEs.tsx to cover all homepage sections)

Homepage structure: Header, Hero, Problem/positioning, Services, Process, Built for SMEs, About/credibility, Final CTA, Footer

Hero headline: "Clear cyber security guidance for New Zealand businesses."
Hero subheading: "Pharos Security helps SMEs understand cyber risk, strengthen practical controls, prepare for incidents, and build safer everyday habits without jargon or scare tactics."
Primary CTA: "Book a cyber risk review"
Secondary CTA: "View services"

Services: Cyber Risk Review, SME Security Uplift Plan, Microsoft 365 Security Basics Review, Email and Phishing Readiness, Incident Readiness Workshop, Staff Cyber Awareness Sessions, Security Policy and Checklist Starter Pack, Ongoing Cyber Advisor Support

Process: Understand, Prioritise, Improve, Prepare

Make this look production-quality, not like a basic starter template. Use strong spacing, clear hierarchy, subtle card borders, refined hover states, responsive mobile layout, and an abstract SVG beacon/logo mark.

After building, run the project, fix any errors, and confirm how to view it locally.
```

## Result

This prompt produced the site currently at [pharos-security-site/](pharos-security-site/) — see [design-system.md](design-system.md) for the resulting technical implementation and [homepage-copy.md](homepage-copy.md) for the exact copy used.

## How to reuse this prompt

- **Rebuilding from scratch:** paste this prompt into Claude Code, Cursor, or another AI coding tool, pointed at an empty project directory
- **Extending the site:** reference this prompt for context, then describe the specific addition (e.g. "add a /services page following the same design system, using components/icons.tsx for icons")
- **Briefing a human developer:** use this prompt plus [design-system.md](design-system.md) as the technical spec

## Assumptions / needs founder input

- None — this prompt is a working, tested reference reflecting what was actually built.
