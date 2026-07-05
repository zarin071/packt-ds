# Component Spec — RadioButton
# 03-component-specs/RadioButton.md
# Version: 1.0.0

---

## Purpose

A single option in a mutually exclusive group — exactly one radio may be selected within a group at a time.
Use RadioButton when the user must choose one from a small set of options (2–6).
Use a Select or Checkbox group for larger option sets or multi-select scenarios.

**Important:** RadioButton renders a single item. It must be used inside a `RadioGroup.Root` from `@radix-ui/react-radio-group`, which owns the group's value, name, and change handler.

---

## Anatomy

```
( ● )  Label text
  ↑
radio circle (16×16)
         Error message (when error)
```

Named parts:
- `root` — outer `<div>` (`flex-col gap-xs`)
- `labelWrapper` — `<label>` containing the radio and label text
- `control` — `<RadioGroupPrimitive.Item>` — the 16×16 circle (Radix)
- `indicator` — `<RadioGroupPrimitive.Indicator>` — the inner filled dot
- `innerDot` — `<span>` — 8×8 brand-coloured circle rendered when checked
- `labelText` — `<span>` with the visible label
- `errorMessage` — `<span id="…-error">` announced via `aria-describedby`

---

## Props / API

RadioButton accepts all `@radix-ui/react-radio-group` `Item` props plus:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Visible text beside the radio. |
| `error` | `string` | — | No | Error message — red border + `aria-describedby`. |
| `disabled` | `boolean` | `false` | No | Disables this option. |
| `value` | `string` | — | Yes | The option's value string (passed to `RadioGroup.Root`). |
| `id` | `string` | auto | No | Explicit id; auto-generated if omitted. |

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Unchecked | White circle, grey border | `bg-surface`, `border-default` |
| Checked | Brand border + inner dot | `brand-bg-selected` (border + dot) |
| Error | Red border | `status-border-error` |
| Disabled (unchecked) | Grey bg, grey border | `bg-disabled`, `border-disabled` |
| Disabled (checked) | Grey dot | `content-disabled` |
| Focus | 2px ring | `focus-ring` |

---

## Token consumption map

```
Layout
  --radius-circle          border-radius (full circle)
  size-4 (16px)            control size
  size-2 (8px)             inner dot size
  --space-xs               gap between label row and error
  --space-s                gap between control and label text

Colors — control
  --bg-surface             unchecked background
  --border-default         unchecked border
  --brand-bg-selected      checked border
  --status-border-error    error border
  --bg-disabled            disabled background
  --border-disabled        disabled border

Colors — indicator dot
  --brand-bg-selected      default checked dot
  --content-disabled       disabled checked dot

Colors — label
  --content-primary        label text

Colors — error message
  --status-text-error      error text

Focus
  --focus-ring             focus ring
```

---

## Accessibility

```tsx
// Parent (consumer's responsibility)
<RadioGroupPrimitive.Root value={value} onValueChange={setValue} aria-label="Delivery method">
  <RadioButton value="standard" label="Standard" />
  <RadioButton value="express" label="Express" />
</RadioGroupPrimitive.Root>
```

```tsx
// This component renders
<RadioGroupPrimitive.Item
  id={inputId}
  aria-invalid={error ? true : undefined}
  aria-describedby={error ? errorId : undefined}
>
  <RadioGroupPrimitive.Indicator>
    <span aria-hidden="true" className="inner-dot" />
  </RadioGroupPrimitive.Indicator>
</RadioGroupPrimitive.Item>
<label htmlFor={inputId}>{label}</label>
{error && <span id={errorId}>{error}</span>}
```

- Radix `RadioGroup.Root` manages roving tabindex — only the selected (or first) radio is in the tab stop; arrows move within the group
- `aria-invalid` + `aria-describedby` surface the error to screen readers
- The group must have either `aria-label` or `aria-labelledby` on `RadioGroup.Root`

### Keyboard behaviour (within a RadioGroup)
| Key | Action |
|-----|--------|
| `Tab` | Enter the group (focuses the selected/first item) |
| `Arrow ↑ / ↓` | Move between options |
| `Arrow ← / →` | Same as up/down |
| `Space` | Select the focused option |
| `Shift+Tab` | Exit the group |

---

## Usage rules

### Do
- Always wrap RadioButtons in `RadioGroup.Root` from Radix
- Provide `aria-label` on the root group when no visible heading describes the choices
- Offer 2–6 options max — more than 6 should be a `Select`
- Show errors on the group, not each individual radio (error on one radio is confusing)

### Don't
- Don't use RadioButton for binary yes/no choices where ToggleSwitch is clearer
- Don't pre-select an option without a good default — it implies the unchosen options are wrong
- Don't use RadioButton outside of a `RadioGroup.Root` — keyboard navigation breaks

---

## Content / copy guidelines

- Labels: noun or short phrase describing the option — "Standard (3–5 days)" not "Click for standard delivery"
- Sentence case: "Express delivery" not "Express Delivery"
- Error messages on the group: "Please select a delivery method"

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { RadioButton } from './RadioButton';

figma.connect(RadioButton, 'FIGMA_NODE_ID', {
  props: {
    label: figma.string('Label'),
    disabled: figma.boolean('Disabled'),
    error: figma.string('Error'),
  },
  example: ({ label, disabled, error }) => (
    <RadioButton value="option" label={label} disabled={disabled} error={error} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Group` — RadioGroup.Root with 3 options
3. `ErrorState` — option with error message
4. `Disabled` — one disabled option in a group, others enabled
5. `AllDisabled` — entire group disabled
6. `LightAndDark` — both themes

---

## Related components

- `Checkbox` — for multi-select; use when more than one option can be active
- `Select` — for 7+ options or space-constrained layouts
- `ToggleSwitch` — for binary settings that take immediate effect
