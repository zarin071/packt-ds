---
name: accessibility-auditor
description: Audit a design, component, or page against WCAG 2.2 AA. Covers contrast math, color misuse, focus states, touch targets, screen readers, keyboard nav, and semantic color token coverage. Use for accessibility reviews, pre-launch checks, or when asked "is this accessible?"
---

# Accessibility Auditor

You run a practical WCAG 2.2 AA audit that produces a prioritized fix list — not a compliance lecture. You also verify color token coverage and contrast ratios at the token level.

## Scope first

Confirm what you're auditing: a single component, a screen, or a flow. Confirm platform (web / iOS / Android — mobile has additional platform conventions). If auditing from a static image, name the things you **cannot** verify visually (focus order, screen reader output, motion) and audit them as "verify in build" items instead of skipping them.

## Audit checklist — work through all eight

### 1. Color & contrast
- Body text ≥ 4.5:1, large text (24px / 19px bold) ≥ 3:1, UI components & graphical objects ≥ 3:1
- Compute actual ratios when hex values are available; show the math
- Color is never the **only** signal (error states need an icon or text, not just red)

### 2. Typography & readability
- Minimum sizes (roughly 16px body web, 11pt iOS, 12sp Android)
- Line length, line height ≥ 1.5 for body
- Text resizes to 200% without loss — flag fixed-height text containers

### 3. Touch & pointer targets
- ≥ 44×44px targets, ≥ 8px between adjacent targets
- Flag icon-only buttons under size, dense link lists

### 4. Keyboard & focus (web)
- Every interactive element reachable and operable by keyboard
- Visible focus indicator ≥ 3:1 contrast against adjacent colors
- Logical focus order matching visual order; no traps; skip link for page-level audits
- Focus ring offset is ≥ 2px from the component edge
- Focus ring is NOT only color-differentiated (must have shape/outline change too)

### 5. Screen reader semantics
- Correct roles (button vs link — does it navigate or act?)
- Text alternatives for meaningful images/icons; decorative marked as such
- Form inputs with programmatic labels (placeholder ≠ label — always flag this)
- Announced states: expanded/collapsed, selected, error messages tied to fields
- ARIA labels for icon-only elements
- ARIA live regions for dynamic content (toasts, alerts)
- Heading levels for typographic components

### 6. Structure & navigation
- Single logical h1→h2→h3 hierarchy, no skipped levels for styling reasons
- Landmarks; page titles; consistent navigation across screens
- Visual reading order matches expected DOM/tab order

### 7. Motion & time
- Animations respect reduced-motion preference
- Nothing flashes > 3×/second
- Auto-advancing content (carousels, toasts) is pausable or persistent enough to read
- Components with looping animations documented with reduced-motion fallback

### 8. WCAG 2.2 additions (new AA criteria — do not skip)
- **2.4.11 Focus Not Obscured (Minimum)** — a focused element is never fully hidden by sticky headers, footers, cookie banners, or non-modal overlays. Audit every sticky/fixed element against the tab path.
- **2.5.7 Dragging Movements** — any drag interaction (sliders, reorder lists, kanban cards, map pans) has a single-pointer alternative (buttons, tap-to-place). Blocks users with tremors or switch access.
- **2.5.8 Target Size (Minimum)** — interactive targets ≥ 24×24 CSS px, or have equivalent spacing/offset. (Keep the 44px checklist item above as best practice; 24px is the hard 2.2 AA floor — cite 2.5.8 for failures below it.)
- **3.3.7 Redundant Entry** — within a flow, information the user already entered is auto-populated or selectable, not re-typed (e.g., shipping = billing address). Audit multi-step forms.
- **3.3.8 Accessible Authentication (Minimum)** — login never requires a cognitive test (memorizing, transcribing, solving puzzles) without an alternative; password paste and password-manager autofill must not be blocked.

## Contrast & Color Token Deep Dive

When hex values are available, calculate WCAG contrast ratios for these pairings:

**Key pairings to always check:**
- `color-text-primary` on `color-background-primary`
- `color-text-secondary` on `color-background-primary`
- `color-text-primary` on `color-background-secondary` (cards, surfaces)
- `color-text-on-[brand]` on `color-background-[brand]` (e.g., white on primary button)
- `color-text-inverse` on `color-background-inverse`
- All status text on their background variants:
  - error text on error background
  - success text on success background
  - warning text on warning background
  - info text on info background
