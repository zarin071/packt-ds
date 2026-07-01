# SKILL: Theming & Dark Mode Audit

## Purpose
Audit the completeness and correctness of theming implementation —
primarily light/dark modes but also multi-brand and high-contrast themes.
Catches hardcoded values that break in theme switches, missing mode coverage,
and dark mode anti-patterns.

---

## When to invoke
- "Dark mode audit", "check theming", "review modes", "multi-brand readiness"
- When a dark mode has just been added
- Before releasing a white-label or multi-brand variant

---

## Step-by-step instructions

### Step 1 — Mode inventory
Via Figma MCP, list all variable collections and their modes.

Expected minimum:
- `color` collection → modes: `light`, `dark`
- Optionally: `high-contrast`, `brand-A`, `brand-B`

Flag if:
- No dark mode exists (report as missing feature, not a score failure)
- A collection has modes defined but some variables are missing values in non-default modes
- Modes exist but are never applied at the page/frame level in the file

### Step 2 — Semantic token mode coverage
For every semantic token (from Skill 01), check that ALL modes have a defined value.

Use Figma MCP to get variable values per mode. Flag any variable where:
- A mode value is `undefined` or empty
- A mode value is identical to the default (light) value for a color token
  (this may indicate a copy-paste error — e.g., dark mode background is still white)

Report: "X of Y semantic tokens have incomplete mode coverage"

### Step 3 — Hardcoded value scan (dark mode failure risk)
Scan all component layers for fills, strokes, and effects NOT using variable references.

Any hardcoded hex value is a dark mode risk because it won't respond to mode switching.

Classify by severity:
- **Critical:** Hardcoded dark text color (e.g., `#000000`, `#1A1A1A`) on a surface
  → Will be invisible in dark mode
- **Critical:** Hardcoded light background (e.g., `#FFFFFF`, `#F5F5F5`) on a component
  → Will look blown-out in dark mode
- **Warning:** Hardcoded mid-range color that may or may not conflict
- **Low:** Hardcoded values in purely decorative/illustrative elements

### Step 4 — Surface hierarchy check

A proper dark mode has a layered surface system, NOT a single background color.

Check that dark mode has distinct values for:
- [ ] Page background (darkest)
- [ ] Card/panel surface (slightly lighter)
- [ ] Overlay/elevated surface (lightest, e.g., modals, popovers)
- [ ] Inverse surface (for elements that stay light in dark mode)

Flag: Dark mode that uses only 1–2 background values (flat dark mode).
Flag: Dark mode where cards are DARKER than the page background (inverted elevation).

### Step 5 — Color inversion quality check

Check that dark mode token values follow these rules:

**Background tokens:**
- Must get significantly darker (not just slightly darker)
- Page bg in dark mode should typically be in the 900–950 range of a neutral scale

**Text tokens:**
- Must get significantly lighter
- Primary text in dark mode should be near-white (not dark gray)

**Brand/accent colors:**
- Often need adjustment in dark mode — a vibrant blue on white may be too harsh on dark
- Check: Are brand colors using a lighter/muted tint in dark mode?

**Status colors:**
- Error/warning/success often need lighter tints on dark backgrounds
- Check: Are status backgrounds using a dark-mode-specific tint, not the same bold fill as light mode?

### Step 6 — Component-level dark mode testing

Sample 10 components from the library and manually verify in each mode:

For each component, toggle to dark mode and check:
- No text becomes unreadable (check contrast — see Skill 04)
- No borders disappear (border tokens must have dark mode values)
- No background bleeds to white
- Focus rings are visible
- Shadows/elevation still communicate depth (in dark mode, shadows are often replaced by lighter surface backgrounds)

### Step 7 — Multi-brand readiness (if applicable)

If the system is meant to support multiple brands:
- Are primitive color tokens separated from semantic tokens?
  (Brand switching should only require swapping primitives, not touching semantics)
- Are there font-family tokens that can be swapped per brand?
- Are logos and brand assets handled via instance-swap or component slots?
- Is there a "brand" variable collection or mode?

---

## Scoring

| Check | Points |
|-------|--------|
| Dark mode exists | 15 |
| All semantic tokens have values in all modes | 20 |
| No hardcoded critical values (text/bg) in components | 25 |
| Surface hierarchy has 3+ levels in dark mode | 15 |
| Brand/status colors adjusted for dark mode | 15 |
| Multi-brand architecture possible (primitives separated) | 10 |
| **Total** | **100** |

---

## Output template

```
## Theming & Dark Mode Audit Report

**Score: XX/100**
**Modes found:** [light / dark / high-contrast / brand-X]

### Mode coverage gaps
- [collection]: [variable] missing value in [mode]

### Critical hardcoded values (dark mode failure risk)
- [component] layer [layer name]: hardcoded [value] — will break in dark mode

### Surface hierarchy
- Light: [N] distinct background levels → [PASS / FAIL]
- Dark: [N] distinct background levels → [PASS / FAIL]

### Dark mode quality check (sampled components)
- [component]: [PASS / issue found]

### Multi-brand readiness
[READY / NOT READY] — [reason]

### Priority fix queue
1. [item]
```

---

## References
- Figma variables and modes: https://help.figma.com/hc/en-us/articles/15145852043927
- Dark mode design: https://material.io/design/color/dark-theme.html
- Atlassian elevation in dark mode: https://atlassian.design/foundations/color-new/dark-mode
