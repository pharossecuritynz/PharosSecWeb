---
name: Pharos Security
description: Independent, plain-English cyber security advisory for New Zealand SMEs
colors:
  navy: "#071a2d"
  midnight: "#0b2438"
  white: "#ffffff"
  mist: "#eef5f6"
  teal: "#2fa7a0"
  cyan: "#b8eef0"
  charcoal: "#17212b"
typography:
  display:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  full: "9999px"
spacing:
  section-y: "6rem"
  card-gap: "1.25rem"
  container-x: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.navy}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.cyan}"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: Pharos Security

## 1. Overview

**Creative North Star: "The Steady Beacon"**

Pharos Security's website is built around a single idea: a fixed point of calm guidance in dark water. Deep navy sections carry the brand's authority the way night carries a lighthouse beam — the teal accent and soft cyan glow exist only to mark the point that matters, never to fill the frame. White and soft-mist sections are the daylight counterpart: dense, readable, unadorned, where the actual substance of the advice lives. The system explicitly rejects the visual grammar of cyber security marketing — no hooded hackers, no matrix code, no glowing padlocks, no red/black alarm palettes, no crosshair or weapon iconography — and it rejects the enterprise-consultancy register too: no stiff, over-produced Big-4 corporate polish, no generic MSP/IT-vendor template look. This is a boutique advisory practice, not a SOC and not a franchise.

**Key Characteristics:**
- Navy-anchored sections alternating with white/mist content sections, for rhythm across a long one-page layout
- A single restrained accent (teal) used sparingly — buttons, icons, borders, glows — never as a dominant field
- Depth conveyed through slow, low-opacity glow rather than shadow-heavy layering
- Generous whitespace; boutique brands breathe
- Motion that is slow (6–10s ambient cycles) and never sharp, blinking, or urgent

## 2. Colors

Two anchor neutrals (deep navy and clean white) do almost all the work; teal is the brand's one committed accent, used at roughly 10% of any given surface.

### Primary
- **Restrained Teal** (`#2fa7a0`): the brand's single accent. Buttons, icon backgrounds, links, borders on hover, the beacon mark itself. Always paired with navy text on top when used as a button fill (contrast requirement, not stylistic choice).

### Secondary
- **Pale Cyan** (`#b8eef0`): a lighter accent reserved for dark backgrounds only — eyebrow labels, small UI accents, glow highlights, hover states on navy. Never used as text on white or mist; it fails contrast there.

### Neutral
- **Deep Navy** (`#071a2d`): primary dark background — header, hero, process section, final CTA, footer base. Carries the brand's calm authority.
- **Midnight Blue** (`#0b2438`): secondary dark background, used to add subtle layering/variation against Deep Navy (About section, footer) without introducing a second hue.
- **White** (`#ffffff`): primary content background and primary text-on-dark.
- **Soft Mist** (`#eef5f6`): secondary light background, used to vary rhythm on content-heavy sections and as card icon-well fill.
- **Charcoal** (`#17212b`): primary body text color on white/mist backgrounds. Never substitute a lighter gray for "elegance" — charcoal is the accessible choice and the on-brand one.

### Named Rules
**The One-Accent Rule.** Teal is the only saturated color in the system. No second "status" hue (no orange alert, no green success) is introduced without a deliberate, documented extension to this palette — see `01_Brand/colour-palette.md`.

**The Dark-Text-on-Teal Rule.** Any teal-filled button carries navy text, never white. White-on-teal fails contrast; navy-on-teal is already implemented site-wide and must stay the default.

## 3. Typography

**Changed 2026-08-22:** Sora + Inter (a training-data-default pairing flagged in design critique) replaced with a single family, Libre Franklin, used across the whole hierarchy. Franklin Gothic heritage — civic, no-nonsense, squarer apertures than the previous geometric sans. Physical reference: a bridge inspection plaque, not a SaaS landing page. See `.impeccable/critique/2026-08-22T09-11-54Z__08-website-pharos-security-site.md`.

**Family:** Libre Franklin (with ui-sans-serif, system-ui fallback), loaded at weights 400/500/600/700/800.

