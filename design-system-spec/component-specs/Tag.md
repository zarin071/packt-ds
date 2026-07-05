# Component Spec — Tag
# 03-component-specs/Tag.md
# Version: 1.0.0

---

## Purpose

An interactive label used to represent categories, filters, or applied values
that the user can remove. Tags share the same semantic variant set as Badge,
plus an optional remove (×) button.

Use Tag when the user needs to dismiss or remove a value (selected filters, applied tags).
Use Badge when the label is read-only and non-interactive.

---

## Anatomy

```
[ icon? ]  [ label ]  [ × ]
```

Named parts:
- `root` — `<span>` wrapper
- `icon` — optional leading icon (aria-hidden)
- `label` — text content
- `removeButton` — optional `<button>` with `aria-label="Remove"` (rendered when `onRemove` is provided)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `TagVariant` | `'neutral'` | No | Colour intent |
| `icon` | `ReactNode` | — | No | Leading icon — always `aria-hidden` |
| `onRemove` | `() => void` | — | No | Renders the × button and fires on click |
| `children` | `ReactNode` | — | Yes | Tag label text |

`TagVariant = 'brand' | 'hub' | 'neutral' | 'error' | 'warning' | 'success' | 'info'`

All native `HTMLSpanElement` attributes are accepted.

---

## Variants

Same token map as Badge — see Badge spec for the full variant table.
Tags use `radius-pill` (full pill shape) vs Badge's `radius-xs`.

---

## Remove button

When `onRemove` is provided:
- A `<button type="button">` is appended after the label.
- It renders `<CloseIcon />` at 12px.
- `aria-label="Remove"` is always set.
- It has its own focus ring (`ring-focus-ring`, `ring-offset-1`).
- Opacity is 70% at rest, 100% on hover — the icon is visible but recessive.

For screen readers: the button reads as "Remove" — not "Remove [tag name]".
If the label needs to be included in the accessible name, wrap in a group or set
`aria-label={Remove ${children}}` at the caller.

---

## Token consumption map

```
Layout
  --radius-pill         border-radius (full pill)
  --radius-circle       remove button border-radius
  --space-s             padding-inline
  --space-2xs           padding-block; gap between parts

Typography
  font-size: 12px / line-height: 16px / font-weight: 500 / white-space: nowrap

Colors (variant-dependent — same as Badge)
  background, border, text — from brand or status token groups

Remove button
  --color-focus-ring    focus ring on the × button
```

---

## Accessibility

```tsx
<span role="none">
  {icon && <span aria-hidden="true">{icon}</span>}
  <span>{children}</span>
  {onRemove && (
    <button
      type="button"
      aria-label="Remove"
      onClick={onRemove}
    >
      <CloseIcon />
    </button>
  )}
</span>
```

- Tags are not interactive themselves (the `<span>` has no role).
- The remove button is the only keyboard-reachable part of the Tag.
- Group tags in a list with `role="list"` at the container level so screen readers announce the count.
- Consider `aria-label={`Remove ${children}`}` if the remove button is not adjacent to visible context.

---

## Usage rules

### Do
- Use `onRemove` for filter chips, applied selections, and dismissible labels.
- Keep text to 1–4 words — Tags should not wrap.
- Group multiple tags in a flex container with `role="list"` and `gap-xs`.

### Don't
- Don't use Tag as a button itself — it is not interactive as a whole; only the × is.
- Don't omit `aria-label` from the remove button.
- Don't use `error`/`warning` Tags for decoration — use semantic variants intentionally.

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Variants` — all 7 variants
3. `Removable` — with `onRemove` handler
4. `WithIcon` — leading icon
5. `TagGroup` — multiple tags in a wrapping flex container
6. `LightAndDark` — both themes
