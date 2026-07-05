# Design System Ops Toolkit for Claude
### 11 AI skills that run your design system like it has a full-time ops lead

Nine daily skills that prevent design debt while you work. Two quarterly audits that catch what slipped through — and score it, so you can put a number in front of leadership.

Built and refined on a real production design system (Figma Variables → Tokens Studio → Style Dictionary → React), not a prompt-engineering exercise.

---

## The operating model

This pack is built around one distinction:

**Daily skills prevent debt.** They run while you work — speccing, reviewing, handing off — and stop problems from being created.

**Quarterly audits find debt.** They produce scored reports (each out of 100) that measure system health, surface what slipped through, and feed next quarter's roadmap.

If a skill produces an artifact you use to *do work today*, it's daily. If it produces a *score* that informs planning, it's quarterly. Run both and the system stops decaying.

---

## What's inside

### Daily stack — run while you work

| Skill | What it does | When |
|---|---|---|
| **design-critique-partner** | Prioritized senior critique: 5 issues max, ranked by impact | Any design shared for feedback |
| **component-api-designer** | Props, variants, slots, states — designed before build; audit mode for existing components | Per component |
| **token-architect** | 3-tier token architecture, naming, Figma→code pipeline; audit mode for hardcoded values & mode gaps | Token work |
| **handoff-spec-generator** | Complete dev specs + design–code parity verification (Code Connect, prop alignment) | Per handoff |
| **accessibility-auditor** | WCAG 2.2 AA audit — contrast math, the new 2.2 criteria, color token coverage, cited criteria per failure | Pre-merge gate |
| **design-system-documentarian** | Component docs with when-NOT-to-use guidance; doc coverage audit with tier scoring | Per component ship |
| **ux-copy-reviewer** | Buttons, errors, empty states — 3 options per string with a recommendation | Per copy task |
| **research-synthesizer** | Transcripts and tickets → evidence-graded insights (3+ sources or it's labeled an anecdote) | Per study |
| **stakeholder-presentation-builder** | Design rationale → the decision narrative executives fund | Per review/pitch |

### Quarterly audits — run every 3 months

| Skill | What it does |
|---|---|
| **governance-health** | Adoption metrics, debt ratios, versioning, contribution process — scored /100 |
| **pattern-consistency** | Cross-component interaction conflicts, anti-patterns, duplicate components — scored /100 |

---

## Quickstart (60 seconds)

**Claude.ai Projects (recommended):** Create a Project, upload the skill files, and add to Project Instructions: *"When my request matches an uploaded skill file, follow that skill's workflow and output format."* Then just work — Claude picks the right skill.

**Per-conversation:** Paste one skill file at the start of a chat, then make your request.

**Claude Code / API:** Drop the files into your skills directory or system prompt.

**With Figma MCP connected:** the audit-mode skills (token-architect, component-api-designer, governance-health, pattern-consistency) can inspect real files instead of descriptions — this is where the pack goes from useful to unfair.

---

## A suggested rhythm

**Per feature:** spec the API (component-api-designer) → build on tokens (token-architect) → critique + copy pass → handoff spec → accessibility gate → document.

**Per quarter:** run governance-health and pattern-consistency → put the scores in your system review → feed the fix queues into next quarter's backlog.

The scores are the point: "token debt is at 23%, down from 31%" is a sentence that gets design system work funded.

---

## Getting the best output

- **Answer the intake questions.** Every skill opens with 3–4; answering them (or pre-empting them in your first message) is the single biggest quality lever.
- **Push back.** These skills defend their recommendations with reasoning. "Why not the alternative?" is where the senior-level output lives.
- **Adapt the Rules sections.** Each skill ends with judgment rules — edit them to match your team's conventions. Starting points, not scripture.
- **Keep methodology owners intact.** Detachment counting lives in governance-health; token export checks live in token-architect. Other skills reference them so your numbers reconcile across audits.

## What this won't do

Replace your judgment, your users, or a real assistive-technology test. It makes the structured 80% faster so you spend your time on the 20% only you can do.

---

*Lifetime updates included. Questions, or an audit you wish existed? Reply to your purchase receipt.*
