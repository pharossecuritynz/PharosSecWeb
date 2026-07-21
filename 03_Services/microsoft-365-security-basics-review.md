# Microsoft 365 Security Basics Review

## Purpose

A focused review of a business's Microsoft 365 environment against sensible, well-understood security fundamentals — identifying quick, high-impact configuration improvements.

## Who it's for

Businesses using Microsoft 365 (the large majority of NZ SMEs) who aren't confident their environment is configured safely, and want a lower-cost, narrower-scope entry point than a full Cyber Risk Review.

## Problems it solves

- "We use Microsoft 365 but have no idea if it's set up securely."
- "Our IT provider set it up years ago — has anyone checked it since?"
- "We want quick wins before committing to a bigger engagement."

## Scope

Review against baseline fundamentals, typically including:
- Multi-factor authentication (MFA) coverage and enforcement
- Conditional access basics (if licensing allows)
- Admin account hygiene (number of global admins, use of dedicated admin accounts)
- Email security settings (SPF/DKIM/DMARC presence, anti-phishing/anti-spoofing settings)
- External sharing and guest access settings (SharePoint/OneDrive/Teams)
- Legacy authentication protocol status
- Basic mailbox forwarding rule check (a common indicator of prior compromise)
- Licensing-appropriate security feature usage (what's available vs. what's turned on)

## Out of scope

- Full penetration testing of the tenant
- Deep Azure AD / Entra ID architecture review for complex multi-domain environments
- Non-Microsoft cloud platforms (Google Workspace, AWS, etc. — scope separately if needed)
- Ongoing management or implementation of changes (can be handed to the client's IT provider, or covered under [Ongoing Cyber Advisor Support](ongoing-cyber-advisor-support.md))

## Deliverables

1. Read-only review of the tenant (admin-granted access or screen-share walkthrough with the client's IT provider)
2. Microsoft 365 Security Basics Report (see [../05_Client_Templates/microsoft-365-review-template.md](../05_Client_Templates/microsoft-365-review-template.md)) including:
   - Plain-English summary of findings
   - Prioritised list of configuration recommendations
   - Notes on what's already working well
3. A short call to walk through findings (30–45 minutes)

## Inputs required from client

- Temporary read-only admin access to the Microsoft 365 tenant (or a scheduled screen-share session with someone who has access — typically the IT provider)
- Confirmation of current Microsoft 365 licensing tier (affects which features are even available)

## Delivery process

1. Scoping/proposal, confirm access method
2. Access granted / screen-share session scheduled
3. Review conducted (typically 2–3 hours of hands-on review)
4. Report written (allow 2–3 business days)
5. Findings call
6. Report delivered

## Estimated effort (founder time)

| Task | Time |
|---|---|
| Scoping/proposal | 0.5 hour |
| Tenant review | 2–3 hours |
| Report writing | 2–3 hours |
| Findings call | 0.75 hour |
| **Total** | **~5.25–7.25 hours** |

## Suggested pricing range

**NZD $800 – $1,800** (excl. GST), depending on tenant complexity and licensing tier. See [../02_Business_Strategy/pricing-strategy.md](../02_Business_Strategy/pricing-strategy.md).

## Risks and limitations

- Review is a point-in-time snapshot; configuration can drift afterwards without ongoing oversight
- Findings are limited by the licensing tier the client has (some recommended controls may require a licence upgrade — flag this as a cost consideration, not a guaranteed fix)
- Requires cooperative access — delays in access provisioning are the most common cause of schedule slippage

## Sales copy

> Most New Zealand SMEs run their business on Microsoft 365 — and most have never had it properly checked. The Microsoft 365 Security Basics Review is a fast, focused way to find out if the fundamentals are actually switched on, with a clear, prioritised list of quick wins.

## Report/output structure

See the full template: [../05_Client_Templates/microsoft-365-review-template.md](../05_Client_Templates/microsoft-365-review-template.md)
