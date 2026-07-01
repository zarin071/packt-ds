# SKILL: Design–Code Sync Audit

## Purpose
Audit the parity between Figma design system components and their code implementations.
Checks Code Connect mapping completeness, token export readiness, prop/variant
alignment, and detached component rate.

---

## When to invoke
- "Code sync audit", "check Code Connect", "design-dev parity", "Storybook alignment"
- Before a major system release where design and code must be in sync
- When engineers report that Figma specs don't match what's buildable

---

## Prerequisites
- A repository URL or Storybook instance to compare against (ask user if not provided)
- Figma Dev Mode access (or Code Connect configured)

---

## Step-by-step instructions

### Step 1 — Component pairing inventory

Create a mapping table: Figma component → Code component

For each Figma component, check if:
- [ ] A corresponding code component exists (React/Vue/Web Component/etc.)
- [ ] Code Connect is configured (links Figma component to code in Dev Mode)
- [ ] Component name in Figma matches the import name in code
- [ ] Props in Figma match the component's code API

Classify each component as:
- **Mapped:** Full Code Connect link, names match, props aligned
- **Partial:** Exists in code but no Code Connect, or props don't match
- **Design only:** Exists in Figma but not yet built in code
- **Code only:** Exists in code but not in the Figma library

### Step 2 — Prop/variant parity check

For mapped components, compare Figma properties to code props:

| Check | PASS | FAIL |
|-------|------|------|
| Variant names match | `size: sm|md|lg` in both | Figma: `Small/Med/Large`, Code: `sm|md|lg` |
| Boolean prop names match | `isDisabled` in both | Figma: `Disabled`, Code: `disabled` |
| Required props documented | All required props annotated | Missing required prop annotation |
| Default values match | Same default in Figma and code | Figma defaults to `md`, code defaults to `sm` |

Flag: Any variant name mismatch — this causes handoff confusion.
Flag: Props that exist in code but have no Figma equivalent (often added by engineers without design input).
Flag: Props that exist in Figma but aren't implemented in code.

### Step 3 — Token export readiness

Check if design tokens can be exported cleanly to code:

Via Figma MCP, check:
- Are all variables in Figma collections using naming that maps to CSS custom properties?
  (`color-background-primary` → `--color-background-primary`)
- Are there token types that don't yet have a code equivalent? (e.g., composite tokens, typography tokens)
- Is a token export pipeline configured? (Tokens Studio, Style Dictionary, Theo, etc.)

Check naming for CSS export:
- Figma variable name `color/background/primary` → should export as `--color-background-primary`
- Figma variable name `Color / Background / Primary` (with spaces) → will need transformation rules

Flag: Variable names with spaces, capital letters, or special characters that will break CSS export.
Flag: Collections with no clear export pipeline documented.

### Step 4 — Detached component rate

Via Figma MCP (if usage file access is available):
Count the ratio of:
- Component instances properly linked to main components
- Detached/broken instances (previously components, now just groups)

Report: Detachment rate as X% of total instances.

High detachment rate indicates:
- Component API too restrictive (engineers/designers detach to customize)
- Missing variants (common customizations not built in)
- Outdated components (component was restructured, breaking existing instances)

### Step 5 — Storybook / documentation site alignment

If a Storybook URL is provided:
- Are all Figma components represented in Storybook?
- Do Storybook stories cover all Figma-defined variants and states?
- Are there Storybook stories with no Figma design counterpart? (design debt)
- Are interaction tests (play functions) present for interactive components?

### Step 6 — Version alignment

Check for version drift:
- Is there a versioning system in place for the design system?
- Are there components in the Figma file marked with version numbers?
- Do components in Figma match the version published to npm/package manager?
- Are there breaking changes undocumented in either Figma or code?

---

## Scoring

| Check | Points |
|-------|--------|
| >80% of components have code equivalents | 20 |
| Code Connect configured for core components | 20 |
| Prop/variant names match between Figma and code | 20 |
| Token naming is CSS-export ready | 15 |
| Detachment rate < 10% | 15 |
| Storybook/docs aligned | 10 |
| **Total** | **100** |

---

## Output template

```
## Design–Code Sync Audit Report

**Score: XX/100**
**Figma components:** [N]
**Code components found:** [N]
**Code Connect configured:** [N]

### Mapping breakdown
- Fully mapped: [N] ([%])
- Partial: [N] ([%])
- Design only: [N] ([%])
- Code only: [N] ([%])

### Prop mismatch issues
- [component]: Figma [prop/value] vs Code [prop/value]

### Token export issues
- [N] variables with names that need transformation
- [list of problematic names]

### Detachment rate
[X]% ([N] of [N] instances)

### Storybook gaps
- Components in Figma with no Storybook story: [list]

### Priority fix queue
1. [item]
```

---

## References
- Figma Code Connect: https://www.figma.com/developers/code-connect
- Tokens Studio: https://tokens.studio/
- Style Dictionary: https://amzn.github.io/style-dictionary/
- Storybook Design Addon: https://storybook.js.org/addons/@storybook/addon-designs
