---
target: 08_Website/pharos-security-site
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-07-21T08-13-24Z
slug: 08-website-pharos-security-site
---
Method: dual-agent (A: a8e396b84aa5af6e4 · B: acecc22aad25270ca)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hover/mobile-menu feedback fine; no deliberate keyboard focus states anywhere |
| 2 | Match System / Real World | 3 | Strong plain-English copy, undercut by CTA/service naming collision (below) |
| 3 | User Control and Freedom | 3 | Only conversion path is a bare `mailto:` link, no in-page alternative |
| 4 | Consistency and Standards | 3 | Card headers styled inconsistently across Problem/Services/BuiltForSMEs |
| 5 | Error Prevention | 2 | No fallback if `mailto:` fails to open (locked-down work machines) |
| 6 | Recognition Rather Than Recall | 3 | Footer service links all point to the same generic `#services` anchor |
| 7 | Flexibility and Efficiency | 2 | No skip-to-content link on a long single-page scroll |
| 8 | Aesthetic and Minimalist Design | 3 | Clean at a glance; undercut by repeated eyebrow+H2+grid formula and one glass panel that breaks the system's own vocabulary |
| 9 | Error Recovery | 2 | No confirmation state / expectation-setting after clicking the CTA |
| 10 | Help and Documentation | 2 | No FAQ addressing the exact anxieties PRODUCT.md names (cost, what happens on the call) |
| **Total** | | **26/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**Start here: does this look AI-generated?** Borderline, leaning yes.

