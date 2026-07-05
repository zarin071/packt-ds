# Component Spec — Select
# 03-component-specs/Select.md
# Version: 1.0.0

---

## Purpose

A dropdown field for choosing one item from a fixed list. Built on Radix Select
for correct listbox keyboard navigation, focus management, and portal-based positioning.

Use Select when the list of options is static and fits in a dropdown (≤ ~20 items).
Use Combobox for searchable or large option sets.
Use RadioButton for ≤ 4 mutually exclusive options that should be visible simultaneously.

---

## Anatomy

```
[ label ]                   ← optional
[ trigger: value  ▾ ]       ← SelectPrimitive.Trigger
[ helper text / error ]     ← optional
─────────────────────────
[ option  ]                 ← floating portal
[ option ✓ ]  ← selected
[ option  ]
```

Named parts:
- `wrapper` — outer flex column (class via `className`)
- `label` — rendered as native `<label>`, linked via `htmlFor`
- `trigger` — `SelectPrimitive.Trigger` (class via `triggerClassName`)
- `content` — portal-rendered `SelectPrimitive.Content`
- `item` — `SelectPrimitive.Item` per option

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Field label rendered above the trigger |
| `placeholder` | `string` | — | No | Shown when no value is selected |
| `options` | `SelectOption[]` | `[]` | No | Array of `{ value, label, disabled? }` |
| `size` | `SelectSize` | `'medium'` | No | Trigger height and padding |
| `error` | `string` | — | No | Error message — also switches border to error tokens |
| `helperText` | `string` | — | No | Helper text below the trigger (replaced by `error` when set) |
| `required` | `boolean` | `false` | No | Appends `*` to label, sets native required |
| `disabled` | `boolean` | `false` | No | Disables the trigger |
| `value` | `string` | — | No | Controlled value |
| `defaultValue` | `string` | — | No | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | — | No | Fired when selection changes |
| `id` | `string` | auto | No | Applied to trigger; referenced by label `htmlFor` |
| `name` | `string` | — | No | Native form field name |
| `className` | `string` | — | No | Class for the outer wrapper |
| `triggerClassName` | `string` | — | No | Class for the trigger button |
| `children` | `ReactNode` | — | No | Custom `SelectPrimitive.Item` nodes (advanced) |

`SelectSize = 'small' | 'medium' | 'large'`

---

## Sizes

| Size | Height | Padding inline | Font |
|------|--------|---------------|------|
| `small` | 32px | `Space.M` | 14px |
| `medium` | 40px | `Space.L` | 14px |
| `large` | 48px | `Space.XL` | 16px |

---

## States

| State | Border | Background | Text |
|-------|--------|-----------|------|
| Default | `border-default` | `bg-surface` | `content-primary` |
| Placeholder | `border-default` | `bg-surface` | `content-tertiary` |
| Focus | `ring-focus-ring` (2px) | `bg-surface` | `content-primary` |
| Error | `border-status-border-error` | `bg-surface` | `content-primary` |
| Disabled | `border-default` | `bg-disabled` | `content-disabled` |

---

## Token consumption map

```
Layout
  --radius-s              trigger and content border-radius
  --space-m / l / xl      padding-inline (size-dependent)
  --spacing-xs / 2xs      item padding and gap

Colors
  --color-bg-surface        trigger and content background
  --color-bg-disabled       disabled trigger background
  --color-border-default    trigger border (default)
  --color-status-border-error  trigger border (error)
  --color-focus-ring        focus ring
  --color-content-primary   selected text
  --color-content-tertiary  placeholder text, chevron
  --color-content-disabled  disabled text
  --color-bg-hover          item hover background
  --color-brand-icon-default  check icon (selected item indicator)
  --color-status-text-error  error message text
```

---

## Accessibility

```tsx
<label htmlFor={selectId}>
  {label}
  {required && <span aria-hidden>*</span>}
</label>
<SelectPrimitive.Trigger
  id={selectId}
  aria-invalid={hasError || undefined}
  aria-describedby={helperId}
/>
<span id={helperId}>{error || helperText}</span>
```

- `id` is auto-generated with `useId()` if not provided — the label always has a valid `htmlFor`.
- `aria-invalid` is set when `error` is truthy.
- `aria-describedby` links the trigger to the helper/error text.
- Radix handles keyboard navigation: `Arrow` keys move between items, `Enter`/`Space` selects, `Escape` closes.

### Keyboard behaviour

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Open the listbox |
| `Arrow Up/Down` | Move between options |
| `Enter` / `Space` | Select highlighted option |
| `Escape` | Close without selecting |
| `Tab` | Move focus out (closes listbox) |

---

## Usage rules

### Do
- Always provide a `label` — never a bare trigger in production UI.
- Use `placeholder` to indicate "no selection made" — don't pre-select an arbitrary option.
- Provide `error` + helper text when field validation fails.

### Don't
- Don't use Select for navigation — use a dedicated nav component.
- Don't use Select for boolean on/off — use ToggleSwitch or Checkbox.
- Don't disable options that are the only valid choice — filter the list instead.

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Sizes` — small, medium, large
3. `States` — default, placeholder, error, disabled
4. `WithHelperText` — helper + error switching
5. `LightAndDark` — both themes
