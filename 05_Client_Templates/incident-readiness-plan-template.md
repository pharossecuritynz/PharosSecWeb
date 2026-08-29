# Incident Readiness Plan — Template

*Full structure for the [Incident Readiness Workshop](../03_Services/incident-readiness-workshop.md) service. Designed to be a genuinely usable, short reference document — not a document that sits unread.*

---

## Cover page

- "Incident Readiness Plan"
- Client name: [Client Name] | Date: [Date] | Next review due: [Date + 12 months]

## 1. Purpose of this plan

One paragraph: what this plan is for and when to use it — e.g. "This plan sets out what to do in the first hours of a suspected cyber incident, so decisions can be made calmly and quickly rather than figured out from scratch."

## 2. Key contacts

| Role | Name | Contact |
|---|---|---|
| Internal decision-maker (primary) | | |
| Internal decision-maker (backup) | | |
| IT provider / MSP | | |
| Cyber insurer (if applicable) | | Policy number: |
| Bank (for financial fraud) | | |
| Lawyer (if applicable) | | |
| Pharos Security (advisory, not incident response) | | |

## 3. First-hour actions (by scenario)

### Suspected ransomware / systems locked or encrypted
1. Disconnect affected device(s) from the network (unplug/disable wifi) — do not turn off, if avoidable, as this can complicate recovery
2. Notify [internal decision-maker]
3. Contact IT provider
4. Do not pay any ransom or engage with attackers without professional guidance
5. Contact cyber insurer if applicable
6. Consider reporting to the NCSC (ncsc.govt.nz/report, 0800 114 115)

### Suspected business email compromise / fraudulent payment
1. Contact the bank immediately to attempt to halt/recall the payment
2. Change the compromised account's password and enable/verify MFA
3. Notify [internal decision-maker]
4. Contact IT provider to check for further compromise
5. Report to NZ Police (105) and CERT NZ

### Suspected data breach (customer/staff personal information exposed)
1. Notify [internal decision-maker]
2. Contact IT provider to understand scope
3. Consider legal advice on notification obligations (Privacy Act 2020)
4. Consider notifying the Office of the Privacy Commissioner if the breach meets the notifiable privacy breach threshold
5. Prepare a plan for notifying affected individuals, guided by legal advice

### Lost or stolen device
1. Remotely lock/wipe the device if possible (via MDM or platform account settings)
2. Change passwords for accounts accessed on that device
3. Notify [internal decision-maker]

## 4. Communication approach

- Who speaks externally (media, customers, partners)? Default: [role/name] only, no one else comments externally
- Draft holding statement approach (to be finalised with legal/PR advice if the incident is significant): *"We are aware of an issue affecting our systems and are taking immediate steps to investigate and resolve it. We will provide further updates as appropriate."*

## 5. Notification considerations

*(Flag only — not legal advice)* Under the Privacy Act 2020, businesses must notify the Privacy Commissioner and affected individuals of a "notifiable privacy breach" (one likely to cause serious harm). If personal information is involved, seek legal advice promptly to assess this obligation.

## 6. After the immediate response

- Debrief: what happened, what worked, what to improve
- Update this plan based on lessons learned
- Consider a Cyber Risk Review if the incident reveals broader gaps

## Appendix: What Pharos Security can and can't help with during an incident

*(Standard boundary language — see [../02_Business_Strategy/risk-boundaries.md](../02_Business_Strategy/risk-boundaries.md))*

---

*[Internal note: this should be deliverable as a single printable page (the "quick reference card") plus this fuller document. Keep the quick-reference version to section 2 and 3 only.]*
