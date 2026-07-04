# 10 — MCP Prompts
# Pre-built prompts for Figma MCP + Claude workflows

Copy and use these verbatim. Replace [BRACKETED] values with your specifics.

---

## Generate a component from spec

```
Read 03-component-specs/Button.md, 07-react-rules/RULES.md,
08-storybook-rules/RULES.md, and 05-accessibility/RULES.md.

Generate a production-ready Button component for Packt DS.

Create these files:
- src/components/Button/Button.tsx
- src/components/Button/Button.types.ts
- src/components/Button/Button.test.tsx
- src/components/Button/Button.stories.tsx
- src/components/Button/Button.mdx
- src/components/Button/index.ts

Follow all rules from 07-react-rules/RULES.md exactly.
Use CSS custom properties from the token spec — no hardcoded values.
```

---

## Audit a Figma component against its spec

```
Read 03-component-specs/Button.md and 09-figma-rules/RULES.md.
Connect to my Figma library [FILE_URL].

Audit the Button component against the spec. Check:
1. Does it have all variants defined in the spec? (primary, secondary, ghost, danger)
2. Does it have all sizes? (sm, md, lg)
3. Does it have all states? (default, hover, focus, disabled, loading)
4. Are all fills linked to variables, not hardcoded hex?
5. Are layer names semantic (not Frame 12, Group 4)?
6. Does it have component descriptions?
7. Are the variant and size property names exactly matching the spec?

Report findings as PASS / WARN / FAIL with specific layer names.
```

---

## Generate a new component spec from a Figma component

```
Connect to my Figma library [FILE_URL].
Find the [ComponentName] component.

Read 03-component-specs/_TEMPLATE.md.
Read 06-design-principles/PRINCIPLES.md.

Generate a complete component spec for [ComponentName] by:
1. Reading all variants and properties from the Figma component
2. Inspecting the layer structure and naming
3. Reading all variable references on fills, strokes, and type
4. Filling in the _TEMPLATE.md structure with what you find
5. Flagging any gaps where the Figma component doesn't have a spec answer

Save the result as 03-component-specs/[ComponentName].md
```

---

## Sync tokens from Figma to design-tokens.json

```
Connect to my Figma library [FILE_URL].
Read all variable collections and their modes.

Compare against tokens/design-tokens.json.

Report:
1. Variables in Figma that are missing from design-tokens.json
2. Variables in design-tokens.json that no longer exist in Figma
3. Value mismatches between Figma and JSON for the same token name

Do not auto-update — just report the diff for manual review.
```

---

## Audit token coverage across components

```
Connect to my Figma library [FILE_URL].
Read all component layers.

For every layer that has a fill, stroke, or text style:
1. Check if the value is linked to a Figma variable
2. If it is NOT linked, flag it as a hardcoded value

Report:
- Total layers scanned
- % using variables
- % hardcoded
- List of hardcoded values with layer path and hex value

This is the token coverage audit from 01-token-architecture skill.
```

---

## Generate Code Connect for all components

```
Connect to my Figma library [FILE_URL].
Read 07-react-rules/RULES.md and 09-figma-rules/RULES.md.

For each component in the Figma library:
1. Get the component's nodeId
2. Read its variant properties and map them to the matching React prop names
   (use 03-component-specs/ files for the mapping)
3. Generate a Code Connect file

Save files as:
src/components/[ComponentName]/[ComponentName].figma.ts
```

---

## Run a full design system health audit

```
Run the following audit skills in order against my Figma library [FILE_URL].
Use the spec files from docs/audit-skills/ for each.

1. docs/audit-skills/01-token-architecture.md
2. docs/audit-skills/02-component-anatomy.md
3. docs/audit-skills/04-contrast-color.md
4. docs/audit-skills/05-theming-dark-mode.md

After each skill, write a brief summary with score and top 3 issues.
After all 4, write an overall system health score (0–100) and
a prioritised fix queue sorted by impact.
```

---

## Generate Storybook docs from spec

```
Read 03-component-specs/[ComponentName].md
and 08-storybook-rules/RULES.md.

Generate [ComponentName].stories.tsx and [ComponentName].mdx
for Storybook 8.

The stories file must include:
Playground, AllVariants, AllSizes, States, HubContexts, LightAndDark
as named exports.

The MDX file must use <Meta of={[ComponentName]Stories} />
and include all usage rules from the spec.
```

---

## Add a new hub to the token system

```
Read docs/DESIGN.md and tokens/design-tokens.json.
Read 06-design-principles/PRINCIPLES.md.

A new hub called "[HUB_NAME]" needs to be added with colour [HEX].

Generate:
1. A primitive ramp (100–900) for [HEX]
2. Semantic tokens following the Hub-Learn / Hub-News pattern:
   Hub-[Name]/bg-default, bg-hover, bg-selected, text-default,
   text-on-accent, border-default, border-subtle, icon-default,
   tag-bg, tag-text
3. Light mode values (reference primitives)
4. Dark mode values (shifted to dark stops)

Output as JSON to merge into tokens/design-tokens.json.
Also output the CSS vars to append to src/tokens/tokens.css.
```
