# Component Spec — Input
# 03-component-specs/Input.md
# Version: 1.0.0

---

## Purpose

A bare, styled text input atom. Handles its own visual state (default / error / disabled)
but does not own a label or helper text — compose those at the field/molecule level using
the Label atom and your own wrapper.

Use Input for single-line text entry. For multi-line, use a `<textarea>` with the same token map.

---

## Anatomy

```
[ input field ]
```

Named parts:
- `root` — the native `<input>` element

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Height and padding scale |
| `error` | `boolean` | `false` | No | Applies error border + sets `aria-invalid="true"` |
| `disabled` | `boolean` | `false` | No | Disables the field |
| `placeholder` | `string` | — | No | Placeholder text (styled with `text-content-tertiary`) |
| `aria-invalid` | `boolean \| 'true' \| 'false'` | — | No | Also triggers error styling, for use with external validation |

All native `HTMLInputElement` attributes are accepted via spread (excluding `size`, which is remapped).

---

## Sizes

| Size | Height | Padding inline | Font |
|------|--------|---------------|------|
| `sm` | 32px | `Space.S` | 14px |
| `md` | 40px | `Space.M` | 14px |
| `lg` | 48px | `Space.L` | 16px |

---

## States

| State | Border | Background | Text |
|-------|--------|-----------|------|
| Default | `border-default` | `bg-surface` | `content-primary` |
| Focus | `ring-focus-ring` (2px) | `bg-surface` | `content-primary` |
| Error | `border-status-border-error`, `ring-status-border-error` on focus | `bg-surface` | `content-primary` |
| Disabled | `border-default` | `bg-disabled` | `content-disabled` |
| Placeholder | — | — | `content-tertiary` |

---

## Token consumption map

```
Layout
  --radius-m              border-radius
  --space-s / m / l       padding-inline (size-dependent)

Colors
  --color-bg-surface      background (default, focus, error)
  --color-bg-disabled     background (disabled)
  --color-border-default  border (default)
  --color-status-border-error  border (error)
  --color-focus-ring      focus ring
  --color-content-primary       text
  --color-content-disabled      text (disabled)
  --color-content-tertiary      placeholder
```

---

## Accessibility

```tsx
<input
  aria-invalid={error || undefined}
  aria-describedby={helperId}  // set by the parent field molecule
  disabled={disabled}
/>
```

- Always pair with a visible `<Label>` linked via `htmlFor` / `id`.
- Link helper text and error messages via `aria-describedby`.
- Do not rely solely on colour to communicate error state — pair with an error message.

---

## Usage rules

### Do
- Always provide a Label — never an unlabelled input in production UI.
- Use `aria-describedby` to associate error messages and helper text.
- Use `error` prop (not custom className hacks) to apply error state.

### Don't
- Don't use Input for multi-line content — use `<textarea>`.
- Don't suppress `aria-invalid` when `error` is true.
- Don't size inputs manually — use the `size` prop.

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Sizes` — sm / md / lg stacked
3. `States` — default, error, disabled (with Label)
4. `LightAndDark` — both themes side by side
