---
title: Assessment Data Schema
status: approved
owner: Jason Hill
last-reviewed: 2026-08-29
review-cycle: revise when the finding data model changes
---

# Assessment Data Schema

A machine-readable schema for the data behind an assessment, kept separate from how that data is presented. No application is built against this yet; it exists so a future tool (a client portal, a remediation tracker, a report generator) can be built without redesigning what a "finding" or an "engagement" means from scratch. Every field below traces back to a document already written: `04_Operating_Manual/evidence-standard.md` for the finding model, `risk-and-priority-methodology.md` for risk/priority/effort/cost, `assessment-methodology.md` for domains, `nz-guidance-mapping.md` for mappings, `remediation-and-verification.md` for verification.

This is JSON Schema (draft 2020-12), chosen because it's widely supported, human-readable in a markdown file, and doesn't commit Pharos to a specific programming language or database ahead of actually needing one.

## Design principle: data and presentation are separate

None of the schemas below describe a PDF, a page layout, or a report section. A report, a portal view, a PDF export, and a remediation tracker are all just different presentations of the same underlying `Engagement` → `Finding` → `ActionItem` data. Building the presentation layer (see `reporting-standards.md` for the current one, markdown/PDF) never requires changing this schema; adding a new presentation (a future portal, a dashboard) never requires re-litigating what a finding is.

## Core entities

### Engagement

```json
{
  "$id": "https://pharossecurity.example/schemas/engagement.json",
  "type": "object",
  "required": ["engagementId", "organisationId", "service", "status", "startDate"],
  "properties": {
    "engagementId": { "type": "string", "description": "Stable ID, e.g. a UUID" },
    "organisationId": { "type": "string" },
    "service": {
      "type": "string",
      "enum": ["free-security-health-check", "exposure-snapshot", "independent-security-review", "it-provider-security-assurance", "incident-readiness", "secure-foundations", "security-adviser"]
    },
    "status": { "type": "string", "enum": ["scoping", "in-progress", "qa", "client-review", "delivered", "closed"] },
    "startDate": { "type": "string", "format": "date" },
    "deliveryDate": { "type": "string", "format": "date" },
    "scope": { "$ref": "#/definitions/scope" }
  }
}
```

### Organisation

```json
{
  "$id": "https://pharossecurity.example/schemas/organisation.json",
  "type": "object",
  "required": ["organisationId", "name", "staffCount"],
  "properties": {
    "organisationId": { "type": "string" },
    "name": { "type": "string" },
    "staffCount": { "type": "integer" },
    "sector": { "type": "string" },
    "itProvider": { "type": "string", "description": "Name of the client's current MSP/IT provider, if any" },
    "criticalSystems": { "type": "array", "items": { "type": "string" } },
    "criticalDependencies": { "type": "array", "items": { "type": "string" } }
  }
}
```

### Scope

```json
{
  "$id": "https://pharossecurity.example/schemas/scope.json",
  "type": "object",
  "properties": {
    "assessed": { "type": "array", "items": { "type": "string" }, "description": "Domain codes actually covered" },
    "notAssessed": { "type": "array", "items": { "type": "string" } },
    "limitations": { "type": "array", "items": { "type": "string" } },
    "assumptions": { "type": "array", "items": { "type": "string" } },
    "clientResponsibilities": { "type": "array", "items": { "type": "string" } }
  }
}
```

### Domain

```json
{
  "$id": "https://pharossecurity.example/schemas/domain.json",
  "type": "object",
  "required": ["code", "name"],
  "properties": {
    "code": {
      "type": "string",
      "enum": ["GOV", "AST", "IAM", "MAIL", "END", "VUL", "BAK", "EXT", "DET", "IR", "AWR", "TPR", "PRIV"]
    },
    "name": { "type": "string" },
    "scorecardPosition": { "type": "string", "enum": ["strong", "reasonable", "needs-attention", "weak"] },
    "scorecardPriority": { "type": "string", "enum": ["now", "next", "later", "monitor"] }
  }
}
```

### Finding

The core entity. Mirrors the finding data model in `evidence-standard.md` field for field.

