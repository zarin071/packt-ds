# Component Spec — Checkbox
# 03-component-specs/Checkbox.md
# Version: 1.0.0

---

## Purpose

A binary or indeterminate toggle for selecting one or more options in a form.
Use Checkbox for multi-select forms, settings lists, and "select all" patterns.
Use RadioButton when only one option may be selected at a time.
Use ToggleSwitch for immediate-effect settings that apply without a form submission.

---

## Anatomy

```
[ ✓ ]  Label text
  ↑
checkbox (16×16)
         Error message (when error)
```

Named parts:
- `root` — outer `<div>` wrapper (`flex-col gap-xs`)
- `labelWrapper` — `<label>` containing checkbox and text (`flex items-center gap-s`)
- `control` — `<CheckboxPrimitive.Root>` (Radix), the 16×16 square
- `indicator` — `<CheckboxPrimitive.Indicator>` — renders CheckIcon or MinusIcon
- `labelText` — `<span>` with the visible label
- `errorMessage` — `<span id="…-error">` announced via `aria-describedby`

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Visible text beside the checkbox. |
| `checked` | `boolean \| 'indeterminate'` | — | No | Controlled checked state. |
| `indeterminate` | `boolean` | `false` | No | Shorthand for `checked="indeterminate"`. Overrides `checked` visually. |
| `error` | `string` | — | No | Error message — red border + announced via `aria-describedby`. |
| `disabled` | `boolean` | `false` | No | Disables interaction. |
| `id` | `string` | auto | No | Explicit id; auto-generated if omitted. |

All Radix `Checkbox.Root` props (excluding `asChild`) are accepted via spread.

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Unchecked | White box, grey border | `bg-surface`, `border-default` |
| Checked | Orange fill, white check | `brand-bg-selected`, `brand-text-on-brand` |
| Indeterminate | Orange fill, white minus | `brand-bg-selected`, `brand-text-on-brand` |
| Error | Red border (unchecked state) | `status-border-error` |
| Disabled (any state) | Grey fill, grey border | `bg-disabled`, `border-disabled`, `content-disabled` |
| Focus | 2px ring | `focus-ring` |
| Disabled + checked | Grey fill, grey check icon | `bg-disabled`, `border-disabled`, `content-disabled` |

---

## Token consumption map

```
Layout
  --radius-xs              border-radius (control)
  --space-xs               gap between label row and error
  --space-s                gap between control and label text
  size-4 (16px)            control size

Colors — control
  --bg-surface             unchecked background
  --border-default         unchecked border
  --brand-bg-selected      checked/indeterminate background
  --brand-text-on-brand    check/minus icon colour
  --status-border-error    error state border
  --bg-disabled            disabled background
  --border-disabled        disabled border
  --content-disabled       disabled icon colour

Colors — label
  --content-primary        label text

Colors — error message
  --status-text-error      error message text

Focus
  --focus-ring             focus ring colour
```

---

## Accessibility

### Required ARIA
```tsx
<CheckboxPrimitive.Root
  id={inputId}
  aria-invalid={error ? true : undefined}
  aria-describedby={error ? errorId : undefined}
  disabled={disabled}
>
```

- `<label htmlFor={inputId}>` associates the label — clicking it toggles the checkbox
- `aria-invalid` signals the error state to assistive tech
- `aria-describedby` points to the error message element for screen reader announcement
- Indeterminate state is communicated via Radix's `data-state="indeterminate"` which maps to `aria-checked="mixed"`

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Move focus to the checkbox |
| `Space` | Toggle checked state |
| `Shift+Tab` | Move focus away |

---

## Usage rules

### Do
- Always provide a `label` — an unlabelled checkbox is inaccessible
- Use `indeterminate` for "select all" controls when the child checkboxes are partially selected
- Show an `error` message, not just a red border, so users know what's wrong
- Group related checkboxes in a `<fieldset>` with a `<legend>`

### Don't
- Don't use Checkbox for a single binary toggle that takes immediate effect — use ToggleSwitch
- Don't nest Checkbox inside a RadioButton group
- Don't use `indeterminate` as a permanent state — it should resolve to checked or unchecked after user action

---

## Content / copy guidelines

- Labels: positive framing — "Send me updates" not "Don't send me updates"
- Sentence case: "Remember me" not "Remember Me"
- Error messages: specific — "You must agree to the terms" not "Required"

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Checkbox } from './Checkbox';

figma.connect(Checkbox, 'FIGMA_NODE_ID', {
  props: {
    label: figma.string('Label'),
    checked: figma.enum('State', {
      Checked: true,
      Unchecked: false,
      Indeterminate: 'indeterminate',
    }),
    disabled: figma.boolean('Disabled'),
    error: figma.string('Error'),
  },
  example: ({ label, checked, disabled, error }) => (
    <Checkbox label={label} checked={checked} disabled={disabled} error={error} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `States` — unchecked, checked, indeterminate
3. `ErrorState` — with error message
4. `Disabled` — all states disabled
5. `WithoutLabel` — accessibility note shown
6. `SelectAll` — indeterminate "Select all" + child checkboxes
7. `LightAndDark` — both themes

---

## Related components

- `RadioButton` — use when only one option can be selected
- `ToggleSwitch` — use for immediate-effect binary settings
- `Label` — when building custom checkbox layouts outside this component
