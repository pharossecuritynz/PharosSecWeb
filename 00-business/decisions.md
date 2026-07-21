---
title: Decision Log
status: approved
owner: Oscar
last-reviewed: 2026-07-22
review-cycle: on every material decision
---

# Decision Log

Running record of material decisions. Each entry is dated, states the decision, the reasoning, and who made it. This is the source of truth when documents disagree with each other.

## 2026-07-22: Question 5 closed with an ASSUMPTION, not an answer

**ASSUMPTION, not CONFIRMED.** Oscar asked for question 5 to be answered. It could not be, in the normal sense: it asks for real facts about insurance, legal engagement, certification, and business/domain registration that only Oscar has, and inventing a specific status for any of them (for example, claiming insurance is bound) would be fabricating a fact with real liability consequences if acted on. Instead, all five items in `09-project-management/decisions-required.md` question 5 default to the conservative assumption ("not yet in place") until Oscar corrects the specific ones that are wrong. This keeps the business's actual readiness state honest: it does not manufacture a false "ready to take a client" position, and it does not silently unblock the active-testing services gated on question 1. If any of the five are actually done, the correction should name the specific item and its real status, not a blanket "yes."

## 2026-07-22: Questions 1 to 4 in decisions-required.md answered

**CONFIRMED.** Oscar accepted the stated recommendation for each of the four judgement-call questions raised in `09-project-management/decisions-required.md`. Question 5 (insurance, legal, certification, and registration status) was not answered, because it asks for facts rather than a recommendation to accept.

1. **Advisory-only launch, not active technical testing.** Vulnerability Assessment, External Attack Surface Review, and their supporting agents and tooling stay in "build after client validation," gated on question 5's answers. `02_Business_Strategy/risk-boundaries.md` and `03_Services/service-boundaries.md` are unchanged, since this keeps the existing boundary rather than reversing it. Digital Exposure Review (passive research only) is not gated by this.
2. **Migrate to the kebab-case folder taxonomy.** Confirmed, but not yet executed. No longer needs to wait on a service catalogue rewrite (question 1 kept the status quo), so it is queued as a standalone task in `09-project-management/backlog.md` rather than run immediately.
3. **Keep "Cyber Risk Review" as the front-door service name.** Not renamed to "Security Posture Review." Digital Exposure Review added as a second entry point.
4. **Free discovery call: 15 minutes, structured.** `04_Operating_Manual/discovery-call-process.md` and `04_Operating_Manual/client-intake-process.md` revised to match.

See `09-project-management/decisions-required.md` for the full resolution text and what each answer unblocks.

## 2026-07-21: Founder identified as Oscar

**CONFIRMED.** Master Build Directive states Pharos Security is founded by Oscar. Placeholder `[Founder Name]` fields updated across `06_Sales_and_Marketing/about-page-copy.md`, `06_Sales_and_Marketing/linkedin-profile-copy.md`, `06_Sales_and_Marketing/proposal-email-template.md`, and `06_Sales_and_Marketing/referral-partner-one-pager.md`. Bio, background, and credentials still needed. See question 5 in `09-project-management/decisions-required.md`.

## 2026-07-21: Master Build Directive received and partially reconciled

**CONFIRMED, partially actioned.** A comprehensive operating directive was received, specifying a new folder taxonomy, an em dash prohibition, a 16-agent build-now catalogue, an expanded service model including active technical testing, and an 8-phase implementation plan. Per the directive's own governance section (do not generate hundreds of files before checking in), a reconciliation review was produced first: `09-project-management/current-state-review.md`. Two conflicts with the existing, already-built 91-file studio were significant enough to raise as open questions rather than resolve by assumption, logged in `09-project-management/decisions-required.md`:

1. Whether Pharos launches advisory-only or includes active technical testing (vulnerability assessment, external attack surface scanning) from the start. This reverses a deliberate existing boundary set because insurance and certification status were unconfirmed.
2. Whether to migrate the existing folder structure into the directive's kebab-case taxonomy.

Pending those answers, leadership and process scaffolding was built (this file, the backlog, sprint, risk, changelog, and milestone files, `CLAUDE.md`, the agent and workflow standards, and the Project Lead Agent specification), since none of that depends on the two open questions.

## 2026-07-21 (earlier): Website floating hero card removed

**CONFIRMED.** A floating "priority report" card was added to the website hero as a visual enhancement, then explicitly rejected by Oscar as unprofessional. Removed; hero reverted to a single-column layout. Recorded here because it is a real instance of the directive's own warning against decorative, AI-startup-pattern visual elements (floating cards without purpose), independently arrived at before the directive existed.

## 2026-07-21 (earlier): Pricing validated against published market data

**CONFIRMED.** All 8 service prices checked against published NZ and AU sources (vCISO retainer rates, SME assessment baselines, awareness training pricing). Two ranges revised: Cyber Risk Review raised from $1,500 to $4,200 range to $1,800 to $4,200; Ongoing Cyber Advisor Support raised from $400 to $1,200 per month to $500 to $1,500 per month. Full sourcing in `02_Business_Strategy/pricing-strategy.md`.

## 2026-07-21 (earlier): Website relocated into 08_Website/pharos-security-site/

**CONFIRMED.** The Next.js project was originally scaffolded at the project root. Moved into `08_Website/pharos-security-site/` to match the requested studio structure, with `.claude/launch.json` updated to run `npm --prefix 08_Website/pharos-security-site run dev`.

## Prior brand and business decisions (established 2026-07-21, first build)

**CONFIRMED**, all recorded in detail in their source documents, summarised here for a single point of reference:

- Business name: Pharos Security. Primary tagline: "Clear guidance. Safer business." See `01_Brand/tagline-options.md`.
- Colour palette: Deep Navy #071A2D, Midnight Blue #0B2438, White, Soft Mist #EEF5F6, Restrained Teal #2FA7A0, Pale Cyan #B8EEF0, Charcoal #17212B. See `01_Brand/colour-palette.md`.
- Typography: Sora for headings, Inter for body. See `01_Brand/typography.md`.
- Target market: New Zealand SMEs, roughly 5 to 100 staff, no in-house security expertise. See `02_Business_Strategy/target-market.md`.
- Eight-service catalogue (Cyber Risk Review, SME Security Uplift Plan, Microsoft 365 Security Basics Review, Email and Phishing Readiness, Incident Readiness Workshop, Staff Cyber Awareness Sessions, Security Policy and Checklist Starter Pack, Ongoing Cyber Advisor Support). See `03_Services/service-catalogue.md`.
- Hard scope exclusions: no 24-hour monitoring, no penetration testing, no forensic incident response, no compliance certification issuance, no legal advice. See `03_Services/service-boundaries.md`. This is the boundary directly in tension with the new directive's active-testing service list; see open question 1.
