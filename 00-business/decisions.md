---
title: Decision Log
status: approved
owner: Jason Hill
last-reviewed: 2026-09-09
review-cycle: on every material decision
---

# Decision Log

Running record of material decisions. Each entry is dated, states the decision, the reasoning, and who made it. This is the source of truth when documents disagree with each other.

## 2026-09-09: Pivot from building Pharos to validating Pharos commercially

**CONFIRMED**, per a direct, detailed operating directive from Jason Hill. Full detail in the new canonical `00-business/pharos-current-strategy.md`, which now governs strategy, positioning, service, and pricing questions; this entry records the decision and reasoning, not the full content.

1. **Strategic reframe.** For roughly the next 90 days, commercial evidence (real prospect conversations, paid pilot engagements, referral behaviour) is more valuable than further internal build. Explicitly deprioritised: further agent specifications, additional scanning/tooling capability, a client portal, the remaining service-name rename, and the folder-taxonomy migration. None of this is deleted; see `09-project-management/build-now-later-stop.md`.
2. **ICP narrowed for the validation beachhead**, from the standing 5 to 50 (previously 5 to 100) staff range to New Zealand professional-services businesses, roughly 15 to 50 staff, on Microsoft 365, with an outsourced MSP, handling valuable transactions or confidential information, no internal security specialist. Priority sectors: accounting, bookkeeping, payroll, legal, property-related professional services, engineering, consulting. This is a beachhead for testing, not a permanent exclusion of the broader range; healthcare is deliberately kept out of this specific beachhead (sensitivity exceeds what this phase needs to prove), and very small retail/hospitality/trades are deprioritised absent a strong trigger. See target-market.md's superseded-notice banner.
3. **Service offering consolidated to one core paid service, sold two ways, plus one lighter follow-on**, for the active validation window: Independent Security Review (kept under its existing confirmed name, not renamed again — see the canonical doc's "naming decisions" section for why), IT Provider Security Assurance (the same review, a different entry trigger, not a second flagship), and a new lighter follow-on, Remediation Assurance (`03_Services/remediation-assurance.md`), distinct from and smaller than Secure Foundations. Secure Foundations, Incident Readiness, and Security Adviser remain valid, fully documented services, marked BUILD LATER rather than discarded; Security Adviser specifically should only ever be sold as an upsell after value is demonstrated, never the primary cold-sale proposition. Full categorisation in the revised `03_Services/service-catalogue.md`.
4. **Pricing reconciled, not overwritten.** The July 2026 market-validated $1,800 to $4,200 range for the core review stands as evidence; a founder-directed active pricing hypothesis (paid pilot $1,500 to $2,500 for the first 3 to 5 reference customers, standard $2,500 to $5,000 thereafter) is layered on top to test against real conversations, deliberately running slightly above the previously-validated midpoint. This gap is logged as an open assumption in `09-project-management/pharos-assumption-register.md`, not silently resolved either way. Economic target: effective delivery rate eventually exceeding $180 to $200/hour, tracked per engagement in the new `10_Admin/delivery-economics-tracker.csv`.
5. **Founder background figure corrected**: 26 years in IT, roughly 15 substantially focused on cyber security/security operations (previously stated more generally as "around fifteen years across IT support, network security, and cyber security operations"). Founder-confirmed directly; applied to `06_Sales_and_Marketing/about-page-copy.md` and the live website's About section.
6. **New commercial-validation infrastructure created**: `09-project-management/pharos-assumption-register.md`, `09-project-management/validation-checkpoints.md` (30/90-day double-down/continue/stop thresholds), `10_Admin/commercial-validation-tracker.csv` (pipeline tracker), `10_Admin/delivery-economics-tracker.csv` (per-engagement margin tracker), and `06_Sales_and_Marketing/validation-outreach-kit.md` (buyer intro, warm-intro ask, MSP partner pitch, triggered outreach). Deliberately markdown/CSV, not software; per the directive's own instruction not to build a CRM application.
7. **Live website updated** to match: homepage services section narrowed from a seven-service grid to one foregrounded core service with the follow-on referenced as a later step, not a co-equal flagship; About section gained the founder bio that was previously entirely absent (flagged since 2026-07-21 as the largest credibility gap on the site); a couple of "questions we hear" cards swapped to name invoice fraud/BEC explicitly, which was in the trigger list but not yet on the page. No visual redesign; the existing premium visual identity is preserved throughout.
8. **The business-readiness gate is unchanged.** Insurance, a lawyer-reviewed Terms of Engagement, business registration, and domain registration are still not in place (question 5, unchanged). This pivot does not authorise taking payment from a real client; it authorises real discovery conversations with prospects and partners, which don't require any of the above. Sequence: validate demand now, close the legal/insurance gate before the first invoice.

## 2026-08-31: Exposure Snapshot rebuilt as a free, automated tool

**CONFIRMED**, per a direct question put to Jason Hill before implementation, since it changes pricing (`CLAUDE.md` rule 8). The founder's build brief for a self-serve domain-scanning web tool used the name "Exposure Snapshot" for a free, automated capability, while `03_Services/exposure-snapshot.md` already defined a paid ($400 to $900), manually-delivered service of the same name, added 2026-08-22. Asked directly how these should relate; Jason confirmed the recommended resolution: **the automated tool becomes the free entry point, replacing the manually-delivered paid version.**

This does not conflict with the Free Security Health Check: that service is self-reported (internal practices a scan can't see), while Exposure Snapshot is independently observed (external footprint a self-report can't verify) — the two are complementary, not duplicate, and both now sit as free first-touch options ahead of the 15-minute Security Conversation. `03_Services/exposure-snapshot.md` and `service-catalogue.md` (summary table, funnel diagram, selection guide) are updated accordingly. No client has been quoted the old $400 to $900 price; Pharos has no paying clients yet (see `decisions-required.md` question 5), so this is a service-definition change, not a broken commitment.

The technical build (architecture, provider choices, data model) is tracked separately in `08_Website/pharos-security-site/docs/`, not duplicated into this business decision log.

## 2026-08-29: Assessment methodology upgrade — two architecture decisions

**CONFIRMED**, made while executing a founder-directed upgrade of Pharos's assessment methodology, evidence model, risk model, privacy capability, and reporting framework. Full detail in `09-project-management/process-and-reporting-gap-analysis.md` and `09-project-management/process-upgrade-changelog.md`; only the two decisions with lasting effect on other documents are recorded here.

1. **"Pharos Security Posture Review" is the report name, not a new service name.** The founder's brief asked for a flagship "Pharos Security Posture Review" as the primary assessment. The service catalogue was deliberately renamed from "Cyber Risk Review" to "Independent Security Review" on 2026-08-22, with recorded commercial reasoning (see that entry below). Re-renaming the service now would silently reverse a considered decision. Resolution: the service keeps its confirmed name, Independent Security Review; the report it produces is titled the Pharos Security Posture Review. See `05_Client_Templates/security-posture-review-report-template.md` and `04_Operating_Manual/reporting-standards.md`.
2. **No third folder structure.** The founder's brief asked for new top-level `docs/` and `templates/` folders. `CLAUDE.md` already forbids this explicitly ("Do not create a third structure"). Every requested document was mapped into the existing `04_Operating_Manual/`, `05_Client_Templates/`, `09-project-management/`, and `10-automation/` folders instead, per `CLAUDE.md`'s own instruction to check for an existing home before creating a new one. Full mapping table in the gap analysis.

## 2026-08-24: Founder name corrected to Jason Hill; question 5 confirmed, not just assumed

**CONFIRMED.** Two related updates from a direct conversation with the founder:

1. **Founder name.** Every prior reference to "Oscar" across the repository (this file, `CLAUDE.md`, `AGENTS.md`, agent specifications, sales and marketing copy, and project-management docs) has been corrected to **Jason Hill**, the founder's real name. "Oscar" was the Master Build Directive's placeholder name (see the 2026-07-21 entry below); it was never a deliberate business alias.
2. **Question 5 in `09-project-management/decisions-required.md` moves from ASSUMPTION to CONFIRMED.** Jason was made redundant from his role at timbre Digital and is building Pharos Security from that starting point: an idea, not an already-trading business. He confirmed directly that none of the five items (insurance, Terms of Engagement, certification, business registration, domain registration) are in place yet. This replaces the 2026-07-22 conservative default with a founder-confirmed fact; the practical consequence is unchanged (the business still cannot take a paying client or approach a real prospect), but the epistemic status is stronger.

Also: a first-draft pitch document was written at `06_Sales_and_Marketing/business-pitch.md`, covering what Pharos does, how, who it's for, and the benefit case, with the founder's real background (redundancy from timbre Digital as the impetus for starting Pharos) worked into the bio. It is explicitly marked as a draft not yet ready for external use, given question 5's status.

## 2026-08-22: Public pricing paused, not decided against

**PAUSED, not reversed.** "From" price ranges were briefly live on every service card on the website. Jason Hill asked for them to be removed, wanting to keep the public-pricing question for further discussion rather than settle it now. Removed from the homepage Services section and the IT Provider Security Assurance page. The underlying ranges and their NZ/AU/UK market research in `02_Business_Strategy/pricing-strategy.md` are untouched and remain the working internal reference for quoting on a call; only the decision to display them publicly is on hold. Revisit when Jason Hill wants to pick the question back up.

## 2026-08-22: Pharos v2 — assurance-led positioning and service architecture

**CONFIRMED**, per a detailed operating brief from Jason Hill. This supersedes the front-door service naming in the 2026-07-22 entry below and sharpens (rather than reverses) the advisory-only decision. Recorded in full so later documents don't need to re-derive the reasoning.

1. **Core reframe: Pharos sells independent security assurance, not a menu of assessments.** The existing service list, brand voice, and advisory-only boundary were already sound (see `09-project-management/current-state-review.md`); the change is what's foregrounded. Website and sales copy now lead with the client's uncertainty ("is our security actually good enough, and would we know if it wasn't?") rather than with service names.
2. **Service architecture consolidated to seven customer-facing services**, replacing the flat eight-service catalogue:
   - Free Security Health Check (new — self-serve questionnaire, replaces having no zero-cost entry point)
   - Exposure Snapshot (new — externally-observable-only review; a lighter, cheaper sibling to the flagship review, standing in for the previously-approved "Digital Exposure Review" second entry point from the 2026-07-22 answer to question 1)
   - Independent Security Review (renamed from Cyber Risk Review — this reverses the "keep Cyber Risk Review" answer to question 3 below, because this new brief explicitly directs the rename and gives the commercial reasoning: "Independent Security Review" states the value proposition in the name itself, where "Cyber Risk Review" reads as one technical exercise among many)
   - IT Provider Security Assurance (new — makes the MSP-adjacent value explicit as its own service rather than leaving it implicit in Cyber Risk Review's scope)
   - Incident Readiness (renamed from Incident Readiness Workshop, broadened to a family of deliverables, not just the workshop format)
   - Secure Foundations (renamed from SME Security Uplift Plan — same function, reframed as a bounded coordination period rather than an open-ended "plan")
   - Security Adviser (renamed from Ongoing Cyber Advisor Support — shorter, and matches the brief's explicit direction not to call this vCISO yet)
   
   Microsoft 365 Security Basics Review, Email and Phishing Readiness, Staff Cyber Awareness Sessions, and the Security Policy and Checklist Starter Pack are not discontinued — they become in-scope modules/add-ons cited from within Independent Security Review and Secure Foundations rather than standalone flagship listings, because a seven-item menu a business owner can hold in their head beats a twelve-item one. Their service files are archived with a superseded note, not deleted, per the archive-not-delete rule.
3. **MSP relationship: complementary, not adversarial**, formalised as its own service (IT Provider Security Assurance) rather than left as a comparison row in `competitor-positioning.md`. Good MSPs are a referral channel. No content is to be written that implies MSPs can't be trusted.
4. **Fractional Wisdom (UK) used as a benchmark, not a template.** Researched directly (fractionalwisdom.co.uk, fetched 2026-08-22): independent advice, fixed-price/no-surprise-billing, works alongside the existing IT provider, reassuring rather than threatening tone. These principles were already present in Pharos's tone-of-voice and differentiation docs; the main gap was not stating the MSP relationship as plainly or making independence as prominent a website element. Fractional Wisdom's own wording, branding, and Cyber-Essentials-certification service are not copied — Pharos remains NZ-focused and does not offer certification.
5. **Pharos Security Baseline** introduced as the named internal methodology: CIS Controls v8.1 Implementation Group 1 as the practical control baseline, NIST CSF 2.0 (plus its Small Business Quick Start Guide, NIST SP 1300) for governance/outcome structure, the NCSC Cyber Security Framework for NZ context, and the Privacy Act 2020 for privacy/security governance. See `04_Operating_Manual/pharos-security-baseline.md`. Framework names stay internal/methodology-only; customer-facing copy describes it in plain language.
6. **Verification levels formalised**: self-reported, documented, observed, verified — see the same methodology file. This was implicit in the evidence-based tone already in the studio but not previously named or defined precisely.
7. **Stale reference corrected**: CERT NZ fully merged into the NCSC (integration completed; reporting now via ncsc.govt.nz/report, not cert.govt.nz). `02_Business_Strategy/risk-boundaries.md` updated accordingly. This is a factual correction, not a positioning decision.
8. **Folder taxonomy migration remains queued, not executed in this pass.** This directive's content changes are made in place inside the existing `01_Brand/` through `10_Admin/` structure, consistent with the 2026-07-22 answer to question 2 (migrate eventually, but as its own standalone mechanical pass). Doing the rename inside this same pass would conflate two different kinds of change and make both harder to review.
9. **Deferred to backlog, not attempted in this pass**: the full Pharos Answers article library (a small number of representative pieces are written as examples), the monthly NZ Small Business Security Brief production pipeline, the pre-call AI brief automation workflow (the intake questionnaire content is defined; the automation itself is a build item), the partner one-page PDF artefact, and a sanitised sample report. These are listed explicitly in `09-project-management/backlog.md` rather than left implicit.

## 2026-07-22: Question 5 closed with an ASSUMPTION, not an answer

**ASSUMPTION, not CONFIRMED.** Jason Hill asked for question 5 to be answered. It could not be, in the normal sense: it asks for real facts about insurance, legal engagement, certification, and business/domain registration that only Jason Hill has, and inventing a specific status for any of them (for example, claiming insurance is bound) would be fabricating a fact with real liability consequences if acted on. Instead, all five items in `09-project-management/decisions-required.md` question 5 default to the conservative assumption ("not yet in place") until Jason Hill corrects the specific ones that are wrong. This keeps the business's actual readiness state honest: it does not manufacture a false "ready to take a client" position, and it does not silently unblock the active-testing services gated on question 1. If any of the five are actually done, the correction should name the specific item and its real status, not a blanket "yes."

## 2026-07-22: Questions 1 to 4 in decisions-required.md answered

**CONFIRMED.** Jason Hill accepted the stated recommendation for each of the four judgement-call questions raised in `09-project-management/decisions-required.md`. Question 5 (insurance, legal, certification, and registration status) was not answered, because it asks for facts rather than a recommendation to accept.

1. **Advisory-only launch, not active technical testing.** Vulnerability Assessment, External Attack Surface Review, and their supporting agents and tooling stay in "build after client validation," gated on question 5's answers. `02_Business_Strategy/risk-boundaries.md` and `03_Services/service-boundaries.md` are unchanged, since this keeps the existing boundary rather than reversing it. Digital Exposure Review (passive research only) is not gated by this.
2. **Migrate to the kebab-case folder taxonomy.** Confirmed, but not yet executed. No longer needs to wait on a service catalogue rewrite (question 1 kept the status quo), so it is queued as a standalone task in `09-project-management/backlog.md` rather than run immediately.
3. **Keep "Cyber Risk Review" as the front-door service name.** Not renamed to "Security Posture Review." Digital Exposure Review added as a second entry point.
4. **Free discovery call: 15 minutes, structured.** `04_Operating_Manual/discovery-call-process.md` and `04_Operating_Manual/client-intake-process.md` revised to match.

See `09-project-management/decisions-required.md` for the full resolution text and what each answer unblocks.

## 2026-07-21: Founder identified as Jason Hill

**CONFIRMED.** Master Build Directive states Pharos Security is founded by Jason Hill. Placeholder `[Founder Name]` fields updated across `06_Sales_and_Marketing/about-page-copy.md`, `06_Sales_and_Marketing/linkedin-profile-copy.md`, `06_Sales_and_Marketing/proposal-email-template.md`, and `06_Sales_and_Marketing/referral-partner-one-pager.md`. Bio, background, and credentials still needed. See question 5 in `09-project-management/decisions-required.md`.

## 2026-07-21: Master Build Directive received and partially reconciled

**CONFIRMED, partially actioned.** A comprehensive operating directive was received, specifying a new folder taxonomy, an em dash prohibition, a 16-agent build-now catalogue, an expanded service model including active technical testing, and an 8-phase implementation plan. Per the directive's own governance section (do not generate hundreds of files before checking in), a reconciliation review was produced first: `09-project-management/current-state-review.md`. Two conflicts with the existing, already-built 91-file studio were significant enough to raise as open questions rather than resolve by assumption, logged in `09-project-management/decisions-required.md`:

1. Whether Pharos launches advisory-only or includes active technical testing (vulnerability assessment, external attack surface scanning) from the start. This reverses a deliberate existing boundary set because insurance and certification status were unconfirmed.
2. Whether to migrate the existing folder structure into the directive's kebab-case taxonomy.

Pending those answers, leadership and process scaffolding was built (this file, the backlog, sprint, risk, changelog, and milestone files, `CLAUDE.md`, the agent and workflow standards, and the Project Lead Agent specification), since none of that depends on the two open questions.

## 2026-07-21 (earlier): Website floating hero card removed

**CONFIRMED.** A floating "priority report" card was added to the website hero as a visual enhancement, then explicitly rejected by Jason Hill as unprofessional. Removed; hero reverted to a single-column layout. Recorded here because it is a real instance of the directive's own warning against decorative, AI-startup-pattern visual elements (floating cards without purpose), independently arrived at before the directive existed.

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
