# SKILL: Pattern Consistency Audit

## Purpose
Audit cross-component UX pattern consistency in a design system.
Catches anti-patterns, conflicting interaction models, inconsistent feedback
patterns, and areas where the same problem is solved differently across components.

---

## When to invoke
- "Pattern audit", "UX consistency check", "cross-component review"
- When users report the product "feels inconsistent"
- Before a system unification or consolidation effort
- After multiple teams have contributed components independently

---

## Step-by-step instructions

### Step 1 — Interaction pattern inventory

Scan all interactive components and group by interaction type:

**Disclosure / expansion**
- Accordion, Disclosure, Collapsible section, FAQ item
- Check: Do all use the same chevron direction convention? (Down = closed, Up = open)
- Check: Do all animate the same way?
- Check: Are keyboard interactions consistent (Enter/Space to toggle)?

**Selection**
- Checkbox, Radio, Toggle/Switch, Segmented control, Tabs, Chip group
- Check: Is selection feedback consistent? (Check icon, fill change, border change)
- Check: Do multi-select components use checkbox, not radio?
- Check: Do single-select components use radio, not checkbox?

**Dismissal**
- Modal, Drawer, Tooltip, Popover, Toast, Sheet, Banner
- Check: Does `Escape` dismiss ALL overlay components?
- Check: Do modals always have an explicit close button? (Not just click-outside)
- Check: Is click-outside-to-dismiss consistent? (Should be optional for destructive modals)

**Form submission**
- Buttons, Forms, Dialogs with actions
- Check: Is the primary action always on the right? Or consistently on the left?
- Check: Is destructive action always using a danger/red variant?
- Check: Is cancel/dismiss always secondary weight?

### Step 2 — Feedback pattern consistency

Check that user feedback is handled consistently:

**Loading states**
- What loading pattern does each component use? (Spinner, Skeleton, Progress bar, Shimmer)
- Are loading patterns consistent for similar contexts?
  - Inline loading (e.g., button loading): should use spinner
  - Page-level loading: should use skeleton
  - Data loading (tables/lists): should use skeleton rows, not full-page spinner

Flag: Multiple conflicting loading patterns for the same context.

**Empty states**
- Do all list/table/card components have empty state variants?
- Are empty states consistent in structure? (Illustration + Heading + Description + CTA)
- Do empty states use consistent illustration style?

Flag: Components with no empty state variant.
Flag: Empty states that are plain text only with no structure.

**Error states**
- Do all form inputs use the same error pattern? (Red border + error icon + error text below)
- Do all async operations (API calls) have an error state?
- Is the error message placement consistent? (Always below the input, never above)

Flag: Inputs using different error patterns (some with icon, some without).

### Step 3 — Navigation pattern audit

Check navigation components for consistency:

- Is there only ONE primary navigation component? (Not multiple "nav" variants solving the same problem)
- Do breadcrumbs, tabs, and sidebar navigation use consistent active state treatment?
- Is back-navigation handled consistently?
- Do page-level navigation items use consistent interaction feedback?

### Step 4 — Typography usage patterns

Audit whether typographic hierarchy is applied consistently:

Sample 15 screens/frames and check:
- Page titles always use the same type style
- Section headings always use the same type style
- Body copy always uses the same type style
- Labels/captions consistently use label styles

Flag: Screens where H1 uses different sizes
Flag: Screens where body text uses 3+ different font sizes

### Step 5 — Anti-pattern detection

Look for known UX anti-patterns in the component library:

| Anti-pattern | Check |
|-------------|-------|
| Too many CTAs | Does any component layout encourage more than 2 primary actions? |
| Confirm-shaming | Do any modal/dialog rejection labels use guilt-inducing language? |
| Dark patterns in forms | Required fields buried, pre-checked boxes |
| Disabled without reason | Disabled buttons with no tooltip explaining why |
| Placeholder as label | Form inputs where placeholder is the only label |
| Unlabelled icon buttons | Icon-only interactive elements with no accessible name |
| Infinite scroll with no pagination fallback | — |
| Modal on mobile > 80% viewport height | Effectively a full page — use a sheet instead |

### Step 6 — Duplicate component detection

Identify components that solve the same problem differently:

Common duplicates to look for:
- Multiple "card" components that serve the same content role
- Both "Dropdown" and "Select" for the same use case
- "Popup", "Popover", "Tooltip" with overlapping intent
- Multiple loading spinners at different sizes that aren't variants of one component

Flag: True duplicates (same problem, different component).
Distinguish from intentional variants (different problems that look similar).

---

## Scoring

| Check | Points |
|-------|--------|
| Disclosure/expansion patterns consistent | 10 |
| Selection patterns correct (checkbox vs radio) | 10 |
| Dismissal pattern consistent (Escape key, close button) | 15 |
| Loading states consistent per context | 15 |
| Error patterns consistent | 15 |
| Typography hierarchy consistent across screens | 10 |
| No dark pattern anti-patterns | 15 |
| No duplicate/redundant components | 10 |
| **Total** | **100** |

---

## Output template

```
## Pattern Consistency Audit Report

**Score: XX/100**

### Interaction pattern conflicts
- [pattern type]: [component A] does X, [component B] does Y — [recommendation]

### Loading state inconsistencies
- [context]: using [pattern A] and [pattern B] — should be [recommended pattern]

### Error state inconsistencies
- [list]

### Anti-patterns found
- [component/pattern]: [anti-pattern name] — Fix: [recommendation]

### Potential duplicate components
- [component A] vs [component B]: [overlapping use case] — [recommendation]

### Priority fix queue
1. [item]
```

---

## References
- Nielsen Norman Group heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
- Inclusive Design Patterns (Heydon Pickering): https://www.smashingmagazine.com/inclusive-design-patterns/
- Anti-patterns library: https://www.darkpatterns.org/
- Figma pattern libraries (real-world examples):
  - Atlassian Design System: https://atlassian.design/
  - Shopify Polaris: https://polaris.shopify.com/
  - IBM Carbon: https://carbondesignsystem.com/