**Character:** One family carries the entire hierarchy; real weight contrast does the work that two typefaces used to. This is deliberately not a display+body pairing — a single well-chosen family with committed weight/size contrast reads as more considered than a timid two-font pair, and it removes the "two similar sans-serifs competing for the same job" risk entirely.

### Hierarchy
- **Display** (800 weight, clamp(2.5rem, 5vw, 4.5rem)/60–72px desktop, 1.12 line-height, −0.02em tracking): hero H1 only. Ceiling stays at 4.5rem; never scale past 6rem regardless of viewport.
- **Headline** (700 weight, 2.25–2.75rem/36–44px, 1.2 line-height): section H2s (Services, Process, About, CTA).
- **Title** (600 weight, 1.125–1.25rem/18–20px): card and subsection H3s.
- **Body** (400 weight, 0.9375–1.25rem/15–20px, 1.5–1.65 line-height): standard body sits at 15–16px; large intro/subheading body sits at 18–20px. Cap prose measure at 65–75ch.
- **Label** (600 weight, 0.75–0.875rem/12–14px, 0.06em tracking, uppercase): eyebrow labels above section headings, nav labels.

The four-step weight jump (400 → 600 → 700 → 800) is the hierarchy now, not a font swap between tiers — a flat weight scale reads as uncommitted, so Display and Headline must stay visibly heavier than Title/Label, not just larger.

### Named Rules
**The Weight-Not-Italics Rule.** Emphasis in body copy comes from weight (medium/semibold), never italics — consistent with the plain-English, non-decorative voice.

**The Balanced-Heading Rule.** `text-wrap: balance` on all H1–H3s so hero and section headlines never break into an orphaned single word on their own line.

## 4. Elevation

Mostly flat at rest. Depth is conveyed two different ways depending on background: on dark (navy/midnight) sections, large blurred radial glows in teal/cyan (120–140px blur, low opacity, slow 6–10s animation cycles) stand in for shadow entirely — there is no drop-shadow on dark surfaces. On light (white/mist) sections, cards carry a soft, low-contrast ambient shadow at rest that intensifies and lifts slightly on hover; this is the system's only literal shadow usage.

### Shadow Vocabulary
- **card-rest** (`box-shadow: 0 2px 14px -6px rgba(7,26,45,0.08)`): default card elevation on white backgrounds. Barely perceptible — a hint of lift, not a frame.
- **card-hover** (`box-shadow: 0 20px 45px -25px rgba(7,26,45,0.35)`, paired with `translateY(-4px)`): hover state for interactive cards. Still soft-edged; never a hard-edged Material-style shadow.
- **glow-ambient** (`blur: 120–140px`, teal or cyan at 10–20% opacity): the dark-background equivalent of elevation. Represents the beacon's light, not literal depth.

### Named Rules
**The Flat-By-Default Rule.** No surface carries a shadow unless it is a light-background card responding to hover, or a dark-background glow representing the beacon motif. Nothing else gets elevation for decoration's sake.

## 5. Components

Restrained and considered: buttons, cards, and nav should feel calm and precise to interact with, never bouncy, flashy, or attention-grabbing for its own sake — the interaction language of a trusted advisor, not a product trying to convert through pressure.

### Buttons
- **Shape:** fully rounded (`rounded-full`, 9999px) — pill-shaped, consistent across primary and header CTAs.
- **Primary:** teal background (`#2fa7a0`), navy text (`#071a2d`), semibold, `14px 32px` (`px-8 py-3.5` scale) or `px-5 py-2.5` for the compact header variant.
- **Hover / Focus:** background shifts to pale cyan (`#b8eef0`); color transition only, no scale or bounce.
- **Ghost/Text (secondary CTA):** white at 70% opacity on dark backgrounds, transitioning to full white on hover; no border, no fill — used for the low-commitment fallback action (direct email) beside the primary button.

