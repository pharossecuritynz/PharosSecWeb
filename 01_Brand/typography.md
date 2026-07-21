# Typography

## Typefaces

| Role | Typeface | Source | Notes |
|---|---|---|---|
| Headings | **Sora** | Google Fonts, via `next/font/google` | Geometric, confident, slightly technical without being cold. Used for all `h1`–`h4` elements. |
| Body / UI | **Inter** | Google Fonts, via `next/font/google` | Highly legible at small sizes, neutral, works well for long-form report text as well as UI. |

Both are already wired up in [`../08_Website/pharos-security-site/app/layout.tsx`](../08_Website/pharos-security-site/app/layout.tsx) via `--font-sora` and `--font-inter` CSS variables.

## Weights in use

- Sora: 400 (rare), 500, 600 (primary heading weight), 700 (hero headline only)
- Inter: 400 (body), 500 (UI labels, nav), 600 (emphasis, buttons)

## Hierarchy (web)

| Element | Size (desktop) | Weight | Notes |
|---|---|---|---|
| Hero H1 | 3.75–4.5rem (60–72px) | 600 | Tight leading (~1.12), tracking slightly tight |
| Section H2 | 2.25–2.75rem (36–44px) | 600 | |
| Card / subsection H3 | 1.125–1.25rem (18–20px) | 600 | |
| Body (large) | 1.125–1.25rem (18–20px) | 400 | Hero subheading, section intros |
| Body (standard) | 0.9375–1rem (15–16px) | 400 | Card copy, general paragraphs |
| Eyebrow / label | 0.75–0.875rem (12–14px) | 600, uppercase, tracked wide | Section labels above headings |

## Hierarchy (documents / reports)

For Word/PDF-style client deliverables (see [05_Client_Templates](../05_Client_Templates/)):

- Document title: Sora, 24–28pt, bold
- Section headings: Sora, 16–18pt, semibold
- Subheadings: Sora, 13–14pt, semibold
- Body text: Inter, 10.5–11pt, regular
- Tables/data: Inter, 10pt

If Sora isn't available in the document tool being used (e.g. Word without the font installed), substitute a clean geometric sans (e.g. Century Gothic, Poppins, or the system default) for headings and keep Inter (or Calibri/Arial as fallback) for body.

## Voice-through-type principles

- Generous line height on body copy (1.5–1.65) — nothing should feel cramped
- Avoid all-caps for anything longer than a short label
- Avoid italics for emphasis in body copy; use weight (medium/semibold) instead
- Numerals in reports should be tabular where used in tables, for alignment

## Assumptions / needs founder input

- No brand font licence concerns — Sora and Inter are both open-source (SIL Open Font License) and free for commercial use, including in client-facing PDF/Word exports.
