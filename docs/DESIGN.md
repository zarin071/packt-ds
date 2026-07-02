# Packt Design System — Designer Contributor Guide

This is for designers working in the Figma file that feeds this repo. It covers how to structure and name things in Figma so they survive the trip through Token Studio and Style Dictionary without breaking. For the code-side rules token names must satisfy, see `TOKEN-PIPELINE.md`. For component visual/interaction requirements, see `COMPONENT-RULES.md`.

---

## 1. Figma Variables — structure before you name anything

Every value a component uses must trace back to a **Figma Variable**, not a raw hex or number pinned to a layer.

```
Primitive variable   →   Semantic variable        →   Component in Figma
Orange/500                bg-brand-selected            Button fill
#f97141                   #f97141                      (never a raw hex on the layer)
```

- **Primitives** live in a `Primitives` collection: raw color ramps (`Orange/500`), spacing units, radii, font sizes.
- **Semantics** live in a `Semantic` collection and reference primitives only — never a raw value.
- **Never bind a layer directly to a primitive.** If a Button fill points at `Orange/500` instead of `bg-brand-selected`, changing the brand color later means hunting down every component instead of editing one semantic variable.

---

## 2. Naming — this becomes the CSS variable name verbatim

Token Studio exports your variable names into `design-tokens.json`, and Style Dictionary turns the path into a CSS variable. A naming mistake in Figma becomes a naming bug in every app that consumes this package.

**Rules:**
- kebab-case only — no spaces, no camelCase
- Semantic tokens: `{category}-{role}-{state}` — e.g. `background-brand-hover`, `content-error-default`
- Palette tokens: `{color}-{step}` — e.g. `orange-500`, `neutral-700`
- Don't repeat a path segment — grouping a variable named `hover` inside a group also named `border` produces `border-border-hover` in code
- Don't name a token after a component — `button-background` belongs in component code, not in the token set. If a value is specific to one component, it isn't a design token yet.
- Light and dark variables for the same concept must have **identical names** except for `light`/`dark` in the path — otherwise they won't pair up in code

Before exporting, scan the variable panel for any of the above — it's much cheaper to fix in Figma than after export.

---

## 3. Setting variable types correctly

Figma Variables have a type (`color`, `number`, `string`, `boolean`), but the JSON also needs a Design Tokens `$type` matching what the value represents, since that's what tells Style Dictionary how to format it:

| This kind of value | Needs `$type` | So Style Dictionary can... |
|---|---|---|
| Colors | `color` | output hex |
| Spacing, radius, border width, font size, line height | `dimension` | append `px` |
| Font weight (Bold, Semibold, etc.) | `fontWeight` | map the name to a numeric weight |

If a variable comes through as plain `number` when it should be `dimension`, it'll be missing units in the generated CSS. Fix the type at the source rather than asking engineering to patch it downstream.

---

## 4. Before you push to GitHub

Token Studio pushes straight to the `design-tokens` branch, which triggers an automated pipeline all the way to the published Storybook (see `EXPORT_GUIDE.md` for what happens after you push). There's no review step in between, so treat the push itself as the review moment:

- [ ] New/changed variables follow the naming rules in §2
- [ ] Types are set correctly per §3
- [ ] Light and dark counterparts both exist and are named identically
- [ ] You're not introducing a component-specific token (§1)
- [ ] You've sanity-checked contrast for any new color pairing (text on background) — nothing downstream will catch this for you

---

## 5. Proposing a new component

New components start as a Figma exploration, not a pull request. Before it becomes code:

1. Build the component using existing semantic tokens only — if you find yourself needing a new primitive or semantic value, add it as a proper variable first (§1–§3), not a one-off hardcoded value on the component.
2. Cover the states engineering will need to build: default, hover, focus, disabled, error (if applicable), loading (if applicable), and both themes.
3. Flag it to engineering with the Figma frame link — they'll cross-check it against `COMPONENT-RULES.md` (anatomy, accessibility, naming) before writing code.
