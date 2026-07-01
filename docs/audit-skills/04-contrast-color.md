# SKILL: Contrast & Color Audit

## Purpose
Audit color usage across a design system for WCAG contrast compliance,
semantic color misuse, and color-alone communication failures.
Produces specific pass/fail ratios for every text-on-background combination found.

---

## When to invoke
- "Check contrast", "color audit", "WCAG contrast check", "are my colors accessible?"
- As part of a full accessibility audit
- When introducing a new color palette or dark mode

---

## Step-by-step instructions

### Step 1 — Extract the color palette
Via Figma MCP, pull all:
- Color variables (all modes: light, dark, high-contrast if present)
- Color styles not yet migrated to variables
- Any hardcoded hex fills found in component layers

Organise into:
- Background colors
- Surface colors (cards, panels)
- Text colors
- Border/stroke colors
- Icon colors
- Interactive/brand colors
- Status colors (success, warning, error, info)

### Step 2 — Contrast ratio calculation
For each semantic text-on-background pairing, calculate WCAG contrast ratio.

**WCAG 2.2 thresholds:**

| Text type | AA minimum | AAA minimum |
|-----------|-----------|-------------|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 | 7:1 |
| Large text (≥ 18pt or ≥ 14pt bold) | 3:1 | 4.5:1 |
| UI components / icons / borders | 3:1 | — |
| Decorative / disabled text | exempt | exempt |

**Key pairings to always check:**
- `color-text-primary` on `color-background-primary`
- `color-text-secondary` on `color-background-primary`
- `color-text-primary` on `color-background-secondary` (cards, surfaces)
- `color-text-on-[brand]` on `color-background-[brand]` (e.g., white on primary button)
- `color-text-inverse` on `color-background-inverse`
- All status text on their background variants
  - error text on error background
  - success text on success background
  - warning text on warning background
  - info text on info background
- All disabled text states (should be exempt but flag if ratio is < 1.5:1, excessively low)

**Dark mode:** Repeat ALL checks for dark mode token values.

### Step 3 — Semantic color misuse detection

Check whether color tokens are being used for their intended purpose:

**Violations to flag:**
- `color-text-error` used for decorative/non-error content
- `color-background-success` used as a generic green fill
- Status colors (`warning`, `danger`, `info`) used for brand/decorative purposes
- Brand color used as `color-text-primary` (brand color may not have sufficient contrast as body text)
- Inverted text colors (`color-text-inverse`) used on non-inverted backgrounds

### Step 4 — Color-alone communication check

Identify any component where information is communicated ONLY by color:

**Patterns to flag:**
- Form validation: red border only (no error text, no icon)
- Status badges: color only, no label text
- Charts/graphs: color-only data differentiation (no pattern, label, or shape)
- Required fields: red asterisk with no text annotation
- Link text same color as surrounding text — underline or weight difference required

**WCAG criterion:** 1.4.1 Use of Color (Level A)

### Step 5 — High contrast mode check (optional but recommended)

If a high-contrast mode exists:
- Do all key pairings meet 7:1 (AAA)?
- Are borders/UI elements at least 3:1?
- Are there any components that break visually at high contrast?

If no high-contrast mode exists, flag as a recommendation.

### Step 6 — Color token coverage for status states

Check that EACH status (error, warning, success, info) has a full set:
- [ ] Background (subtle)
- [ ] Background (bold/solid)
- [ ] Text on subtle background
- [ ] Text on bold background
- [ ] Border color
- [ ] Icon color

Flag any status that's missing these variants — designers will likely hardcode values.

---

## Scoring

| Check | Points |
|-------|--------|
| All primary text/background combos pass AA | 25 |
| All status text/background combos pass AA | 20 |
| Dark mode combos pass AA | 20 |
| No color-alone communication failures | 20 |
| No semantic color misuse | 10 |
| Full status token coverage | 5 |
| **Total** | **100** |

---

## Output template

```
## Contrast & Color Audit Report

**Score: XX/100**
**Mode audited:** Light / Dark / Both
**Total pairings checked:** [N]

### Contrast results

| Pairing | Ratio | WCAG AA | WCAG AAA |
|---------|-------|---------|---------|
| text-primary on bg-primary | X.X:1 | ✅ PASS | ✅ PASS |
| text-secondary on bg-primary | X.X:1 | ✅ PASS | ❌ FAIL |
| text-on-danger on bg-danger | X.X:1 | ❌ FAIL | ❌ FAIL |
...

### Color-alone communication failures
- [component]: [description of issue]

### Semantic color misuse
- [instance]: [token used incorrectly]

### Missing status token variants
- [status]: missing [background-subtle / text-on-bold / border]

### Priority fix queue
1. [FAIL with highest user impact]
2. ...
```

---

## References
- WebAIM contrast checker: https://webaim.org/resources/contrastchecker/
- APCA (Advanced Perceptual Contrast Algorithm): https://www.myndex.com/APCA/
- WCAG 1.4.3 Contrast (Minimum): https://www.w3.org/TR/WCAG22/#contrast-minimum
- Figma Stark plugin: https://www.figma.com/community/plugin/732603254453395948
