# SKILL: WCAG Accessibility Audit

## Purpose
Audit a Figma design system against WCAG 2.2 Level AA (with AAA callouts).
Covers color contrast, focus states, touch targets, ARIA patterns, keyboard
navigation, and accessibility annotation completeness.

---

## When to invoke
- "Accessibility audit", "check WCAG compliance", "a11y review"
- Before engineering handoff
- When preparing for an accessibility certification or legal compliance check

---

## Default standard
WCAG 2.2 Level AA unless user specifies Level AAA or Section 508.

---

## Step-by-step instructions

### Step 1 — Focus state audit
Every interactive component MUST have a visible focus state.

Check each interactive component for:
- [ ] Focus ring exists as a variant or state
- [ ] Focus ring uses a token (not hardcoded color)
- [ ] Focus ring is NOT only color-differentiated (must have shape/outline change too)
- [ ] Focus ring has minimum 3:1 contrast ratio against adjacent colors
- [ ] Focus ring offset is ≥ 2px from the component edge

**WCAG criterion:** 2.4.11 Focus Appearance (AA), 2.4.12 Focus Appearance (AAA)

Flag: Any interactive component missing a focus state variant.
Flag: Focus rings that are only a color fill change (no outline/ring).

### Step 2 — Touch target sizing
All interactive elements must meet minimum tap target sizes.

Check size of interactive components:
- WCAG 2.2 minimum: 24×24px (AA)
- Recommended: 44×44px (AAA, also Apple/Google guidelines)
- Note: Target size ≠ visual size. Spacing around small targets can compensate.

Flag: Any interactive component smaller than 24×24px with no surrounding spacing buffer.
Flag: Icon-only buttons without a defined minimum target size.

### Step 3 — Text and icon accessibility annotations
Check components for accessibility annotation layers:

Look for annotation frames/components that document:
- [ ] ARIA role (e.g., `role="button"`, `role="dialog"`)
- [ ] ARIA labels for icon-only elements
- [ ] ARIA live regions for dynamic content (toasts, alerts)
- [ ] Heading levels for typographic components
- [ ] Tab order / focus sequence annotations on complex components (modals, forms)
- [ ] `aria-expanded`, `aria-selected`, `aria-checked` for stateful components

**WCAG criteria:** 4.1.2 Name, Role, Value (AA)

Flag: Components with interactive behavior but no ARIA role documented.
Flag: Icon-only components with no aria-label annotation.

### Step 4 — Error and form accessibility
For all form-related components:

- [ ] Error state exists
- [ ] Error message is NOT communicated by color alone (must have text or icon)
- [ ] Required fields are marked with more than just a red asterisk (label + aria-required annotation)
- [ ] Input label is always visible (placeholder-only inputs FAIL)
- [ ] Helper text and error text are linked to the input (documented in annotation)
- [ ] Autocomplete attributes documented where applicable

**WCAG criteria:** 1.3.5 Identify Input Purpose (AA), 3.3.1 Error Identification (AA), 3.3.2 Labels or Instructions (A)

### Step 5 — Decorative vs meaningful images/icons
Check icon usage across components:

- Decorative icons: should be annotated `aria-hidden="true"`
- Meaningful icons (icon-only buttons): must have `aria-label` annotation
- Illustrations used for content: must have alt text documented

Flag: Icon components with no guidance on decorative vs meaningful usage.

### Step 6 — Animation and motion
(See also Skill 08 for motion tokens)

Check if the system documents:
- [ ] Which animations are decorative (safe to disable)
- [ ] Whether components with animation have a `prefers-reduced-motion` token or variant
- [ ] Flashing/blinking elements — must be < 3 flashes/second or none

**WCAG criterion:** 2.3.1 Three Flashes or Below Threshold (A), 2.3.3 Animation from Interactions (AAA)

### Step 7 — Reading order and visual hierarchy
Scan key screen-level components (modals, sidebars, cards):

- [ ] Visual reading order matches expected DOM/tab order
- [ ] Headings use semantic hierarchy (not just visual size)
- [ ] Content is not conveyed by shape, color, or position alone

**WCAG criteria:** 1.3.1 Info and Relationships (A), 1.3.2 Meaningful Sequence (A)

### Step 8 — Cognitive accessibility (WCAG 2.2 additions)
- [ ] Error messages suggest corrections (3.3.3 Error Suggestion — AA)
- [ ] Important actions have confirmation step (3.3.4 Error Prevention — AA)
- [ ] Session timeout is documented and user is warned (2.2.1)
- [ ] Consistent navigation patterns across components

---

## Scoring

| Check | Points |
|-------|--------|
| All interactive components have focus states | 20 |
| Touch targets ≥ 24px | 10 |
| ARIA annotations present on interactive components | 20 |
| Form error states don't rely on color alone | 15 |
| Icon-only elements have aria-label annotations | 10 |
| Motion/animation has reduced-motion consideration | 10 |
| Error messages suggest corrections | 10 |
| Consistent navigation patterns | 5 |
| **Total** | **100** |

Score 90–100: WCAG AA Ready
Score 70–89: Near compliant — specific fixes needed
Score 50–69: Significant a11y debt
Score <50: Does not meet AA baseline

---

## Output template

```
## WCAG Accessibility Audit Report

**Score: XX/100**
**Standard:** WCAG 2.2 Level AA
**File:** [Figma file name]

### Critical failures (must fix before launch)
- [component]: [WCAG criterion] — [issue] — Fix: [action]

### Warnings
- [component]: [issue] — Recommendation: [fix]

### Missing annotations
- [list of components with no ARIA documentation]

### Passes
- [list]

### AAA opportunities (beyond AA)
- [list of AAA improvements that are low effort]
```

---

## References
- WCAG 2.2 full spec: https://www.w3.org/TR/WCAG22/
- APCA contrast (perceptual): https://www.myndex.com/APCA/
- Figma a11y annotation kit: https://www.figma.com/community/file/953682768192596304
- Inclusive Components: https://inclusive-components.design/
