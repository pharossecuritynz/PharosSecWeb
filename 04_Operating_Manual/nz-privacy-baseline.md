---
title: NZ Privacy Baseline
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: annually, or whenever the Privacy Act or its principles are amended
---

# NZ Privacy Baseline

This is the `PRIV` domain referenced in `assessment-methodology.md`: an operational review of a client's privacy practices, run alongside the security review because the two overlap heavily in a small business (the same access controls, backup practices, and supplier relationships that protect security also protect personal information) without being the same discipline.

## What this is, and what it is not

Pharos assesses whether **sensible, practical privacy-related practices are in place**: who holds what personal information, why, where, for how long, and what happens if something goes wrong. This is a security-and-governance review, not a legal one.

**Pharos does not provide legal advice.** Nothing in this domain, or in any report it produces, is a legal opinion on whether a business complies with the Privacy Act 2020, whether a specific event is a notifiable privacy breach, or what a business's liability would be. Where a genuine legal question arises during a review, it's named as exactly that, and the recommendation is to engage a privacy or commercial lawyer. This mirrors the same boundary already established for the incident-readiness material and in `pharos-security-baseline.md`'s existing privacy boundary statement, applied here as a full domain rather than a single flag.

## Why this domain exists, distinct from `data-handling-and-confidentiality.md`

`04_Operating_Manual/data-handling-and-confidentiality.md` governs how **Pharos itself** handles a client's data during an engagement. This document governs what Pharos **assesses in the client's own business**. They're related in spirit (both apply the same "protect data sensibly, proportionately" principle) but serve different purposes and should not be merged.

## What's assessed

### Governance

- Has the business appointed a Privacy Officer (a formal Privacy Act requirement for every agency, regardless of size — this is a factual point about the Act's structure, not legal advice about the client's specific obligations)?
- Does that person actually know the role exists, or is it a name on an org chart?
- Is there any written sense of what personal information the business holds and why?

### What personal information is held, and why

- What personal information does the business actually hold: customer, employee, supplier, or other?
- Why is it collected — is there a clear operational reason, or has it just accumulated over time ("data minimisation" as a practical habit, not a legal test)?
- Collection sources: direct collection (the person provided it themselves) versus indirect collection (obtained from somewhere else — a referral, a public source, a third party).

### Notices and indirect collection, including IPP 3A

- Are privacy notices given at the point personal information is collected directly, in plain language, not buried in fine print nobody reads?
- **Information Privacy Principle 3A**, introduced by the Privacy Amendment Act 2025, took effect **1 May 2026**. It requires that when a business collects personal information about someone **from a source other than that person** (for example, a referral, a public register, or a third-party list), it must take reasonable steps to make sure the person is aware of specified matters about that collection, as soon as reasonably practicable, unless they're already aware. This is new, applies only to information collected on or after 1 May 2026, and is genuinely easy to miss because most SME privacy habits were built around the *direct* collection case. Pharos checks specifically whether the business collects personal information indirectly at all (referrals are a common, easily-missed example) and, if so, whether it has any process for IPP 3A notification. This is flagged as its own, explicitly-dated item, not folded quietly into general "notices" language, because it's genuinely new and older templates or advice won't cover it.

### Access, correction, retention, and disposal

- Would the business know what to do if someone asked to see the personal information held about them, or asked to correct it?
- Is there any retention practice, or does data simply accumulate indefinitely?
- Is there a disposal practice for information no longer needed?

### Categories of information in practice

- **Employee information**: what HR/payroll data is held, who can access it, how it's stored.
- **Customer information**: what's collected at signup, in support interactions, in payment processing.
- **Supplier processing**: where a supplier processes personal information on the business's behalf (payroll providers, CRM vendors), is there any agreement covering how that data is handled?
- **Cloud/SaaS providers**: which platforms hold personal information, and does anyone know where.
- **Overseas disclosure/storage**: is any personal information stored or processed offshore (most cloud/SaaS platforms host outside NZ by default), and has anyone considered what that means for the business?

### Permissions and access

- Cross-references the `IAM` domain directly: least-privilege access to systems holding personal information is both a security control and a privacy safeguard at once.

### Breaches

- Would the business recognise a privacy breach if one occurred (this can be much broader than a "hack" — a misdirected email with personal information attached is a common real-world example)?
- Is there any awareness of the Office of the Privacy Commissioner's notification process for serious breaches, without Pharos advising on whether a specific event meets that threshold?
- Would affected individuals be notified, and is there any process for how?

### Training and culture

- Do staff who handle personal information have any awareness of why it matters, beyond "don't lose the laptop"?

### Security safeguards

- This is where the domain deliberately overlaps with the rest of the security review: the security-safeguards principle (personal information must be protected by reasonable security safeguards, scaled to business size and data sensitivity) is the Privacy Act's own bridge between privacy and security, and Pharos findings in `IAM`, `END`, `BAK`, and `TPR` are cross-referenced here rather than re-assessed from scratch.

## What "good" looks like at SME scale

Proportionate to a 5 to 50 staff business, not an enterprise privacy programme: a named Privacy Officer who knows the role, a plain-English idea of what personal information is held and why, sensible access controls (already assessed under `IAM`), an awareness of IPP 3A where the business collects information indirectly, and a basic idea of what to do if something goes wrong. This is achievable within the same "sensible, not enterprise-grade" standard applied everywhere else in Pharos's methodology.

## Reference sources

Verified current as of 2026-08-29:

- **New Zealand Privacy Act 2020** and the **Privacy Amendment Act 2025** (introducing IPP 3A, in force 1 May 2026) — [privacy.org.nz](https://www.privacy.org.nz/privacy-principles/) and [justice.govt.nz](https://www.justice.govt.nz/justice-sector-policy/key-initiatives/enhancing-the-privacy-act/).
- **Office of the Privacy Commissioner (OPC)** guidance on notifiable privacy breaches — referenced for awareness, not applied as a legal determination in any Pharos report.

See `nz-guidance-mapping.md` for how this domain's findings map to specific IPPs, and the general legal/guidance/practice/recommendation distinction that applies across all NZ guidance Pharos cites.
