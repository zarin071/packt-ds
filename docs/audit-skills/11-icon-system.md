# SKILL: Icon System Audit

## Purpose
Audit the icon system in a Figma design system.
Checks icon set completeness, naming conventions, grid alignment,
visual consistency, accessibility labelling, and code export readiness.

---

## When to invoke
- "Icon audit", "check icon system", "review icon library"
- When adopting a new icon set or migrating between sets
- When engineers report inconsistent icon sizing in code

---

## Step-by-step instructions

### Step 1 — Icon inventory

Via Figma MCP, extract:
- Total number of icon components
- Icon naming conventions used
- Icon sizes (frame/canvas sizes)
- Whether icons use auto-layout or fixed frames
- Whether icon components use instance-swap from a set

### Step 2 — Icon grid / sizing check

Icons must be drawn on a pixel grid to render crisply.

**Standard icon sizes (must align to 4pt or 8pt grid):**
- 16×16px — small/inline (body text, table cells)
- 20×20px — default (buttons, form elements)
- 24×24px — medium (navigation, standalone)
- 32×32px — large (feature icons, empty states)
- 48×48px+ — illustration icons (onboarding, marketing)

Check each icon component:
- Frame size is one of the standard sizes
- Icon artwork is centered on a pixel grid
- Strokes are on whole-pixel boundaries (no 0.5px strokes unless intentional for 2x)
- Stroke weight is consistent across the set (common: 1.5px or 2px)
- Corner radius is consistent (0px for geometric, 1–2px for rounded)

Flag: Icons with non-standard sizes (17px, 23px, etc.)
Flag: Inconsistent stroke weights within the same icon set
Flag: Icons with artwork touching or bleeding beyond the frame edge

### Step 3 — Naming convention check

Icon names should follow a consistent pattern:

PASS:
- `icon-arrow-right`, `icon-chevron-down`, `icon-check-circle`
- `arrow/right`, `chevron/down`, `check/circle` (slash grouping)
- Kebab-case, descriptive, singular nouns

FAIL:
- `Arrow Right Icon`, `ChevronDown`, `icon_check`, `check-1`
- `i-arrow-r` (abbreviations)
- `arrow→` or `Arrow ›` (special characters)
- Names referencing visual style: `thick-arrow` (style should be in variant, not name)

**Variant structure for style variants:**
If multiple styles exist (outline, filled, two-tone), use variants:
- Property: `style: outline | filled | two-tone`
- NOT: separate components named `icon-heart-outline` and `icon-heart-filled`

### Step 4 — Set completeness check

Audit for missing icons across common categories:

**Core categories (must have):**
- [ ] Navigation: home, menu/hamburger, close/x, back, forward, search
- [ ] Actions: add/plus, edit/pencil, delete/trash, copy, download, upload, share
- [ ] Status: check/success, warning, error, info, loading/spinner
- [ ] UI controls: chevron-up/down/left/right, arrow directions, sort, filter
- [ ] Media: play, pause, stop, volume, mute
- [ ] Communication: mail, notification/bell, message/chat
- [ ] User: user/person, profile/avatar, settings/gear
- [ ] Data: chart-bar, chart-line, table
- [ ] Files: file, folder, document, image, attachment/paperclip
- [ ] Social: external-link, link

Flag: Missing icons from the must-have core categories.
Report: % category coverage.

### Step 5 — Visual consistency check

Sample 20 icons and check for visual consistency:
- Do all icons feel like they're from the same family?
- Consistent optical weight (thin vs bold should match across all)
- Consistent corner rounding
- Consistent composition style (geometric vs organic)
- Consistent icon "cap height" (some icons may feel visually smaller even if same frame size)

Flag: Icons that visually stand out as imported from a different set.
Flag: Mix of outline AND filled icons in the default set without a variant system.

### Step 6 — Accessibility annotation check

Icons need accessibility guidance:

Check if icon component documentation covers:
- [ ] When icons are decorative (`aria-hidden="true"`)
- [ ] When icons carry meaning (must have `aria-label`)
- [ ] Icon-only interactive elements require an accessible name
- [ ] Minimum size for touchable icon buttons (24×24px target, ideally 44×44px)

Flag: Icon component with no accessibility documentation.

### Step 7 — Code export readiness

- Are icons exported as SVG?
- Are icon names in Figma matching the SVG filenames developers would use?
- Is there an icon component in the codebase that wraps SVGs? (icon registry pattern)
- Are icon sizes mapped to sizing tokens?

---

## Scoring

| Check | Points |
|-------|--------|
| Icons on standard pixel grid sizes | 15 |
| Consistent naming convention | 15 |
| Consistent stroke weight / style | 15 |
| Core category coverage > 80% | 20 |
| Style variants (outline/filled) use proper variant system | 10 |
| Accessibility documentation present | 15 |
| Code export naming alignment | 10 |
| **Total** | **100** |

---

## Output template

```
## Icon System Audit Report

**Score: XX/100**
**Total icons:** [N]
**Sizes found:** [list]
**Naming pattern:** [kebab / slash-group / inconsistent]

### Grid/sizing issues
- [icon]: [size issue]

### Naming violations
- [icon]: [issue]

### Category coverage
| Category | Coverage |
|----------|---------|
| Navigation | [N]/[expected] |
| Actions | [N]/[expected] |
...

### Visual consistency issues
- [icon]: [looks out of family — likely imported from different set]

### Priority fix queue
1. [item]
```

---

## References
- Phosphor Icons (open source): https://phosphoricons.com/
- Lucide Icons: https://lucide.dev/
- Heroicons: https://heroicons.com/
- Icon design guide (Google): https://fonts.google.com/knowledge/glossary/icon
- SVG icon systems in code: https://css-tricks.com/icon-fonts-vs-svg/
