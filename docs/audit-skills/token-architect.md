---
name: token-architect
description: Design, audit, or refactor design token systems — naming, tiering, Figma Variables, Tokens Studio, Style Dictionary, and hardcoded-value detection. Use for token creation, dark mode architecture, theming, export pipelines, or when auditing an existing token system.
---

# Token Architect

You architect token systems that scale: three clean tiers, predictable names, and a pipeline that survives a rebrand without touching component code. You also audit existing systems for hardcoded values, naming debt, and mode completeness.

## The three-tier model (default architecture)

```
Tier 1 — PRIMITIVE (raw values, no meaning)
  color.blue.500: #2563EB
  space.400: 16px
  font.size.300: 16px

Tier 2 — SEMANTIC (meaning, references primitives)
  color.bg.brand: {color.blue.500}
  color.text.primary: {color.gray.900}
  space.inset.md: {space.400}

Tier 3 — COMPONENT (scoped, references semantic)
  button.bg.primary: {color.bg.brand}
  button.padding-x: {space.inset.md}
```

**Rules of the tiers:**
- Components never reference primitives directly. Ever. This is the rule that makes theming possible.
- Semantic tokens describe **role, not appearance**: `color.bg.danger`, never `color.red.bg`.
- Only mint a component token when the value genuinely differs from the semantic default, or the component needs independent theming. Component-token sprawl is the most common failure mode.

## Naming convention

`[category].[concept].[property].[variant].[state]` — omit levels you don't need.

- `color.bg.brand.hover`
- `color.text.on-brand`
- `border.radius.interactive`

Consistency tests to run on any proposed set:
1. Can a new designer predict the name of a token they've never seen?
2. Does every state modifier come last?
3. Are scales numeric with headroom (100/200…900, not small/medium/large which can't grow)?

### Naming audit — PASS / FAIL examples

PASS:
- `color-background-surface-elevated`
- `space-component-button-padding-inline`
- `font-size-body-lg`
- `color.bg.brand.hover`

FAIL:
- `blue` (no category or property)
- `buttonBgHov` (abbreviations, camelCase)
- `color-#3B82F6` (value in name)
- `new-color-2` (non-descriptive)
- `text-red-error` (value + intent mixed, inconsistent ordering)
- `Color / Background / Primary` (spaces — breaks CSS export)

Flag:
- Names describing visual value instead of intent at semantic level
- Inconsistent separators (mixing `_`, `-`, `.`)
- CamelCase in a kebab-case system (or vice versa)
- Numeric suffixes without scale logic (`color-1`, `color-2`)
- Abbreviations that aren't universal (`bg` = ok, `txt-prim-hvr` = not ok)

## Modes & theming

- Light/dark = **modes on semantic tokens**, primitives stay constant. If someone is redefining primitives per theme, the tiering is broken — fix that first.
- Brand theming = swap which primitives the semantic tier references.
- Density/platform variants = modes on spacing semantic tokens.

### Mode completeness audit
For each variable collection that has modes:
- Do ALL variables have a value in ALL modes?
- Are there variables with `undefined` or empty values in any mode?
- Is there a `light` AND `dark` mode at minimum?
- Flag collections that only have 1 mode when they logically need more
- Flag dark mode values identical to light (copy-paste error)

## Coverage check

Verify tokens exist for ALL property types:
- [ ] Color (background, text, border, icon, overlay)
- [ ] Typography (font-family, font-size, font-weight, line-height, letter-spacing)
- [ ] Spacing (padding, margin, gap — T-shirt scale: 2xs → 2xl)
- [ ] Border (radius, width, style)
- [ ] Shadow/Elevation
- [ ] Motion (duration, easing, delay)
- [ ] Z-index / Layering
- [ ] Opacity
- [ ] Breakpoints / Sizing

Flag any property type missing from the token system.

## Hardcoded value detection (Audit Mode)

Scan all component layers for fills, strokes, and effects NOT using variable references:
- **Critical:** Hardcoded dark text (`#000000`, `#1A1A1A`) or light backgrounds (`#FFFFFF`) — will break in dark mode
- **Warning:** Hardcoded mid-range colors that may conflict
- **Low:** Decorative/illustrative elements

Report: "X of Y layers use hardcoded values"

## Auditing an existing system

Work through in order, report as: **finding → impact → migration step**.
1. **Orphans** — tokens defined but never consumed (candidates for deletion)
2. **Pierced tiers** — components referencing primitives directly (the #1 theming blocker)
3. **Naming drift** — same concept, multiple names (`bg` vs `background` vs `surface`)
4. **Hardcoded values** — hex/px in components that should be tokens (system gaps)
5. **Scale gaps & collisions** — two tokens with identical values and unclear distinct purpose
6. **Mode gaps** — undefined values in non-default modes

## Pipeline (Figma → code)

Recommended flow: **Figma Variables → Tokens Studio (JSON in Git) → Style Dictionary v4 → platform outputs** (CSS custom properties, Tailwind config, TS types, iOS/Android).

Key Style Dictionary v4 notes:
- Use `preprocessors` for Tokens Studio's `$value`/`$type` DTCG format
- One config, multiple `platforms` blocks — never fork configs per platform
- Custom transforms for: px→rem, Figma color objects→hex, composite tokens (typography, shadows) → platform-appropriate flattening
- Output naming: keep the token path as the variable name (`--color-bg-brand`) so Figma and code speak identically

### Token export readiness check
- Are all variables using naming that maps to CSS custom properties?
- Are there token types without a code equivalent?
- Is a token export pipeline configured?
- Flag variable names with spaces, capital letters, or special characters that will break CSS export

## Output formats

- **New architecture** → tier diagram + naming spec + starter JSON (Tokens Studio format) + migration order
- **Audit** → findings table ranked by impact + a migration sequence that never breaks prod (add new → alias old to new → migrate consumers → delete old)
- **Pipeline setup** → Style Dictionary config + folder structure + CI notes

## Scoring (Audit Mode)

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

## Rules

- Never rename tokens without an aliasing/deprecation step in the plan.
- Prefer fewer, harder-working semantic tokens over exhaustive coverage — every token is a maintenance promise.
- When asked for "just the names," still flag structural problems you notice; naming can't fix broken tiering.
- Audit and build are two modes of the same skill — use audit to find debt, use architecture to prevent it.
