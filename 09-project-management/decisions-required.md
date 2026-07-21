---
title: Decisions Required
status: review
owner: Oscar
last-reviewed: 2026-07-21
review-cycle: update as answered
---

# Decisions Required

Five questions, highest value first. Each has a recommendation and the trade-off behind it, per the directive's own instruction not to ask Oscar to choose without explaining the trade-offs. Work that does not depend on these answers is already underway and listed at the bottom.

## 1. Does Pharos launch as advisory-only, or does it include active technical testing from the start?

**Why it matters:** the existing business documents (`02_Business_Strategy/risk-boundaries.md`, `03_Services/service-boundaries.md`) state, as a deliberate decision, that Pharos does not perform penetration testing or vulnerability scanning of production systems, because that requires certification, insurance, and authorisation paperwork that were not yet confirmed in place. The new directive's service list includes Vulnerability Assessment and External Attack Surface Review, both of which involve active scanning against client infrastructure, and it lists supporting tooling (Nmap Command Builder, external exposure scanning) accordingly.

**OPEN QUESTION.** This is a status question, not a preference question: is professional indemnity insurance bound, and does Oscar hold or plan to hold a recognised testing certification (for example CREST, OSCP, or equivalent), before active testing work begins?

**Recommendation:** launch advisory-only. Keep Vulnerability Assessment and External Attack Surface Review, and the agents and tools that support them (External Exposure Analyst Agent, Security Scope and Authorisation Agent, Nmap tooling), in the "build after client validation" tier, gated on insurance and certification being confirmed. Digital Exposure Review can proceed sooner, because it is passive research (breach exposure, public documents, domain registration) rather than active scanning, and maps closely to the existing Cyber Risk Review already built.

**Trade-off:** advisory-only narrows the near-term service ceiling and revenue per engagement. It also matches the existing insurance and legal reality, avoids a category of liability that a solo founder without a bound policy should not carry, and does not block the first paying client on anything beyond what is already required (Terms of Engagement, insurance). This can change later without rework: the existing service catalogue already has an "Ongoing Cyber Advisor Support" and "Cyber Risk Review" structure that active-testing services could be added alongside once the paperwork exists.

## 2. Migrate the existing 91-file structure into the directive's folder taxonomy, or keep the current structure?

**Why it matters:** the directive specifies `00-business/` through `12-testing/`, kebab-case, with YAML frontmatter. The existing studio uses `01_Brand/` through `10_Admin/`, Title_Case. Building the new structure alongside the old one creates two sources of truth for the same content, which the directive itself warns against.

**Recommendation:** migrate, using the mapping table in `09-project-management/current-state-review.md`, but only after question 1 is answered, and in the same pass as any service catalogue rewrite that answer requires. Doing the rename and the content revision together avoids touching the same 91 files twice.

**Trade-off:** migrating now would give a clean structure immediately, but a chunk of the content will need revision anyway once question 1 lands (service list, agent list, and every cross-reference to them), so renaming first means renaming twice. Waiting costs a short period of two-taxonomy discomfort, which this review document already resolves by explaining the mapping.

## 3. Which service is the true first-sale focus?

**Why it matters:** this determines the home page's primary call to action, the free call script's default assumption, and which report template gets finished first. The existing studio built "Cyber Risk Review" as the front door. The directive's section 19 uses the name "Security Posture Review" for a closely equivalent business-focused review, plus a separate "Digital Exposure Review".

**Recommendation:** keep one clear front-door service. "Cyber Risk Review" (existing) and "Security Posture Review" (directive) describe the same thing: a business-focused review producing an executive summary, prioritised risks, quick wins, and a roadmap. Recommend keeping the existing name, since it is already reflected in the website, proposal template, and pricing research, and adding Digital Exposure Review as a second, narrower, cheaper entry point (passive research only, no active testing, so it does not depend on question 1).

**Trade-off:** renaming to "Security Posture Review" would match the directive's wording exactly, at the cost of revising the website, service catalogue, pricing table, and every agent prompt that references "Cyber Risk Review" a second time. Recommend not renaming unless Oscar has a specific reason to prefer the directive's wording.

## 4. Free discovery call: 15 minutes, structured, or 20 to 30 minutes, conversational?

**Why it matters:** `04_Operating_Manual/discovery-call-process.md` specifies 20 to 30 minutes. The directive specifies exactly 15 minutes with a minute-by-minute structure. This is a direct factual conflict between two documents, not a style difference.

**Recommendation:** adopt the directive's 15-minute structured format. A shorter, structured call is easier to keep free and low-commitment (matching the directive's explicit instruction that this must not become a free assessment), easier to schedule, and easier to run consistently against a script. The existing discovery call process document would be revised to match.

**Trade-off:** 15 minutes is tight for anything beyond confirming fit and booking a next step, which is exactly what the directive wants it to be. If real calls consistently need more time to reach a fit decision, this is easy to extend later; starting short and lengthening if needed is lower risk than starting long and having to walk it back.

## 5. What is actually in place right now?

Not a preference question. Needed to unblock the launch-readiness checklist already in `10_Admin/next-actions.md` and to answer question 1 properly:

- Is professional indemnity and public liability insurance bound, in progress, or not started?
- Has a lawyer been engaged for the Terms of Engagement, or is this not started?
- Does Oscar hold any recognised security certification relevant to active testing work?
- Is a business structure (sole trader or limited company) registered yet?
- Is the domain (pharossecurity.co.nz or an alternative) registered?

## Work already underway, not blocked by the above

- Reconciliation review (`09-project-management/current-state-review.md`)
- Project management scaffolding: this file, backlog, current sprint, risks, changelog, milestones
- `CLAUDE.md` and the agent and workflow standards, which describe process and format rather than specific services
- Em dash removal from the live website's React components
- Founder name placeholder correction (Oscar, per this directive) across the four files that had `[Founder Name]`
- Project Lead Agent specification, since its role does not depend on which services launch

## How to answer

Reply inline against each numbered question, or simply confirm the stated recommendation for any question where it looks right. Recommendations are written to be accepted by default; only the disagreements need explaining.
