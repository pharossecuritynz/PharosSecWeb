# Microsoft 365 Security Basics Checklist

*A free checklist for businesses using Microsoft 365. Lead magnet supporting the [Microsoft 365 Security Basics Review](../03_Services/microsoft-365-security-basics-review.md) service.*

---

**Pharos Security — Clear guidance. Safer business.**

Most of these can be checked by your IT provider if you don't have admin access yourself — worth forwarding this to them.

## Identity and access

- [ ] Multi-factor authentication (MFA) is enabled for **all** users, not just some
- [ ] MFA is enforced (not just "available but optional")
- [ ] There are as few Global Admin accounts as possible (ideally 2, for redundancy — not more)
- [ ] Admin accounts are separate from everyday user accounts (i.e. IT staff have a normal account for daily use and a separate admin account for admin tasks)
- [ ] Legacy authentication protocols (older sign-in methods that don't support MFA) are disabled

## Email protection

- [ ] SPF is configured for your domain
- [ ] DKIM is configured for your domain
- [ ] DMARC is configured for your domain (and set to actually enforce, not just monitor)
- [ ] Anti-phishing and anti-spoofing settings are turned on (available on most Microsoft 365 Business plans)
- [ ] No unexpected/unauthorised mailbox forwarding rules exist

## Sharing and data

- [ ] External sharing in SharePoint/OneDrive is set to something more controlled than "Anyone with the link"
- [ ] Guest access to Teams/SharePoint is reviewed periodically, not left unmanaged
- [ ] Sensitive data isn't casually shared via public/anyone links

## General hygiene

- [ ] You know what Microsoft 365 licensing tier you're on, and what security features it does/doesn't include
- [ ] Someone reviews security settings at least annually — not just at initial setup years ago

---

## What this checklist doesn't cover

This is a starting-point checklist, not a full technical audit. It doesn't cover Conditional Access policies, Intune/device management configuration, or Microsoft Defender settings in detail — a full [Microsoft 365 Security Basics Review](../03_Services/microsoft-365-security-basics-review.md) goes deeper.

## Not sure how to check any of this?

That's exactly what the Microsoft 365 Security Basics Review is for — a fast, focused, independent check with a clear, prioritised report. Get in touch for a free, no-obligation conversation.

**pharossecurity.co.nz** · pharos.security.nz@gmail.com
