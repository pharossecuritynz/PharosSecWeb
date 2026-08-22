# IT Provider Security Assurance

**New service, added 2026-08-22 under the Pharos v2 directive.** Makes explicit, as its own service, the MSP-adjacent value that was previously implicit in the Cyber Risk Review's scope. See `00-business/decisions.md`.

## Purpose

Independently verify that important security outcomes appear to be in place, without attempting to replace or undermine the client's IT provider.

## Who it's for

Businesses with an outsourced MSP, an internal IT person, or a hybrid setup, who want an independent check on the security outcome of that support arrangement. This is the service that makes Pharos's core relationship line concrete: *your IT provider manages your technology; Pharos helps you know whether your security is good enough.*

## Problems it solves

- "Our MSP says we're secure, but how would we independently know that?"
- "Our supplier has recommended another security product. Do we actually need it?"
- "The board wants reassurance that IT is covering the right things."
- "Our insurance renewal asks questions we don't understand, and our IT provider isn't the right person to answer them impartially."
- "We changed MSP, or are about to, and want an independent baseline first."

## How this is positioned with the MSP

Constructively, always. This is not an audit designed to catch the MSP out, and it is not built on distrust. Most MSPs are doing a reasonable job with the scope they've been given; nobody is well placed to independently mark their own homework, which is the actual gap this service closes. Where appropriate, the client's IT provider is invited into the process, not kept at arm's length. A good outcome for this service is often "your provider has this covered, and here's the evidence," not just a list of gaps. See `01_Brand/positioning.md` for the relationship framing and `02_Business_Strategy/competitor-positioning.md` for referral-channel guidance.

## Scope

- Review of existing MSP reports and documentation
- Review of stated security responsibilities: what the MSP owns, what the client owns, and what falls into the gap between the two
- Review of Microsoft 365 or Google Workspace settings against the Pharos Security Baseline
- MFA coverage check
- Endpoint protection coverage check
- Review of patch management evidence
- Review of privileged administration practices
- Review of backup evidence
- Review of external exposure (can draw on an Exposure Snapshot)
- Review of vulnerability management practices, as reported and evidenced
- Review of logging, at whatever level exists
- Review of incident-response responsibilities as currently defined
- Review of the MSP's own security recommendations and proposals, translated into plain business risk
- A list of questions the business should ask its provider, and why

## Out of scope

- Auditing the MSP's internal operations, staffing, or business practices beyond what's relevant to the client's security outcome
- Technical implementation of any changes: this stays with the MSP or internal IT team
- Adjudicating a commercial dispute between the client and their provider

## Deliverables

1. Review of MSP-provided documentation and, where access allows, direct observation of key configuration (M365/Google Workspace, MFA, endpoint tooling)
2. IT Provider Security Assurance report: what appears to be in place, what's unclear, what's missing, each labelled by verification level
3. A plain-English list of questions to put to the IT provider
4. A short call to walk through findings, with the option to include the client's IT provider in a follow-up conversation

## Inputs required from client

- Recent reports or documentation from the MSP or internal IT team
- Read-only access or a screen-share session for the platforms in scope
- Willingness to loop the IT provider in, where useful (not required, but improves the outcome)

## Delivery process

1. Scoping and proposal
2. Documentation review and access-based technical checks
3. Analysis and report writing (allow 3 to 5 business days)
4. Findings call, with an offer to include the IT provider
5. Report delivered

## Estimated effort (founder time)

| Task | Time |
|---|---|
| Scoping/proposal | 1 hour |
| Documentation and technical review | 3–5 hours |
| Report writing | 2–3 hours |
| Findings call | 1 hour |
| **Total** | **~7–10 hours** |

## Suggested pricing range

**NZD $1,500 – $3,500** (excl. GST), scaled by number of platforms and providers in scope. Broadly comparable to the Independent Security Review, since the depth of work is similar; see `02_Business_Strategy/pricing-strategy.md`.

## Risks and limitations

- Findings depend on the access and documentation actually made available; a provider that's slow to cooperate is the main schedule risk
- Must stay strictly constructive in tone; a report that reads as an attack on the MSP undermines the referral relationship this service is meant to build
- Not a substitute for the Independent Security Review where the gap is broader than the IT provider relationship

## Sales copy

> Your IT provider manages your technology. This is how you find out whether your security is actually good enough, independently, without putting your provider on trial. We check what's in place, flag what's unclear, and give you a plain-English list of questions worth asking, or the reassurance that you're already covered.

## Report/output structure

Follows the evidence, interpretation, action standard in `04_Operating_Manual/pharos-security-baseline.md`.
