---
name: handoff-spec-generator
description: Turn a finished design into a complete developer handoff spec AND verify design-code parity. Use when a design is "ready for dev," for engineering specs, redlines, or when checking Code Connect mapping and token export readiness.
---

# Handoff Spec Generator

You produce handoff specs that answer the questions engineers actually ask — so the designer isn't pinged 15 times during build week. You also verify design-code sync: Code Connect, prop parity, and token export readiness.

## Intake

From the design (screenshot, Figma context, or description), identify:
- The component(s) or screen(s) in scope
- The design system in use (token names change everything)
- Target platform(s): web, iOS, Android, responsive web
- Is this a new component or an update to an existing mapped component?

If states are missing from the design (they usually are), list them as **"Designer must confirm"** items rather than inventing them silently.

## Spec structure

Produce the spec in this exact order:

### 1. Overview
One paragraph: what this is, where it lives, what user job it does. Link/reference the source design.

### 2. Anatomy
Numbered breakdown of every element in the component/screen, top-to-bottom, left-to-right. Name each element with the design system's vocabulary where possible.

### 3. Layout & spacing
- Container behavior (fixed, fluid, max-width)
- Internal spacing using **tokens, not pixels** where a system exists (`space-400`, not `16px`) — include the pixel value in parentheses
- Alignment and stacking rules

### 4. Design tokens
Table: element → property → token → resolved value. Cover color, typography, spacing, radius, elevation. Flag any hardcoded value that has no token as a **system gap**.

### 5. Component API (props & variants)
```
Prop        Type                      Default     Notes
variant     'primary' | 'secondary'   'primary'
size        'sm' | 'md' | 'lg'        'md'
disabled    boolean                   false
```
Only include props the design actually demonstrates or clearly implies.

### 6. Interaction states
For every interactive element: default, hover, focus (keyboard — describe the focus ring), active, disabled, loading. State the visual delta from default, not a full re-description.

### 7. Behavior & edge cases
- Text overflow: truncate where? wrap where? min/max content lengths
- Empty, loading, and error states
- What happens on slow network / failed request
- Min and max counts for repeated items

### 8. Responsive rules
Breakpoint table: what changes at each. If nothing was designed for a breakpoint, say "Not designed — proposal:" and give one.

### 9. Accessibility notes
Semantic element/role, keyboard interaction, focus order, ARIA where needed, contrast confirmations, touch target sizes (≥44px).

### 10. Open questions
Everything the designer must confirm before build. Never bury these — engineers read this section first.

## Design–Code Sync Verification (Post-Handoff)

After generating the spec, verify parity:

### Component pairing inventory
For each Figma component, check if:
- [ ] A corresponding code component exists
- [ ] Code Connect is configured (links Figma component to code in Dev Mode)
- [ ] Component name in Figma matches the import name in code
- [ ] Props in Figma match the component's code API

Classify each component as:
- **Mapped:** Full Code Connect link, names match, props aligned
- **Partial:** Exists in code but no Code Connect, or props don't match
- **Design only:** Exists in Figma but not yet built in code
- **Code only:** Exists in code but not in the Figma library

### Prop/variant parity check
| Check | PASS | FAIL |
|-------|------|------|
| Variant names match | `size: sm \| md \| lg` in both | Figma: `Small/Med/Large`, Code: `sm \| md \| lg` |
| Boolean prop names match | `isDisabled` in both | Figma: `Disabled`, Code: `disabled` |
| Default values match | Same default in Figma and code | Figma defaults to `md`, code defaults to `sm` |

Flag: Any variant name mismatch — this causes handoff confusion.
Flag: Props that exist in code but have no Figma equivalent (often added by engineers without design input).
Flag: Props that exist in Figma but aren't implemented in code.

### Token export readiness
Run the export readiness check from `token-architect` (its "Token export readiness check" section is the owner of this methodology) against the tokens this handoff consumes. Report only failures relevant to this component here.

### Detachment rate
Report the detachment rate for the components in this handoff's scope, using the counting methodology owned by `governance-health` (Step 3), so per-handoff numbers roll up cleanly into the quarterly audit.

### Version alignment
- Is there a versioning system in place?
- Do components in Figma match the version published to npm/package manager?
- Are there breaking changes undocumented in either Figma or code?

## Output format

```
## Handoff Spec: [Component/Screen Name]

### Overview
...

### Design tokens
| Element | Property | Token | Value |
|---------|----------|-------|-------|
| ...

### Component API
...

### States
...

### Edge cases
...

### Responsive
...

### Accessibility
...

### Open questions
1. ...

### Design–Code Sync Status
- Mapped: [N] | Partial: [N] | Design only: [N] | Code only: [N]
- Prop mismatches: [list]
- Token export issues: [list]
- Detachment rate: [X]%
```

## Rules

- Tokens over pixels, always, when a system exists.
- Never invent states or behavior without marking it as a proposal.
- Keep prose minimal; tables and lists are the format engineers scan.
- If the scope is a full screen, spec the screen-level layout first, then each component, linking rather than repeating shared components.
- Run sync verification after every handoff to prevent drift.
