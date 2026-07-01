# SKILL: Token Architecture Audit

## Purpose
Audit the design token hierarchy of a Figma-connected design system.
Checks that tokens follow a proper primitive → semantic → component layering,
use intent-based naming, and are structured for multi-theme scalability.

---

## When to invoke
- User says "audit my tokens", "check token naming", "review token structure"
- After connecting a Figma library via MCP
- When preparing to export tokens to code (Style Dictionary, Tokens Studio, etc.)

---

## Step-by-step instructions

### Step 1 — Inventory all variables/tokens
Use Figma MCP to extract:
- All variable collections in the file
- All variable names, types, values, and modes
- All styles (color, text, effect) that are NOT yet migrated to variables

List them grouped by collection.

### Step 2 — Check layer structure
Verify the three-tier token model exists:

**Tier 1 — Primitives (Global tokens)**
- Raw values only: `blue-500`, `space-4`, `font-size-16`
- Should NOT be used directly in components
- Should NOT contain semantic meaning in the name
- Check: Do primitive collections exist separately from semantic ones?

**Tier 2 — Semantic (Alias tokens)**
- Reference primitives: `color-background-primary → blue-500`
- Named for INTENT not value: `color-text-error` not `color-text-red`
- Must cover all states: default, hover, active, disabled, focus
- Check: Are semantic tokens aliasing primitives, or re-declaring raw values?

**Tier 3 — Component tokens (optional but ideal at scale)**
- Scoped to components: `button-background-primary`
- Reference semantic tokens, not primitives
- Check: Do any component tokens skip a tier and reference raw values?

### Step 3 — Naming convention analysis
For each token, parse the name and check against this pattern:
```
[namespace]-[category]-[property]-[variant]-[state]
```
Examples of PASS:
- `color-background-surface-elevated`
- `space-component-button-padding-inline`
- `font-size-body-lg`

Examples of FAIL:
- `blue` (no category or property)
- `buttonBgHov` (abbreviations, camelCase)
- `color-#3B82F6` (value in name)
- `new-color-2` (non-descriptive)
- `text-red-error` (value + intent mixed, inconsistent ordering)

**Flag:**
- Names describing visual value instead of intent at semantic level
- Inconsistent separators (mixing `_`, `-`, `.`)
- CamelCase in a kebab-case system (or vice versa)
- Numeric suffixes without a scale logic (`color-1`, `color-2`)
- Abbreviations that aren't universal (`bg` = ok, `txt-prim-hvr` = not ok)

### Step 4 — Coverage check
Verify tokens exist for ALL of these property types:
- [ ] Color (background, text, border, icon, overlay)
- [ ] Typography (font-family, font-size, font-weight, line-height, letter-spacing)
- [ ] Spacing (padding, margin, gap — ideally a T-shirt scale: 2xs → 2xl)
- [ ] Border (radius, width, style)
- [ ] Shadow/Elevation
- [ ] Motion (duration, easing, delay) — see skill 08
- [ ] Z-index / Layering
- [ ] Opacity
- [ ] Breakpoints / Sizing

Flag any property type missing from the token system.

### Step 5 — Hardcoded value detection
Scan all component layers in the Figma file for:
- Fill values NOT linked to a variable or style
- Text properties NOT using a text style/variable
- Stroke widths or radii that are raw numbers not from a token

Report as: "X of Y layers use hardcoded values"

### Step 6 — Mode/theme completeness
For each variable collection that has modes:
- Do ALL variables have a value in ALL modes?
- Are there variables with `undefined` or empty values in any mode?
- Is there a `light` AND `dark` mode at minimum?
- Flag collections that only have 1 mode when they logically need more

---

## Scoring

| Check | Points |
|-------|--------|
| Three-tier hierarchy present | 20 |
| Naming follows intent-not-value at semantic level | 20 |
| Consistent naming pattern across all collections | 15 |
| Full property type coverage | 20 |
| No hardcoded values in components | 15 |
| All modes complete (no undefined values) | 10 |
| **Total** | **100** |

Score 90–100: Excellent
Score 70–89: Good, minor fixes needed
Score 50–69: Moderate debt, systematic improvements required
Score <50: Significant architectural rework needed

---

## Output template

```
## Token Architecture Audit Report

**Score: XX/100**
**File:** [Figma file name]
**Collections found:** [list]

### ✅ Passes
- [item]

### ⚠️ Warnings
- [item] — Recommendation: [fix]

### ❌ Failures
- [item] — Impact: [why it matters] — Fix: [action]

### Hardcoded value count
[X] layers with raw color fills
[X] layers with raw typography
[X] layers with raw spacing/radius

### Priority fix queue
1. [Highest impact fix]
2. ...
```

---

## References
- W3C Design Token Community Group spec: https://tr.designtokens.org/format/
- Nathan Curtis token naming: https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676
- Figma Variables best practices: https://www.figma.com/resource-library/design-tokens/
