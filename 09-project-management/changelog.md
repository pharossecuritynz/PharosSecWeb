---
title: Changelog
status: approved
owner: Jason Hill
last-reviewed: 2026-07-22
review-cycle: update with every material change
---

# Changelog

Reverse chronological. Records material changes to the repository, not every small edit.

## 2026-09-09: Pivot to commercial validation

Full reasoning in `00-business/decisions.md` (2026-09-09 entry) and the canonical `00-business/pharos-current-strategy.md`. Grouped by category below; formatting-only or mode-only file changes are not listed (see the session's own audit: 34 pre-existing files across `01_Brand/`, `04_Operating_Manual/`, `05_Client_Templates/`, `06_Sales_and_Marketing/`, `10_Admin/`, and website config/assets showed only a file-permission-mode diff, predate this pass, and were left untouched).

**Strategy correction:**
- `00-business/pharos-current-strategy.md` (new): canonical single source of truth for ICP, positioning, active offer, pricing, and BUILD NOW/LATER status
- `00-business/decisions.md`: pivot decision logged in full
- `02_Business_Strategy/target-market.md`: added the 15–50 staff professional-services beachhead as the active ICP; broader 5–50 range kept as later-expansion context, not deleted
- `02_Business_Strategy/customer-profiles.md`: Profile 1 (Cautious Caroline, professional services) marked primary; Profiles 2–3 marked secondary for now
- `01_Brand/positioning.md`, `02_Business_Strategy/differentiation.md`, `02_Business_Strategy/competitor-positioning.md`: confirmed as sound, given pointer banners to the canonical doc rather than rewritten
- `02_Business_Strategy/business-overview.md`, `90-day-launch-plan.md`, `03_Services/service-model.md`: superseded-notice banners added
- `09-project-management/current-sprint.md`, `milestones.md`, `backlog.md`, `10_Admin/next-actions.md`: reframed around validation; `next-actions.md` also renumbered and gained the brand-name due-diligence action

**Service change:**
- `03_Services/remediation-assurance.md` (new): lighter follow-on service, distinct from Secure Foundations
- `03_Services/service-catalogue.md`: rebuilt around ACTIVE NOW / SUPPORTING FEATURE / BUILD LATER categorisation; client-journey diagram and selection guide updated to match
- `03_Services/independent-security-review.md`: confirmed as the core offer; report deliverable now explicitly groups actions by owner (management / IT provider / specialist referral)
- `03_Services/it-provider-security-assurance.md`: reframed as the same core review, not a second flagship
- `03_Services/exposure-snapshot.md`: reframed as a supporting lead qualifier (no scope change; it was already correctly framed)
- `03_Services/secure-foundations.md`, `incident-readiness.md`, `security-adviser.md`, `free-security-health-check.md`: marked BUILD LATER with a status banner; content untouched and not deleted

**Pricing change:**
- `02_Business_Strategy/pricing-strategy.md`: reconciled the July 2026 market-validated range with a founder-directed active pilot/standard pricing hypothesis, logged as an open assumption rather than silently overwritten
- `10_Admin/delivery-economics-tracker.csv` and `delivery-economics-tracker-guide.md` (new): per-engagement hours/margin tracker

**Website change:**
- `components/Hero.tsx`: subheading tightened to name the MSP-collaborative framing explicitly; headline kept (already on-strategy)
- `components/Problem.tsx`: one card swapped to name invoice fraud/BEC explicitly
- `components/Services.tsx`: rebuilt from a 7-service grid to one foregrounded core service (Independent Security Review), two lighter alternate-entry cards (Exposure Snapshot, IT Provider Security Assurance), and a single-sentence mention of Remediation Assurance as the next step, not a co-equal flagship
- `components/About.tsx`: added the founder bio and credentials that were previously entirely absent (the largest flagged credibility gap on the site since 2026-07-21)
- `components/ConversationIntakeForm.tsx` and `public/__forms.html`: added an industry field to support beachhead qualification, kept in sync for Netlify's static form detection
- Verified: `tsc --noEmit`, `eslint .`, and the full 185-test suite all pass; internal links and dev-server rendering checked live

**Sales change:**
- `06_Sales_and_Marketing/validation-outreach-kit.md` (new): buyer intro, warm-intro request, MSP partner pitch, and eight trigger-specific outreach snippets

**Validation change:**
- `09-project-management/pharos-assumption-register.md` (new): 13-row living assumption register
- `09-project-management/validation-checkpoints.md` (new): 30-day and 90-day double-down/adjust/stop thresholds
- `10_Admin/commercial-validation-tracker.csv` (new): pipeline tracker

**Archival/deprioritisation:**
- `09-project-management/build-now-later-stop.md` (new): full audit of every active initiative (services, agents, tooling, website features) into BUILD NOW / BUILD LATER / DO MANUALLY / STOP; nothing deleted

**Risk/compliance change:**
- `09-project-management/risks.md`: three new open risks (untested pricing hypothesis, untested MSP-cooperation assumption, unverified brand name/trademark status)
- `10_Admin/next-actions.md`: brand-name due-diligence action added (NZ Companies Office, NZBN, IPONZ, domain, international-name conflicts)
- Claims/boundary scan across website, sales copy, and client templates for overclaim language (guarantees, "100% secure," penetration testing, 24/7 monitoring, forensic/certification claims): no unfenced instance found; existing boundary discipline confirmed sound, nothing changed
- The business-readiness gate (insurance, Terms of Engagement, business/domain registration) is explicitly unchanged by this pivot; see the canonical doc's "What's actually blocking a paying client" section

## 2026-07-22: Question 5 closed with an assumption, not an answer

Jason Hill asked for question 5 to be answered. It asks for real facts (insurance bound, lawyer engaged, certification held, business and domain registered) that only Jason Hill has; inventing a specific status for any of them would be fabricating a fact with real liability consequences if it were wrong and acted on. Closed instead with an explicit, correctable assumption: all five default to "not yet in place" until Jason Hill names the specific ones that are actually done.

**Revised:**
- `00-business/decisions.md`: new entry recording this as an ASSUMPTION, not a CONFIRMED answer
- `09-project-management/decisions-required.md`: question 5 restructured as a table of five defaulted statuses, each independently correctable
- `09-project-management/risks.md`: insurance and Terms of Engagement rows marked as unverified assumptions, not confirmed facts
- `09-project-management/current-sprint.md`: reframed so the sprint's definition of done does not depend on question 5 receiving a final answer

**Consequence:** taking on a paying client, and everything in the agent catalogue gated on question 1's active-testing services, stays blocked until Jason Hill corrects specific items in question 5's table.

## 2026-07-22: Questions 1 to 4 answered

**Revised:**
- `00-business/decisions.md`: new entry recording the four answers
- `09-project-management/decisions-required.md`: questions 1 to 4 marked answered with resolution text; question 5 restated as the sole remaining open item
- `09-project-management/backlog.md`, `current-sprint.md`, `risks.md`: updated to reflect what the answers unblocked (master plan, folder migration, agent catalogue continuation) and what stays gated on question 5
- `04_Operating_Manual/discovery-call-process.md`: rewritten to the confirmed 15-minute structured call
- `04_Operating_Manual/client-intake-process.md`: pre-call reminder wording updated to match
- `02_Business_Strategy/risk-boundaries.md`, `03_Services/service-boundaries.md`: one-line reaffirmation added noting the advisory-only boundary was explicitly reconsidered and kept, not left over by default

**Not done in this pass:** the folder migration itself, `00-business/pharos-master-plan.md`, and the remaining agent specifications. All three are now unblocked and queued, not yet executed.

## 2026-07-21: Master Build Directive reconciliation, phase 1

**Added:**
- `09-project-management/current-state-review.md`
- `09-project-management/decisions-required.md`
- `09-project-management/backlog.md`
- `09-project-management/current-sprint.md`
- `09-project-management/risks.md`
- `09-project-management/milestones.md`
- `09-project-management/changelog.md` (this file)
- `00-business/decisions.md`
- `CLAUDE.md`
- `03-agents/agent-standard.md`
- `03-agents/agent-catalogue.md`
- `03-agents/project-lead-agent.md`
- `10-automation/workflow-standard.md`

**Revised:**
- `08_Website/pharos-security-site/components/BuiltForSMEs.tsx`, `Hero.tsx`, `About.tsx`, `Process.tsx`: em dash removed (4 instances)
- `06_Sales_and_Marketing/about-page-copy.md`, `linkedin-profile-copy.md`, `proposal-email-template.md`, `referral-partner-one-pager.md`: `[Founder Name]` placeholder corrected to Jason Hill

**Deferred (see `09-project-management/current-sprint.md` for the full list):**
- `00-business/pharos-master-plan.md`
- Full 16-agent build-now catalogue beyond Project Lead Agent
- 8 required workflow drafts
- Folder migration to kebab-case taxonomy
- Em dash removal from the remaining 91 markdown files
- All active-testing-dependent agents, services, and tooling

**Decisions requiring Jason Hill (see `09-project-management/decisions-required.md`):**
1. Advisory-only launch versus including active technical testing
2. Folder taxonomy migration
3. First-sale service naming (Cyber Risk Review versus Security Posture Review)
4. Free call duration (15 minutes versus 20 to 30 minutes)
5. Current status of insurance, legal, certification, business registration, and domain

## 2026-07-21 (earlier, same day): Website design revision

- Floating hero card added, then removed at Jason Hill's explicit direction (assessed as unprofessional). Hero reverted to single-column layout. Mobile navigation menu added (previously non-functional on small screens). Grain texture, card shadows, animated process connector, and expanded footer added and retained.

## 2026-07-21 (earlier, same day): Pricing revision

- All 8 service prices checked against published NZ and AU market data. Cyber Risk Review range raised to $1,800 to $4,200. Ongoing Cyber Advisor Support range raised to $500 to $1,500 per month. Full sourcing in `02_Business_Strategy/pricing-strategy.md`.

## 2026-07-21 (earlier, same day): Initial studio build

- Complete 91-file business studio created across `01_Brand/` through `10_Admin/`, plus a working Next.js, TypeScript, Tailwind CSS website in `08_Website/pharos-security-site/`, verified against `npm run build` and `npm run lint`.