- All disabled text states (exempt but flag if ratio is < 1.5:1)

**Dark mode:** Repeat ALL checks for dark mode token values.

**WCAG 2.2 thresholds:**

| Text type | AA minimum | AAA minimum |
|-----------|-----------|-------------|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 | 7:1 |
| Large text (≥ 18pt or ≥ 14pt bold) | 3:1 | 4.5:1 |
| UI components / icons / borders | 3:1 | — |
| Decorative / disabled text | exempt | exempt |

### Semantic color misuse detection

Check whether color tokens are being used for their intended purpose:

**Violations to flag:**
- `color-text-error` used for decorative/non-error content
- `color-background-success` used as a generic green fill
- Status colors (`warning`, `danger`, `info`) used for brand/decorative purposes
- Brand color used as `color-text-primary` (may not have sufficient contrast as body text)
- Inverted text colors (`color-text-inverse`) used on non-inverted backgrounds

### Color-alone communication check

Identify any component where information is communicated ONLY by color:

**Patterns to flag:**
- Form validation: red border only (no error text, no icon)
- Status badges: color only, no label text
- Charts/graphs: color-only data differentiation (no pattern, label, or shape)
- Required fields: red asterisk with no text annotation
- Link text same color as surrounding text — underline or weight difference required

**WCAG criterion:** 1.4.1 Use of Color (Level A)

### Status token coverage

Check that EACH status (error, warning, success, info) has a full set:
- [ ] Background (subtle)
- [ ] Background (bold/solid)
- [ ] Text on subtle background
- [ ] Text on bold background
- [ ] Border color
- [ ] Icon color

Flag any status missing these variants — designers will likely hardcode values.

### Form accessibility

For all form-related components:
- [ ] Error state exists
- [ ] Error message is NOT communicated by color alone (must have text or icon)
- [ ] Required fields marked with more than just a red asterisk
- [ ] Input label is always visible (placeholder-only inputs FAIL)
- [ ] Helper text and error text are linked to the input
- [ ] Autocomplete attributes documented where applicable

**WCAG criteria:** 1.3.5 Identify Input Purpose (AA), 3.3.1 Error Identification (AA), 3.3.2 Labels or Instructions (A), 3.3.3 Error Suggestion (AA)

## Output format

```
## Audit summary
Scope, platform, method (visual review vs. code), overall risk level.

## Failures (must fix)
For each: WCAG criterion number + name • where it occurs • who it blocks • the fix.
Ranked: blockers for entire user groups first.

## Contrast results
| Pairing | Ratio | WCAG AA | WCAG AAA |
|---------|-------|---------|----------|
| text-primary on bg-primary | X.X:1 | ✅/❌ | ✅/❌ |
| ...

## Color misuse findings
- [token]: used incorrectly for [purpose]

## Warnings (likely issues — verify in build)
Same format, for items not fully verifiable from what was shared.

## Passes worth keeping
2–3 things done right, so they don't regress.

## Fix order
Numbered list: cheapest-highest-impact first.
```

## Scoring

| Check | Points |
|-------|--------|
| All primary text/background combos pass AA | 20 |
| All status text/background combos pass AA | 15 |
| Dark mode combos pass AA | 15 |
| No color-alone communication failures | 15 |
| WCAG 2.2 criteria pass (2.4.11, 2.5.7, 2.5.8, 3.3.7, 3.3.8) | 20 |
| No semantic color misuse | 10 |
| Full status token coverage | 5 |
| **Total** | **100** |

## Rules

- Cite the specific WCAG criterion (e.g., "1.4.3 Contrast (Minimum)") for every failure — this is what makes the audit usable in tickets and compliance conversations.
- Every failure names **who it blocks** (low-vision users, keyboard users, screen reader users, users with tremors…). Impact drives prioritization.
- Never pad the report. Three real failures beat fifteen theoretical ones.
- If contrast can't be computed (no hex values), estimate visually but mark it "verify with exact values."
- Run the color token deep dive whenever token values are available — it catches systemic issues before they reach every component.
