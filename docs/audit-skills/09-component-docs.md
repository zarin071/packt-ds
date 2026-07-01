# SKILL: Component Documentation Audit

## Purpose
Audit how well each component in the design system is documented.
Covers usage guidance, do/don't examples, when-to-use logic, 
content guidelines, and code/design handoff completeness.

---

## When to invoke
- "Doc audit", "check component documentation", "review usage guidelines"
- When onboarding new designers or engineers to the system
- When adoption is low and teams say "I don't know how to use this component"

---

## Step-by-step instructions

### Step 1 — Inventory documentation coverage

For each component, check what documentation exists:

Via Figma MCP, check for:
- Component description in the component panel
- Annotation/spec frame in the same page as the component
- Link in description to external docs (Storybook, Notion, Zeroheight, etc.)
- Do/Don't example frames

Assign each component a documentation tier:
- **Tier 1 — Undocumented:** No description, no annotations, no link
- **Tier 2 — Minimal:** Description only, no usage guidance
- **Tier 3 — Partial:** Has do/don'ts but no when-to-use or content guidelines
- **Tier 4 — Complete:** Description + when to use + do/don'ts + content guidance + code link

### Step 2 — Do / Don't coverage

For high-usage components, check that do/don't frames exist covering:
- [ ] Layout / placement rules
- [ ] Content length / truncation behaviour
- [ ] What NOT to combine with this component
- [ ] Incorrect variant usage (e.g., don't use danger button for non-destructive actions)

Flag: High-usage components (buttons, inputs, cards, modals) with no do/don't frames.

### Step 3 — When-to-use guidance

The most important documentation for adoption is knowing WHEN to use a component
vs a similar alternative.

Check for guidance that distinguishes:
- `Button` vs `Link` vs `Icon Button`
- `Modal` vs `Drawer` vs `Popover` vs `Tooltip`
- `Toast` vs `Alert` vs `Inline notification`
- `Input` vs `Textarea` vs `Select` vs `Combobox`

Flag: Systems with no when-to-use docs on components that have near-identical alternatives.

### Step 4 — Content guidelines

Text in UI components is a design decision, not a developer task.

Check if documentation covers:
- [ ] Character limits for labels, headings, descriptions
- [ ] Tone of voice (formal, friendly, neutral)
- [ ] Truncation behaviour (where and how text cuts off)
- [ ] Placeholder text guidelines
- [ ] Error message writing guidelines
- [ ] Empty state copy guidance

Flag: Form components with no content/copy guidelines.
Flag: Error states with no documented message writing rules.

### Step 5 — Anatomy documentation

Each component should have a labelled anatomy diagram showing:
- All named parts (e.g., Label, Control, Helper text, Icon)
- Which parts are required vs optional
- How parts relate to the component's properties in Figma

Flag: Complex components (data tables, navigation, forms) with no anatomy diagram.

### Step 6 — Deprecated / legacy component handling

Check for:
- Components with "DEPRECATED", "OLD", "v1", "legacy" in their name
- Are deprecated components hidden from the library? (They should be)
- Is there migration guidance from deprecated → current components?
- Are deprecated components still used in design files?

Flag: Deprecated components still published in the library.
Flag: No migration guidance from old to new components.

---

## Scoring

| Check | Points |
|-------|--------|
| >80% of components at Tier 2 or above | 15 |
| >50% of components at Tier 3 or above | 15 |
| High-usage components at Tier 4 | 20 |
| Do/Don't frames on high-usage components | 15 |
| When-to-use docs for similar component pairs | 15 |
| Content guidelines for text-bearing components | 10 |
| Deprecated components handled cleanly | 10 |
| **Total** | **100** |

---

## Output template

```
## Component Documentation Audit Report

**Score: XX/100**
**Total components:** [N]

### Documentation tier breakdown
- Tier 1 (Undocumented): [N] components ([%])
- Tier 2 (Minimal): [N] components ([%])
- Tier 3 (Partial): [N] components ([%])
- Tier 4 (Complete): [N] components ([%])

### High-priority undocumented components
(High-usage or complex components with no/minimal docs)
- [component name]: Tier [N] — missing: [what's missing]

### When-to-use gaps
- [component A] vs [component B]: no differentiation guidance

### Content guidelines gaps
- [component]: no copy/content guidance

### Deprecated component issues
- [component]: still published / no migration path

### Priority fix queue
1. [item]
```

---

## References
- Zeroheight documentation patterns: https://zeroheight.com/
- Brad Frost component doc templates: https://bradfrost.com/blog/
- Spectrum (Adobe) component docs: https://spectrum.adobe.com/
- Shopify Polaris component docs: https://polaris.shopify.com/
