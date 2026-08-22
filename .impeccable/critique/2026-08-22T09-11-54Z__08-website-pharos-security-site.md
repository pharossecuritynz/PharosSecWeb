---
target: 08_Website/pharos-security-site (homepage + IT Provider Security Assurance page)
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-08-22T09-11-54Z
slug: 08-website-pharos-security-site
---
Method: dual-agent (A: general-purpose design review · B: general-purpose detector/evidence)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No active-section highlighting on scroll; no confirmation state when a CTA is clicked |
| 2 | Match Between System and Real World | 4 | Genuinely plain-English, addresses real owner anxieties directly |
| 3 | User Control and Freedom | 3 | No forms to escape; minor gap: no "back to top" on a long page |
| 4 | Consistency and Standards | 2 | Eyebrow-label kicker appears on 2 of 7 homepage sections with no visible rule for when |
| 5 | Error Prevention | 3 | No forms to get wrong, but see #9 |
| 6 | Recognition Rather Than Recall | 3 | Every icon is paired with a text label; no icon-only nav |
| 7 | Flexibility and Efficiency of Use | 2 | No skip-to-content link on a sticky-header long-scroll page |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained palette genuinely followed; docked for the repeated icon-card formula |
| 9 | Error Recovery | 1 | Every primary CTA is a bare `mailto:` link with zero visible fallback if it silently fails |
| 10 | Help and Documentation | 2 | No FAQ; no "what does booking a call commit me to" reassurance beyond one line of subtext |
| **Total** | | **25/40** | **Acceptable — real gaps, not a broken foundation** |

#### Anti-Patterns Verdict

**Does this look AI-generated? Borderline — and the user's specific complaint ("common fonts and formats") is more accurate than a blanket "looks AI generated."**

**LLM assessment (Assessment A):** Checked against the parent skill's absolute-ban list and the brand register's reflex-reject lists. The cartoonish slop tells are genuinely absent: no gradient text, no glassmorphism-as-decoration, no hero-metric stat blocks, no stock hacker photography, no side-stripe borders. `PRODUCT.md`'s own anti-references are respected. But two real tells remain: **Sora + Inter is a literal reflex-reject font pairing** (Inter is named verbatim on the ban list in `reference/brand.md`; Sora sits in the same over-used geometric-display lane as Space Grotesk/Outfit, both also banned), and **the icon-in-rounded-square card formula repeats identically across Services and BuiltForSMEs** — exactly the "large rounded-corner icons above every heading, screams template" pattern the brand register bans by name. The overall composition (navy/white alternating bands, pill buttons, icon-well cards) is coherent and matches `DESIGN.md`'s documented system, but it's also close to the modal boutique-SaaS-consultancy layout a person could sketch from the category alone — the first-order reflex the skill warns about.

**Deterministic scan (Assessment B):** The bundled detector ran clean (`[]`, exit 0) across `app/` and `components/`. This does **not** contradict Assessment A — the detector's regex/static-html rules don't include a named-font blocklist check against `reference/brand.md`'s curated list, and several relevant rule categories (`low-contrast`, `layout-transition`, visual-engine rules) require a real browser and weren't evaluated at all (no browser tool was available in this pass — flagged explicitly as a degraded evidence path, not a clean bill of health on those specific checks). What the scan *does* independently confirm: only two font families are declared anywhere in the codebase (Sora/Inter, `layout.tsx:2`), the identical eyebrow-chip className string appears in exactly 2 places (`Hero.tsx:49`, `page.tsx:49`), `rounded-2xl` is used identically across `Services.tsx`, `Problem.tsx`, and `BuiltForSMEs.tsx`, and the 6-token color palette is applied consistently with no stray hex codes. These hard counts corroborate Assessment A's specific findings rather than contradicting them.

**Visual overlays:** Not available — no browser automation tool was exposed in this session, so no in-page overlay could be injected. Both assessments used source reading and WebFetch (HTML-to-markdown, so no computed styles/contrast) as fallback evidence instead. This is a real gap: contrast ratios and responsive rendering were not independently verified this pass.

#### Overall Impression

The site is not a slop dump — the copy voice is disciplined, the beacon/glow motif is a genuine, restrained visual signature, and the worst AI-generated clichés were already avoided. But the two things a visitor's eye and the user's own gut both catch first — the font pairing and the repeated card shape — are real, specific, fixable instances of exactly the genericness being complained about. The single biggest functional risk found (not what was asked about, but too important to bury) is that every conversion point on the site is an unmonitored `mailto:` link with no fallback.

#### What's Working