### Cards
- **Corner Style:** `rounded-2xl` (1.25rem).
- **Background:** white, with a hairline border (`charcoal` at 10% opacity).
- **Shadow Strategy:** `card-rest` at rest, `card-hover` + 4px lift on hover (see Elevation).
- **Border:** 1px `charcoal/10` at rest, shifts to `teal/40` on hover.
- **Internal Padding:** 28px (`p-7`).
- **Icon well:** 44×44px, `rounded-xl` (1rem), mist background at rest, shifts to teal at 15% opacity + teal icon color on hover.

### Navigation
- **Style:** sticky navy header, hairline white-10%-opacity bottom border, no shadow.
- **Typography:** Inter, 14px, medium weight, white at 75% opacity, full white on hover — color transition only.
- **Active/CTA:** the pill-shaped primary button (see Buttons) sits inline at the end of the nav, always visible even on mobile (compact variant).
- **Mobile:** the same pill CTA persists; secondary links collapse behind a toggle rather than being dropped.

### Logo mark (signature component)
**Replaced 2026-08-22, twice.** First with a "Signal Window" geometric SVG mark (a quiet outlined square frame with a vertical slit of light), replacing an earlier beam-and-ring mark flagged as generic in design critique. Then, once a real founder-supplied logo became available (`01_Brand/logo.png`), replaced again with that actual mark: a two-tone "P" monogram built from a flag-like negative-space cutout, in deep navy.

**Asset pipeline**: the source `logo.png` (flat off-white background, no transparency) was processed with a distance-threshold alpha algorithm to produce a clean transparent crop of the icon alone, separate from its wordmark. Two colour variants are kept: navy-on-transparent (`public/brand/pharos-mark-navy.png`, light backgrounds and the favicon) and white-on-transparent (`public/brand/pharos-mark-white.png`, the navy/midnight sections where the mark actually appears). Source masters live in `01_Brand/` (`logo-full-transparent.png`, `logo-icon-transparent.png`, `-white` variants, `logo-icon-square.png` for the favicon crop).

**Composition**: the icon mark only, rendered via `components/LogoMark.tsx` (a `next/image` wrapper, `variant="white" | "navy"`, height-constrained with auto width to preserve the mark's true (non-square) proportions). "Pharos Security" stays live HTML text in the site's Libre Franklin type next to it, not baked into the image, so it stays accessible, selectable, and typographically consistent with the rest of the site.

**Usage restrained to genuine logo placements**: header navigation, footer, and the CTA section's large centred mark. Not used decoratively elsewhere on the page.

## 6. Do's and Don'ts

### Do:
- **Do** keep teal to roughly 10% of any surface — a considered detail, not a dominant color (per `01_Brand/colour-palette.md`'s 60/30/10 ratio).
- **Do** pair every teal button fill with navy text, never white text.
- **Do** use `charcoal` for body text on white/mist — never a lighter gray "for elegance."
- **Do** keep motion slow (6–10s ambient cycles) and easing-based; hover states are lift + border/color shift only.
- **Do** use the abstract beacon/beam/glow vocabulary for depth and emphasis — geometric marks and radiating lines, never literal danger or literal lighthouse imagery.

### Don't:
- **Don't** use hooded-hacker imagery, matrix-style falling code, green terminal text, or glowing-padlock stock photography anywhere on the site.
- **Don't** introduce red/black fear-based color schemes, crosshair/weapon iconography, or military/tactical styling (camo, stencil fonts, combat imagery).
- **Don't** add a second saturated accent color (no orange "alert," no green "success") without deliberately extending the palette — this is a one-accent system.
- **Don't** let the site drift toward generic MSP/IT-vendor template territory: no stock cybersecurity imagery, no hero-metric SaaS clichés (big number + small label + gradient accent).
- **Don't** let it read as Big-4/enterprise-consultancy stiff or over-produced — this is a founder-led boutique practice, and the design should never borrow scale signals (dense dashboards, enterprise logo walls, oversized stat blocks) from a segment it explicitly doesn't serve.
- **Don't** use hard-edged Material-style shadows or heavy drop-shadows on any surface; elevation stays soft and low-contrast per the Flat-By-Default Rule.
- **Don't** scale the hero display type past 6rem (~96px) or tighten letter-spacing past −0.04em; the current −0.02em is already near the calm end of that range.
