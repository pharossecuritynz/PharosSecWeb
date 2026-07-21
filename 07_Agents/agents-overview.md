# Agents Overview

This folder contains copy-paste-ready AI agent prompts for running Pharos Security's content, advisory, and quality processes through Claude, ChatGPT, Cursor, or another AI tool. Each agent is a standalone system-style prompt — paste it in as the first message (or system prompt, if your tool supports one), then provide the specific inputs requested.

## Agent index

| Agent | Use for |
|---|---|
| [Brand Strategist](brand-strategist-agent.md) | Brand decisions, messaging consistency checks, positioning questions |
| [Website Copywriter](website-copywriter-agent.md) | Drafting or revising website copy |
| [Service Designer](service-designer-agent.md) | Designing or refining a service offering |
| [NZ SME Cyber Advisor](nz-sme-cyber-advisor-agent.md) | Simulating client-facing advisory conversations, drafting risk explanations |
| [Microsoft 365 Review](microsoft-365-review-agent.md) | Drafting findings for an M365 Basics Review |
| [Phishing Readiness](phishing-readiness-agent.md) | Drafting findings for an Email and Phishing Readiness engagement |
| [Incident Readiness](incident-readiness-agent.md) | Drafting an Incident Readiness Plan from workshop notes |
| [Report Writer](report-writer-agent.md) | Turning raw findings/notes into a polished client report |
| [Proposal Writer](proposal-writer-agent.md) | Drafting a proposal email from discovery call notes |
| [Marketing Content](marketing-content-agent.md) | Drafting LinkedIn posts, checklists, and other marketing content |
| [Quality Review](quality-review-agent.md) | Reviewing any client-facing deliverable before sending |

Plus [agent-operating-rules.md](agent-operating-rules.md) — the shared rules every agent prompt inherits.

## How to use these

1. Open the relevant agent file
2. Copy the entire prompt into your AI tool of choice
3. Provide the specific inputs requested at the bottom of the prompt (client notes, raw findings, etc.)
4. Review the output against the agent's own quality checklist before using it — **these agents draft, they don't replace human judgement.** Every output must be reviewed by the founder before reaching a client, per [../04_Operating_Manual/quality-checklist.md](../04_Operating_Manual/quality-checklist.md).

## Design principles behind these agents

- Every agent is grounded in the actual brand voice, service definitions, and boundaries documented elsewhere in this project — they reference (and should be kept in sync with) [../01_Brand/](../01_Brand/), [../03_Services/](../03_Services/), and [../04_Operating_Manual/](../04_Operating_Manual/)
- Every agent has explicit boundaries — none are permitted to invent client facts, overstate findings, or produce content that violates [../03_Services/service-boundaries.md](../03_Services/service-boundaries.md)
- Every agent output is a **draft for human review**, never an auto-send deliverable

## Keeping agents in sync

If brand voice, services, or pricing change, update the source documents first, then update any agent prompt that references them. Treat these agent files as living documents, same as everything else in this project — log significant updates in [../10_Admin/document-control-register.md](../10_Admin/document-control-register.md).