1. **The beacon/glow motif is restrained and distinctive.** Slow 8s ambient drifts, abstract geometric mark (not a literal lighthouse) — executed exactly as `DESIGN.md` specifies, and it's the one place the site earns "considered system" over "template default."
2. **Copy voice does real positioning work.** `Problem.tsx`'s six owner questions and the IT-provider page's "complementary, not adversarial" framing are specific and written with real understanding of the buyer's actual anxiety, not filler.
3. **The two-tier Services layout is a genuine UX decision.** Two featured cards then three labelled clusters is legitimate progressive disclosure, not a card dump.

#### Priority Issues

**[P1] Font pairing is a literal reflex-reject violation — the biggest driver of the "common fonts" complaint**
- **Why it matters**: Typography is the fastest signal a visitor's eye reads as "template" vs. "considered," and Inter is named verbatim on the ban list; Sora sits in the same over-used lane as other banned display faces.
- **Fix**: Run the font-selection procedure properly — three concrete brand-voice words derived from the actual brand personality, then a real foundry browse rejecting the first "designy" option.
- **Suggested command**: `/impeccable typeset`

**[P1] Every primary CTA site-wide is a bare `mailto:` link with no visible fallback**
- **Why it matters**: This is the one conversion action the whole site exists to drive. A visitor without a configured desktop mail client (common on Chrome/webmail-only setups) clicks and nothing visibly happens — no error, no feedback, just silence, on the highest-stakes moment in the funnel.
- **Fix**: Visible plain-text email adjacent to every primary CTA button (Header and Hero currently have none at all), and/or a copy-to-clipboard affordance with on-click confirmation.
- **Suggested command**: `/impeccable harden`

**[P2] Icon-in-rounded-square card formula repeats identically across two sections**
- **Why it matters**: Services and BuiltForSMEs use the same icon-well + heading + paragraph shape, which reads as one component copy-pasted with new text — a named brand-register ban.
- **Fix**: Differentiate the two sections; BuiltForSMEs is a reasons list, not a navigable choice, so it likely doesn't need an icon well at all.
- **Suggested command**: `/impeccable quieter` or `/impeccable layout`

**[P2] 13-item flat checklist on the IT-provider page exceeds working-memory limits**
- **Why it matters**: Presented to the least technical audience as one undifferentiated list, well past the 8-item "overloaded" threshold.
- **Fix**: Group into 3–4 labelled clusters (identity & access, protection & recovery, visibility & response, provider accountability).
- **Suggested command**: `/impeccable clarify` or `/impeccable layout`

**[P3] Eyebrow-label kicker applied inconsistently**
- **Why it matters**: Appears on Services and the IT-provider "how this works" section only, with no visible rule — reads as unfinished rather than intentional.
- **Fix**: Either commit to it as deliberate section grammar everywhere, or drop it in favour of the plain H2 treatment already used on most sections.
- **Suggested command**: `/impeccable typeset`

#### Persona Red Flags

**Jordan (Confused First-Timer)**: Clicks "Book a 15-minute conversation" in the header expecting something visible to happen; instead a `mailto:` link silently attempts to fire, with no fallback text near that specific button. The IT-provider page's 13-item list uses unglossed jargon ("privileged administration practices") for a reader `PRODUCT.md` itself says should never hit unexplained technical terms. No FAQ addresses "what does booking actually commit me to."

**Casey (Distracted Mobile User)**: Primary CTAs sit at the top of viewports, not the mobile thumb zone; no sticky bottom CTA bar. Partial mitigant: `mailto:` links are more reliable on phones than desktop, so this persona is less exposed to the P1 CTA issue than Jordan. The 13-item checklist collapses to one long uninterrupted column on mobile.

#### Minor Observations

- `Header.tsx` and `Footer.tsx` duplicate the nav-links array verbatim.
- Mobile menu has no close-on-outside-click or Escape handler.
- `beacon-sweep`, `fade-up`, and `beam-travel` animations have no `prefers-reduced-motion` alternative anywhere in `globals.css`.
- Footer's four service links all point to the same `#services` anchor regardless of which is clicked.

#### Questions to Consider

- If the brand is "closer to a specialist design studio than a security vendor," what would the type choice look like starting from that sentence instead of "clean sans-serif pairing for a SaaS-adjacent site"?
- The site asserts "independent, plain-language, right-sized" four separate times across four sections. What would it look like to spend that repetition budget on one concrete artifact instead — a redacted example finding or plan excerpt?
- What happens today when a visitor clicks the CTA and no mail app opens? Known gap, or just not noticed yet?
