# Logo Direction

## Current state

The website currently uses a **placeholder SVG mark** ([`BeaconMark.tsx`](../08_Website/pharos-security-site/components/BeaconMark.tsx)) — an abstract beacon shape combining a triangular light-beam silhouette with a radiating circular point. This is functional and on-brand for launch, but should be treated as a first-pass mark, not a final commissioned logo.

## Direction for a final logo

### Concept options to explore

1. **Abstract beam mark** (closest to current placeholder) — a minimal triangular or conical shape suggesting a beam of light, paired with a small radiating point. Works well at favicon size.
2. **Directional point mark** — a single geometric point or dot with 2–4 thin radiating lines, suggesting a fixed reference point rather than a full beam. More minimal, more "consultancy," less "security software."
3. **Compass-adjacent mark** — leaning into the "guidance/navigation" idea rather than "light" specifically — a subtle compass-point or bearing-line abstraction. Only pursue if it doesn't read as generic "compass icon" cliché.

**Recommended starting point:** option 1 or 2 — both extend the existing visual language already built into the website (radiating lines in the hero, the beacon glow) rather than introducing a new metaphor.

### Requirements for the final mark

- Must work as a **standalone mark** (favicon, app icon, social avatar) at 16×16px and still read clearly
- Must work in **single colour** (all-white on navy; all-navy on white) for cases where the two-tone version isn't usable
- Must work in the **wordmark lockup**: mark + "Pharos Security" in Sora, both horizontal and stacked arrangements
- Should avoid literal lighthouse-building iconography — stay abstract
- Should avoid becoming a generic "shield" or "padlock" shape, per [brand-dos-and-donts.md](brand-dos-and-donts.md)

### Clearspace and minimum size (once finalised)

- Clearspace: minimum of the mark's own height on all sides
- Minimum digital size: 24px height for the mark alone; 32px height for the full lockup
- Minimum print size: 15mm height for the lockup

## Suggested next step

Commission a designer (or iterate further with AI-assisted concepting) to produce 3–5 refined variations of the beam/point concept, test at favicon size and on both navy and white backgrounds, then lock a final SVG source file into `01_Brand/assets/` (folder to be created once assets exist).

## Assumptions / needs founder input

- No logo designer engaged yet — this is a placeholder recommendation, not a final decision.
- Once a final logo exists, update `BeaconMark.tsx` and the favicon in the website project, and add the source files (SVG, PNG exports, favicon set) to this folder.