**LLM assessment (Assessment A):** Confirms the Services.tsx 8-card grid with meaningless `01`–`08` index numbers is a genuine ban-list hit (decorative numbered scaffolding on a list that isn't a real sequence). Found two more instances independently: an uppercase tracked eyebrow repeated identically across all 5 content sections (Problem, Services, Process, BuiltForSMEs, About — same `text-sm font-semibold uppercase tracking-wide` formula every time), and a glassmorphism panel in About.tsx (`bg-white/[0.04]` + `backdrop-blur-sm` + drop shadow on a dark background) that violates two absolute bans at once. Counter-evidence against a full "yes": no gradient text, no side-stripe borders, no hero-metric template, no hacker/matrix imagery, and a subtle grain-texture overlay that shows real craft.

**Deterministic scan:** Static-source CLI scan (`detect.mjs` over the 9 component files) came back clean — 0 findings. The **live-DOM overlay scan** (rendered page, computed styles) found 19 hits, most usefully:
- `gpt-thin-border-wide-shadow` (1 hit): the exact same About.tsx panel the LLM review flagged independently — **cross-validated by both assessments**, this is the highest-confidence finding in the whole report.
- `all-caps-body` (2 hits): the Hero eyebrow badge (44 chars) and Footer tagline (31 chars) are rendered in `uppercase` at a length long enough to hurt legibility — this also breaks Pharos's own `01_Brand/typography.md` rule ("avoid all-caps for anything longer than a short label").
- `ai-color-palette` (15 hits, "neon cyan/teal"): likely a **false positive** — Assessment B cross-checked against `globals.css` and confirmed teal (#2fa7a0) and cyan (#b8eef0) are muted, low-saturation, deliberately restrained brand tokens, not neon. The detector appears to pattern-match on color-name role rather than actual computed lightness/chroma.
- `overused-font` (1 hit, "Inter 64% of text"): **false positive** — this is a standard, deliberate two-font heading/body system (Sora + Inter), not font sprawl.

Static-source scan (0 findings) and live-DOM scan (19 findings, several real) disagree because they measure different things — source AST vs. rendered computed styles. The rendered-page result is the more trustworthy signal here since several of its hits corroborate independent LLM findings.

## Overall Impression

The token discipline is genuinely good — buttons, cards, shadows, and the beacon motif all match DESIGN.md's spec values precisely, and the copy delivers on the brand's calm, plain-English promise better than most first drafts. But the page currently asks a nervous, non-technical, "wary of being sold to" visitor (exactly who PRODUCT.md describes) to parse 8 undifferentiated service options with no prioritization, at the same time as a naming collision between the free "book a review" CTA and the paid "Cyber Risk Review" service quietly undermines the "no obligation" promise on the same screen. The single biggest opportunity is making the page do less, more confidently — cut the Services grid down to a prioritized entry point, and put a real person in About.tsx to make good on "founder-led, advisor across the table."

## What's Working

1. **Token discipline on load-bearing elements.** Buttons (`rounded-full`, teal/navy, cyan hover), card shadows (matching `card-rest`/`card-hover` from DESIGN.md exactly), and the Services icon-well hover treatment all match the documented design system precisely, not approximately.
2. **Restrained use of the beacon motif.** Geometric, abstract, appears only in header/CTA/footer — never literalized into a lighthouse illustration, exactly per DESIGN.md's "one literal symbol permitted" rule.
3. **The grain-texture overlay** on dark sections (5% opacity SVG turbulence, `mix-blend-mode: overlay`) is a considered, non-obvious polish detail most generic output skips.

## Priority Issues

- **[P1] About.tsx panel breaks two absolute bans at once — cross-validated by both assessments.**
  **Why it matters:** `bg-white/[0.04]` + `backdrop-blur-sm` + `shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]` on a dark (midnight) background is textbook glassmorphism, and it violates DESIGN.md's own Flat-By-Default Rule (dark surfaces get glow, never shadow). It's also the only element both the LLM review and the live-DOM detector independently flagged — the highest-confidence issue in this report.
  **Fix:** Drop `backdrop-blur-sm` and the black drop-shadow; replace with the documented `glow-ambient` treatment (a blurred teal/cyan radial) plus the existing hairline border.
  **Suggested command:** `/impeccable polish 08_Website/pharos-security-site/components/About.tsx`

- **[P1] Services section overloads a first-time visitor with 8 undifferentiated, unprioritized options.**
  **Why it matters:** Violates both the ≤4-items chunking rule and the ≤4-choices-per-decision-point rule. PRODUCT.md explicitly describes this audience as "short on time... more receptive to clarity and prioritisation than a long technical audit" — this section hands them the opposite. The `01`–`08` index numbers are purely decorative and read as AI-default scaffolding.
  **Fix:** Group into 2-3 labeled clusters (e.g. "Start here" vs "Ongoing support") or surface 3-4 primary offerings with a "see all services" link for the rest; drop the decorative numbering.
  **Suggested command:** `/impeccable layout 08_Website/pharos-security-site/components/Services.tsx`

- **[P1] Teal eyebrow labels fail WCAG AA contrast on light backgrounds.**
  **Why it matters:** `text-teal` (#2fa7a0) at `text-sm font-semibold` on white/mist backgrounds (Problem.tsx, Services.tsx, BuiltForSMEs.tsx) computes to ~2.9:1 — fails the 4.5:1 normal-text and 3:1 large-text AA thresholds, directly contradicting `01_Brand/colour-palette.md`'s own stated rule that teal is button/large-text/icon-only, never small text on white.
  **Fix:** Switch these eyebrow labels to `text-navy` or `text-charcoal` on light backgrounds; reserve teal-as-text for dark sections where it correctly appears as cyan.
  **Suggested command:** `/impeccable audit 08_Website/pharos-security-site`

- **[P2] CTA and service naming collision undermines the "no obligation" promise.**
  **Why it matters:** The primary CTA "Book a cyber risk review" (used in Header, Hero, CTA, Footer) is verbatim identical to the paid Service #1 "Cyber Risk Review." CTA.tsx promises "a straightforward conversation... no obligation" one line below a button that sounds like it commits to the paid deliverable — exactly the ambiguity a "wary of being sold to" visitor (per PRODUCT.md) would hesitate over.
  **Fix:** Rename the top-of-funnel CTA to something lower-commitment (e.g. "Start a conversation"); reserve "Book a Cyber Risk Review" for the service card itself.
  **Suggested command:** `/impeccable clarify 08_Website/pharos-security-site`

- **[P2] All-caps text runs long enough to hurt legibility — detector-confirmed, breaks the project's own typography rule.**
  **Why it matters:** The Hero eyebrow badge (44 chars) and Footer tagline (31 chars) render fully uppercase. `01_Brand/typography.md` explicitly states "avoid all-caps for anything longer than a short label" — these two instances are the live-DOM detector's clearest confirmed (non-false-positive) hits.
  **Fix:** Set these two strings in sentence case, or shorten them to genuine short-label length if uppercase treatment is wanted.
  **Suggested command:** `/impeccable typeset 08_Website/pharos-security-site`

## Persona Red Flags

**Jordan (confused first-timer):** Hits the 8-card Services wall with no "start here" signal; can't tell if the CTA button is a paid booking or a free chat (naming collision above); never sees a named human in About.tsx despite the site's "founder-led, advisor across the table" positioning — undermines exactly the trust Jordan needs before emailing a stranger.

**Riley (stress-tester):** Zero `focus:`/`focus-visible:` classes exist anywhere in the codebase (grep-confirmed) — keyboard navigation relies entirely on unstyled browser defaults against a navy background, unverified. No `text-wrap: balance` implementation despite DESIGN.md mandating it on all H1–H3 (zero matches for `balance` in the codebase) — real risk of orphaned headline words at in-between viewport widths. The only conversion path is a bare `mailto:` link with no pre-filled subject/body.

**Casey (distracted mobile user):** At narrow widths the Services grid collapses to a single column (`grid-cols-1`), turning the already-overloaded 8-card set into a long single-column scroll of near-identical blocks on a phone — the worst rendering of the P1 chunking issue for someone skimming one-handed. Partial mitigation: the compact "Book a review" pill stays visible in the mobile header at all scroll depths.

## Minor Observations

- Mechanical bug (new, from live-DOM evidence): the sticky navy header overlaps scrolling content with no scroll-margin/fade mask on general scroll (not just anchor-jump) — heading text and a bordered content box were observed clipped directly under the header at two separate scroll positions.
- `beam-travel` animation runs at 5s, slightly faster than DESIGN.md's documented 6-10s "ambient" motion range.
- Footer copyright/tagline text (`text-white/40`) and eyebrow labels (`text-white/35`) on midnight background compute to roughly 3.7:1 or lower — likely fails AA, same underlying issue as the teal-on-light problem but on dark surfaces.
- Hero trust-point text (`text-white/45` on navy) computes to ~4.44:1 — right at the AA boundary; worth nudging up for safety margin.
- No "back to top" affordance on a fairly long single-page scroll.
- Footer service links all route to the same generic `#services` anchor rather than deep-linking to each specific card.

## Questions to Consider

1. What if Services collapsed to 3-4 clearly prioritized entry points (e.g. "Not sure where to start? Book a Cyber Risk Review" as the hero of that section) instead of listing all 8 offerings as coequal — would that better match the "prioritisation over audit" promise in PRODUCT.md's belief ladder?
2. What if About.tsx put an actual founder name/photo/one-line credential where the abstract glass panel currently sits — does "founder-led, advisor across the table" survive contact with a page that never names a person?
3. What if the primary CTA and the Cyber Risk Review service were deliberately renamed to be distinguishable — does that resolve more of the "wary of being sold to" anxiety than any visual polish could?
