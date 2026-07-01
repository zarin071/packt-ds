# SKILL: Typography Scale Audit

## Purpose
Audit the typographic system in a Figma design system.
Checks scale logic, token coverage, line-height and letter-spacing correctness,
responsive type behaviour, variable font readiness, and consistency of usage.

---

## When to invoke
- "Typography audit", "check type scale", "review fonts and text styles"
- When standardising an existing messy type system
- When preparing to implement typography tokens in code

---

## Step-by-step instructions

### Step 1 — Inventory text styles and typography tokens

Via Figma MCP, extract:
- All text styles (name, font family, weight, size, line height, letter spacing, paragraph spacing)
- All typography-related variables (font-size, line-height, font-weight, font-family, letter-spacing)

Group by scale tier: display, heading, body, label, code, caption

### Step 2 — Scale logic check

A well-formed type scale follows a mathematical ratio or a curated step system.

**Common valid scales:**
- Major Third (1.25×): 12, 15, 19, 24, 30, 38, 48, 60
- Perfect Fourth (1.333×): 12, 16, 21, 28, 37, 50, 67
- T-shirt scale (custom): 12, 14, 16, 18, 20, 24, 30, 36, 48, 60

**Check:**
- Is there a consistent ratio or intentional step between sizes?
- Are there duplicate or near-duplicate sizes? (e.g., 14px AND 15px AND 16px = three small sizes too close together)
- Are there more than 8–10 distinct sizes? (Usually a sign of uncontrolled growth)
- Does each size have a clear semantic role?

Flag: Sizes within 1–2px of each other without distinct semantic purpose.
Flag: More than 2 sizes between 12px–16px.
Flag: No display/hero size (> 40px) if the product has marketing/hero content.

### Step 3 — Token naming check

For typography tokens, names should follow this structure:
```
font-size-[role]-[modifier]
line-height-[role]-[modifier]
font-weight-[role]
letter-spacing-[role]
```

Examples of PASS:
- `font-size-body-md`, `font-size-heading-xl`, `font-size-label-sm`
- `line-height-body`, `line-height-heading`
- `font-weight-regular`, `font-weight-semibold`

Examples of FAIL:
- `text-16`, `text-lg` (no role context)
- `heading1`, `bodySmall` (camelCase, inconsistent)
- `font-size-14` (value in the name)
- `H1`, `P1`, `Caption` (semantic HTML names, not design roles)

### Step 4 — Line height audit

Line height is the most commonly broken property in type systems.

**Rules:**
- Heading / display text: 1.1–1.25× font size (tight)
- Body text: 1.4–1.6× font size (comfortable reading)
- Labels / UI text: 1.2–1.4× font size
- Captions: 1.3–1.5× font size

Check each style:
- Body text with line height < 1.4 → flag (too tight, reading difficulty)
- Heading text with line height > 1.4 → flag (too loose, looks unintentional)
- Line height expressed as a fixed px value (not relative %) → flag as fragile

**WCAG criterion:** 1.4.12 Text Spacing — body text must support up to 1.5× line height without loss of content.

### Step 5 — Letter spacing audit

- Display/hero: slight negative tracking (−0.01em to −0.03em) is common
- Body text: 0 or very slight positive (0 to 0.01em)
- ALL CAPS labels: +0.05em to +0.1em (tracking required for readability)
- Small text (< 14px): slight positive tracking

Flag: Body text with aggressive negative tracking (< −0.01em)
Flag: ALL CAPS text with no letter spacing token
Flag: Letter spacing values in px instead of em (breaks with font size changes)

### Step 6 — Font weight coverage

Minimum recommended weight coverage:
- [ ] Regular (400)
- [ ] Medium (500) or Semibold (600)
- [ ] Bold (700)

Flag: Systems using only Regular and Bold (missing midpoint for UI emphasis)
Flag: Systems with 5+ weights (usually 3 is sufficient for UI, flag for review)
Flag: Font weights used that the chosen typeface doesn't actually support (will fallback to nearest)

### Step 7 — Responsive typography

Check if the system handles type at different viewport sizes:

- Are there size tokens for different breakpoints? (`font-size-heading-xl-mobile` vs `font-size-heading-xl-desktop`)
- Or does the system use a fluid type approach (CSS clamp)?
- Are display/heading sizes significantly smaller on mobile? (A 60px heading at mobile is problematic)

Flag: Systems with no mobile type scale consideration.
Flag: Systems where heading sizes are identical across breakpoints.

### Step 8 — Consistency of usage in components

Sample 10 components and check:
- Are text layers using text style references, NOT direct property overrides?
- Are font sizes round numbers from the type scale, or arbitrary (e.g., 13px, 15px)?
- Is the type scale being applied consistently (not mixing Heading/2 with Body/Large for the same visual role across components)?

---

## Scoring

| Check | Points |
|-------|--------|
| Scale follows logical ratio / intentional steps | 15 |
| Token naming follows role-based convention | 15 |
| Line heights in correct range per tier | 20 |
| Letter spacing correct (especially for caps/small text) | 10 |
| Full weight coverage (Regular + mid + Bold) | 10 |
| Responsive type consideration | 15 |
| Components use style references, not overrides | 15 |
| **Total** | **100** |

---

## Output template

```
## Typography Scale Audit Report

**Score: XX/100**
**Text styles found:** [N]
**Typography variables found:** [N]

### Scale logic
[Scale ratio identified / Irregular — see flagged sizes]

### Flagged sizes (too close together)
- [size A] and [size B]: [reason]

### Line height issues
- [style name]: [value] — [too tight / too loose for [role]]

### Letter spacing issues
- [style name]: [issue]

### Responsive type
[Handled / Missing — recommendation]

### Components with direct property overrides (not using styles)
- [list]

### Priority fix queue
1. [item]
```

---

## References
- Type Scale calculator: https://typescale.com/
- WCAG 1.4.12 Text Spacing: https://www.w3.org/TR/WCAG22/#text-spacing
- Variable fonts on Google Fonts: https://fonts.google.com/variablefonts
- Figma variable typography (2025): https://help.figma.com/hc/en-us/articles/15023066823575
