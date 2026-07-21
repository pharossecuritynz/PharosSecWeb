# Colour Palette

## Core palette

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#071A2D` | Primary dark background (header, hero, process, final CTA, footer base) |
| Midnight Blue | `#0B2438` | Secondary dark background for layering/variation (About section, footer) |
| White | `#FFFFFF` | Primary content background, primary text on dark |
| Soft Mist | `#EEF5F6` | Secondary light background for section variation and cards |
| Restrained Teal | `#2FA7A0` | Primary accent — CTAs, icons, links, highlights |
| Pale Cyan | `#B8EEF0` | Secondary accent — glows, small highlights, hover states, eyebrow text on dark backgrounds |
| Charcoal | `#17212B` | Primary body text on white/mist backgrounds |

## Usage ratios (guideline)

Roughly **60% neutral (navy/white/mist), 30% charcoal/text, 10% teal/cyan accent.** If a layout feels "teal-heavy," pull it back — the accent should feel like a considered detail, not a dominant colour.

## Pairing rules

| Background | Text | Accent |
|---|---|---|
| Deep Navy | White / White at 65–75% opacity for body copy | Teal (buttons), Pale Cyan (eyebrow labels, small UI) |
| White | Charcoal | Teal (links, icon backgrounds, borders on hover) |
| Soft Mist | Charcoal | Teal (borders, icon backgrounds) |
| Midnight Blue | White / White at 65–75% opacity | Teal, Pale Cyan |

## Accessibility notes

- White text on Deep Navy and Midnight Blue passes WCAG AA for body text at normal sizes.
- Charcoal on White and Charcoal on Soft Mist both pass WCAG AAA for body text.
- **Caution:** Restrained Teal (`#2FA7A0`) on White does **not** reliably pass AA for small body text — use teal for large text, icons, borders, and buttons (with dark text on top of the teal button, as already implemented on the website: navy text on teal background), not as small body copy on white.
- Pale Cyan should only be used on dark backgrounds (navy/midnight), never as text on white or mist.

## CSS custom properties (already implemented)

```css
--navy: #071a2d;
--midnight: #0b2438;
--mist: #eef5f6;
--teal: #2fa7a0;
--cyan: #b8eef0;
--charcoal: #17212b;
```
Defined in [`../08_Website/pharos-security-site/app/globals.css`](../08_Website/pharos-security-site/app/globals.css).

## Do / don't

**Do:** use teal as a single, confident highlight (a button, an icon, a border on hover).
**Don't:** introduce additional accent colours (no orange "alert" colour, no green "success" colour) — if a status colour is ever needed (e.g. in a future client portal), extend this palette deliberately rather than reaching for an off-brand default.