```json
{
  "$id": "https://pharossecurity.example/schemas/finding.json",
  "type": "object",
  "required": ["findingId", "engagementId", "domain", "title", "observation", "evidence", "riskRating", "confidence", "priority", "status"],
  "properties": {
    "findingId": { "type": "string", "pattern": "^(GOV|AST|IAM|MAIL|END|VUL|BAK|EXT|DET|IR|AWR|TPR|PRIV)-[0-9]{2,}$" },
    "engagementId": { "type": "string" },
    "domain": { "type": "string", "enum": ["GOV", "AST", "IAM", "MAIL", "END", "VUL", "BAK", "EXT", "DET", "IR", "AWR", "TPR", "PRIV"] },
    "title": { "type": "string" },
    "observation": { "type": "string" },
    "evidence": { "$ref": "evidence.json" },
    "affectedSystem": { "type": "string" },
    "businessContext": { "type": "string" },
    "threatScenario": { "type": "string" },
    "potentialConsequence": { "type": "string" },
    "riskRating": { "type": "string", "enum": ["critical", "high", "moderate", "low", "informational"] },
    "confidence": { "type": "string", "enum": ["high", "medium", "low"] },
    "recommendation": { "type": "string" },
    "priority": { "type": "string", "enum": ["now", "next", "later", "monitor"] },
    "effort": { "type": "string", "enum": ["very-low", "low", "moderate", "significant"] },
    "costCategory": { "type": "string", "enum": ["none", "low", "moderate", "significant", "unknown"] },
    "owner": { "type": "string", "enum": ["business", "it-provider", "specialist", "pharos-advisory"] },
    "targetCompletion": { "type": "string", "format": "date" },
    "dependencies": { "type": "array", "items": { "type": "string" }, "description": "Other finding IDs this depends on" },
    "verificationMethod": { "type": "string" },
    "sourceReference": { "type": "array", "items": { "$ref": "mapping.json" } },
    "status": { "type": "string", "enum": ["open", "in-progress", "blocked", "remediated-unverified", "verified-complete", "risk-accepted"] },
    "supersedes": { "type": "string", "description": "Finding ID this recurs from, if applicable" },
    "notes": { "type": "string" }
  }
}
```

### Evidence

```json
{
  "$id": "https://pharossecurity.example/schemas/evidence.json",
  "type": "object",
  "required": ["type", "citation"],
  "properties": {
    "type": { "type": "string", "enum": ["client-stated", "documentary", "configuration-observed", "technical-test", "external-observation", "inferred"] },
    "verificationLevel": { "type": "string", "enum": ["self-reported", "documented", "observed", "verified"], "description": "Client-facing simplification of type; see evidence-standard.md" },
    "citation": { "type": "string", "description": "What specifically was seen, said, or tested" },
    "collectedDate": { "type": "string", "format": "date" }
  }
}
```

### Mapping

```json
{
  "$id": "https://pharossecurity.example/schemas/mapping.json",
  "type": "object",
  "required": ["category", "reference"],
  "properties": {
    "category": { "type": "string", "enum": ["legal-requirement", "government-guidance", "industry-good-practice", "pharos-recommendation"] },
    "framework": { "type": "string", "enum": ["ncsc-mcss", "ncsc-csf", "cis-ig1", "privacy-act-2020", "ipp-3a"] },
    "reference": { "type": "string", "description": "e.g. \"NCSC MCSS: Multi-factor Authentication\" or \"Privacy Act 2020, IPP 3A\"" }
  }
}
```

### ActionItem (90-day plan / Management Action Register entry)

```json
{
  "$id": "https://pharossecurity.example/schemas/action-item.json",
  "type": "object",
  "required": ["findingId", "action", "owner", "status"],
  "properties": {
    "findingId": { "type": "string" },
    "action": { "type": "string" },
    "phase": { "type": "string", "enum": ["first-14-days", "days-15-30", "days-31-60", "days-61-90", "now", "next", "later"] },
    "owner": { "type": "string" },
    "targetDate": { "type": "string", "format": "date" },
    "status": { "type": "string", "enum": ["not-started", "planned", "in-progress", "blocked", "complete-client-reported", "verified-complete", "risk-accepted"] },
    "completionEvidence": { "type": "string" },
    "pharosVerification": { "type": "string" },
    "notes": { "type": "string" }
  }
}
```

### Verification (follow-up review record)

```json
{
  "$id": "https://pharossecurity.example/schemas/verification.json",
  "type": "object",
  "required": ["findingId", "reviewDate", "result"],
  "properties": {
    "findingId": { "type": "string" },
    "reviewDate": { "type": "string", "format": "date" },
    "clientClaim": { "type": "string" },
    "evidenceReviewed": { "$ref": "evidence.json" },
    "result": { "type": "string", "enum": ["verified-complete", "remediated-partially-verified", "not-remediated", "recurrence-new-finding"] },
    "newFindingId": { "type": "string", "description": "Set only if result is recurrence-new-finding" }
  }
}
```

## What this schema deliberately does not do

It does not define a database, an API, or an application. It does not require every engagement to be entered into a system before this methodology can be used — a Pharos assessment today is still run and recorded in markdown tables, exactly as described in `evidence-standard.md` and the templates in `05_Client_Templates/`. This schema exists so that if and when a tool is built, the underlying concept of "what a finding is" doesn't need to be redesigned; it's already been thought through here.
