# Design System (Implementation Reference)

The technical/developer-facing companion to [../01_Brand/visual-identity.md](../01_Brand/visual-identity.md), [colour-palette.md](../01_Brand/colour-palette.md), and [typography.md](../01_Brand/typography.md) — documenting how the brand is actually implemented in code.

## Project structure

```
pharos-security-site/
├── app/
│   ├── layout.tsx      Root layout, font loading, metadata
│   ├── page.tsx         Homepage composition (imports all section components)
│   └── globals.css      Theme tokens, Tailwind import, base styles
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── BuiltForSMEs.tsx
│   ├── About.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── BeaconMark.tsx   Reusable abstract logo SVG
│   └── icons.tsx        Restrained line-icon set used across Services cards
└── public/               Static assets
```

## Colour tokens (Tailwind v4 `@theme`, defined in `globals.css`)

```css
--navy: #071a2d;
--midnight: #0b2438;
--mist: #eef5f6;
--teal: #2fa7a0;
--cyan: #b8eef0;
--charcoal: #17212b;
```

Used in components as Tailwind utility classes: `bg-navy`, `text-charcoal`, `border-teal/40`, etc. See [../01_Brand/colour-palette.md](../01_Brand/colour-palette.md) for usage rules and accessibility notes.

## Typography tokens

```css
--font-heading: var(--font-sora), ui-sans-serif, system-ui, sans-serif;
--font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
```

Sora and Inter are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables. Headings (`h1`–`h4`) default to `font-heading` via a global CSS rule; body text uses `font-body`.

## Layout patterns

- **Section rhythm:** alternating `bg-navy` / `bg-white` / `bg-mist` / `bg-midnight` sections create visual pacing down the page
- **Container:** `mx-auto max-w-6xl` with responsive horizontal padding (`container-px` utility class)
- **Card pattern:** `rounded-2xl border border-charcoal/10` with a hover state (`hover:border-teal/40`, subtle `-translate-y-1` lift, soft shadow) — used for Services and Built-for-SMEs cards
- **Beacon glow:** large, heavily-blurred (`blur-[140px]`), low-opacity radial `bg-teal/20` divs positioned absolutely behind hero/CTA content — creates warmth without visual noise
- **Radiating beam lines:** a background SVG in the hero with thin, low-opacity lines converging to a point, reinforcing the beacon motif abstractly

## Component conventions

- All components are React Server Components by default (no `"use client"` unless interactivity is added later)
- Icons in `icons.tsx` follow a consistent spec: `viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth={1.5}`, rounded caps/joins — new icons should match this spec exactly
- `BeaconMark.tsx` accepts a `className` prop for sizing/colour context (used at different sizes in Header, Hero-adjacent, CTA, and Footer)

## Animation conventions

- Two custom keyframe animations defined in `globals.css`: `beacon-sweep` (slow 8s glow drift, used sparingly) and `fade-up` (entrance animation for hero content)
- Motion should stay slow and subtle per [../01_Brand/visual-identity.md](../01_Brand/visual-identity.md) — no animation faster than ~0.7s, no bouncing/scaling effects

## Accessibility notes

- Colour contrast rules from [../01_Brand/colour-palette.md](../01_Brand/colour-palette.md) must be respected in all new components (teal text on white fails AA at small sizes — use teal only for icons/borders/buttons with dark text on top)
- All decorative SVGs (beacon glow, beam lines) use `aria-hidden="true"`
- Semantic HTML: `<header>`, `<main>`, `<footer>`, proper heading hierarchy (single `h1` in the Hero, `h2` per section, `h3` within cards)

## Extending the design system

When adding a new section or component:
1. Check [../01_Brand/visual-identity.md](../01_Brand/visual-identity.md) for the applicable principle
2. Reuse existing patterns (card style, section padding, colour tokens) rather than introducing new ones
3. If a genuinely new pattern is needed, document it here so it becomes the reusable standard, not a one-off
