# SKILL: Component Anatomy Audit

## Purpose
Audit the structural quality of components in a Figma design system.
Checks variant coverage, property API design, layer naming, slot architecture,
and whether components are built for composition rather than coverage.

---

## When to invoke
- "Audit my components", "check component structure", "review component variants"
- Before handing off a design system to engineering
- When assessing whether a Figma library is ready for Code Connect mapping

---

## Step-by-step instructions

### Step 1 — Component inventory
Via Figma MCP, list all components and component sets in the library.
Group them by category (if pages/sections exist).

For each component set, collect:
- Component name
- Number of variants
- Property names and types (boolean, string, instance-swap, variant)
- Number of direct child layers
- Whether it's a local or remote component

### Step 2 — Naming and organisation check

**Component naming:**
- Should be singular noun or noun phrase: `Button`, `Card`, `Navigation Item`
- NOT: `Buttons`, `button-new`, `Copy of Card v2`, `DEPRECATED_Modal`
- Slash grouping should be consistent: `Forms/Input`, `Forms/Checkbox`, not `form-input` mixed with `Forms/Dropdown`

**Layer naming inside components:**
- Every layer should be named semantically, not left as `Rectangle 12`, `Group 4`, `Frame 8`
- Boolean layers should match their property name: property `has icon` → layer `icon`
- Autolayout frames should describe their role: `content`, `actions`, `header`, not `Frame`
- Check: % of unnamed/generic layers across sampled components

**Property API quality:**
- Boolean props: use for show/hide of optional elements (`has icon`, `is loading`)
- Variant props: use for mutually exclusive states (`size: sm|md|lg`, `variant: primary|secondary`)
- String props: use for text content, not for state management
- Instance swap props: use for swappable sub-components (icons, avatars)
- Flag if boolean props are named `true/false` (should be descriptive: `with badge/without badge` → just use `has badge`)

### Step 3 — Variant coverage check

For EACH component, check that variants cover the required state matrix:

**States to look for:**
- [ ] Default / Rest
- [ ] Hover
- [ ] Focus (keyboard)
- [ ] Active / Pressed
- [ ] Disabled
- [ ] Loading (where applicable)
- [ ] Error / Invalid (form elements)
- [ ] Selected / Checked (toggles, checkboxes)
- [ ] Empty state (data components)

**Sizes (if component is size-aware):**
- [ ] At minimum: 2 sizes
- [ ] Ideally: sm / md / lg (or t-shirt naming)

**Theme variants:**
- [ ] Light mode appearance
- [ ] Dark mode appearance (either via modes or documented separately)

Flag: Components with only 1 variant when multiple states are needed.

### Step 4 — Slot / composition architecture

A well-built component exposes slots (instance-swap properties or nested components) rather than baking in fixed content.

Check for:
- Icon slots using instance-swap properties (not hardcoded icon paths)
- Avatar/thumbnail slots for content components
- Action slots (e.g., trailing icon, badge) that can be toggled
- Whether text content is exposed as a text layer property

Flag: Components with more than 3 hardcoded text layers that aren't surfaced as properties.

### Step 5 — Detached instance detection

Use Figma MCP to scan usage files (if accessible) or the component file itself for:
- Instances that have been detached from their main component
- Overrides that go beyond what the component API allows (structural changes)

Report: Detachment rate as % of total component instances found.

### Step 6 — Component documentation meta

Check if each component has a description in Figma:
- Component description present? (Figma allows this in component properties panel)
- Link to external docs or Storybook in description?
- Do/don't annotation frames in the library file?

Flag components with no description at all.

---

## Scoring

| Check | Points |
|-------|--------|
| Consistent slash-grouped naming | 10 |
| No generic layer names (>90% named layers) | 15 |
| Well-structured property API | 20 |
| Full state variant coverage (default+hover+focus+disabled minimum) | 25 |
| Slot/composition architecture used | 15 |
| Component descriptions present | 10 |
| Detachment rate < 10% | 5 |
| **Total** | **100** |

---

## Output template

```
## Component Anatomy Audit Report

**Score: XX/100**
**Total components found:** [N]
**Component sets:** [N]

### Naming issues
- [component]: [issue]

### Missing states
- [component]: missing [hover / focus / disabled / error]

### API quality issues
- [component]: [issue with property structure]

### Detachment rate
[X]% of instances are detached ([N] of [N])

### No-description components (top 10 by usage)
- [list]

### Priority fix queue
1. [item]
2. ...
```

---

## References
- Brad Frost Atomic Design: https://atomicdesign.bradfrost.com/
- Figma component best practices: https://help.figma.com/hc/en-us/articles/360038662654
- Component API design (Nathan Curtis): https://medium.com/eightshapes-llc/component-api-guidelines-e6e10dc97e5f
