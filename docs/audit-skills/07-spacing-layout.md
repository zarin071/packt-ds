# SKILL: Spacing & Layout Audit

## Purpose
Audit the spacing scale, layout grid system, and density system in a Figma design system.
Checks for mathematical consistency, token completeness, autolayout alignment,
and whether density variants exist for data-heavy interfaces.

---

## When to invoke
- "Spacing audit", "check layout tokens", "review grid system"
- When preparing to export spacing tokens to CSS/Tailwind/Style Dictionary
- When multiple teams report "everything feels different" across surfaces

---

## Step-by-step instructions

### Step 1 — Extract the spacing scale
Via Figma MCP, get all spacing-related variables:
- Spacing (padding, margin, gap)
- Sizing (width, height, icon size)
- Radius (border-radius)
- Grid/layout tokens (column count, gutter, margin)

### Step 2 — Scale consistency check

A spacing scale should follow a consistent base unit and multiplier.

**Common valid systems:**

4-point grid (most common):
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`

8-point grid:
`8, 16, 24, 32, 40, 48, 64, 80, 96, 128`

T-shirt naming (mapped to a base scale):
`2xs: 2px, xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px, 2xl: 32px, 3xl: 48px`

**Check:**
- Are ALL spacing values multiples of 4? (or 8 for 8pt grid systems?)
- Are there any off-grid values (e.g., 6px, 10px, 14px, 18px)?
- Are values named consistently (not a mix of `sm`, `small`, `s`, `S`)?
- Is there a base unit token? (`space-base: 4px`)

Flag: Off-grid spacing values used in components.
Flag: More than 12 distinct spacing values (likely uncontrolled growth).
Flag: No token for `space-0` (needed for explicit zero spacing).

### Step 3 — Token naming check

Expected naming structure:
```
space-[scale-step]           → space-4, space-8, space-16
space-[role]-[property]      → space-component-padding-inline-md
```

Or T-shirt naming:
```
space-xs, space-sm, space-md, space-lg, space-xl
```

Flag: Numeric names that represent pixel values (brittle: `space-16px` breaks if the scale changes)
Flag: Mixing naming systems within the same collection

### Step 4 — Layout grid system check

Via Figma MCP, check if pages/frames have grid/layout guides applied.

Verify:
- [ ] Column grid defined (common: 12-col, 8-col, 4-col for mobile)
- [ ] Gutter width tokenised
- [ ] Outer margin tokenised
- [ ] Breakpoints documented (sm, md, lg, xl, 2xl — or equivalent)
- [ ] Mobile grid defined (4-col minimum)
- [ ] Is the grid responsive or fixed width?

Flag: No grid defined on any frames in the file.
Flag: Grid with non-standard gutter (not a multiple of 4 or 8).
Flag: No mobile grid variant.

### Step 5 — Autolayout consistency in components

Sample 20 components and check:
- Are internal paddings using space tokens (variable references)?
- Are gaps between elements using space tokens?
- Are any padding values arbitrary (e.g., `padding: 11 15`)?
- Is autolayout applied consistently, or are some components using absolute positioning?

Flag: More than 20% of sampled components using raw padding values.
Flag: Components with mixed autolayout + absolute positioning that could be autolayout.

### Step 6 — Density variants (medium/high priority for data products)

For enterprise or data-heavy products, components should have density variants:

- [ ] Default/comfortable density (generous padding)
- [ ] Compact/medium density (reduced padding)
- [ ] Dense/condensed density (minimal padding for data tables, code editors)

Check if density is handled via:
- Separate component variants (explicit)
- Spacing tokens with density mode (Figma modes: default, compact, dense)
- Neither (flag as missing for enterprise use cases)

### Step 7 — Sizing tokens

Check for defined tokens for:
- Icon sizes: `size-icon-sm (16px)`, `size-icon-md (20px)`, `size-icon-lg (24px)`
- Avatar sizes: `size-avatar-sm`, `size-avatar-md`, `size-avatar-lg`
- Component height tokens: `size-control-sm (32px)`, `size-control-md (40px)`, `size-control-lg (48px)`

Flag: Components whose height varies arbitrarily rather than from a sizing token.
Flag: Icon sizes not aligned to the grid (19px, 23px are common violations).

---

## Scoring

| Check | Points |
|-------|--------|
| All spacing values on 4pt or 8pt grid | 20 |
| Consistent token naming for spacing | 15 |
| Layout grid tokens defined | 15 |
| Mobile grid / breakpoints documented | 10 |
| Components use spacing tokens (not raw values) | 20 |
| Density variants exist (or acknowledged as out of scope) | 10 |
| Sizing tokens for icons and controls | 10 |
| **Total** | **100** |

---

## Output template

```
## Spacing & Layout Audit Report

**Score: XX/100**
**Grid system:** [4pt / 8pt / unknown]
**Spacing tokens found:** [N]

### Off-grid values found
- [value]: used in [components]

### Grid system
- Column grid: [defined / missing]
- Gutter: [value / not tokenised]
- Breakpoints: [documented / missing]

### Components with raw spacing values
- [list of worst offenders]

### Density support
[Yes: explicit variants / Yes: token modes / No: missing]

### Priority fix queue
1. [item]
```

---

## References
- 8pt grid system: https://spec.fm/specifics/8-pt-grid
- Figma autolayout guide: https://help.figma.com/hc/en-us/articles/5731482952599
- Density in Material Design: https://m2.material.io/design/layout/applying-density.html
