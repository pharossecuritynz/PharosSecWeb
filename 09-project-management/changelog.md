---
title: Changelog
status: approved
owner: Oscar
last-reviewed: 2026-07-22
review-cycle: update with every material change
---

# Changelog

Reverse chronological. Records material changes to the repository, not every small edit.

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
- `06_Sales_and_Marketing/about-page-copy.md`, `linkedin-profile-copy.md`, `proposal-email-template.md`, `referral-partner-one-pager.md`: `[Founder Name]` placeholder corrected to Oscar

**Deferred (see `09-project-management/current-sprint.md` for the full list):**
- `00-business/pharos-master-plan.md`
- Full 16-agent build-now catalogue beyond Project Lead Agent
- 8 required workflow drafts
- Folder migration to kebab-case taxonomy
- Em dash removal from the remaining 91 markdown files
- All active-testing-dependent agents, services, and tooling

**Decisions requiring Oscar (see `09-project-management/decisions-required.md`):**
1. Advisory-only launch versus including active technical testing
2. Folder taxonomy migration
3. First-sale service naming (Cyber Risk Review versus Security Posture Review)
4. Free call duration (15 minutes versus 20 to 30 minutes)
5. Current status of insurance, legal, certification, business registration, and domain

## 2026-07-21 (earlier, same day): Website design revision

- Floating hero card added, then removed at Oscar's explicit direction (assessed as unprofessional). Hero reverted to single-column layout. Mobile navigation menu added (previously non-functional on small screens). Grain texture, card shadows, animated process connector, and expanded footer added and retained.

## 2026-07-21 (earlier, same day): Pricing revision

- All 8 service prices checked against published NZ and AU market data. Cyber Risk Review range raised to $1,800 to $4,200. Ongoing Cyber Advisor Support range raised to $500 to $1,500 per month. Full sourcing in `02_Business_Strategy/pricing-strategy.md`.

## 2026-07-21 (earlier, same day): Initial studio build

- Complete 91-file business studio created across `01_Brand/` through `10_Admin/`, plus a working Next.js, TypeScript, Tailwind CSS website in `08_Website/pharos-security-site/`, verified against `npm run build` and `npm run lint`.
