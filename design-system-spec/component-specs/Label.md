# Component Spec — Label
# 03-component-specs/Label.md
# Version: 1.0.0

---

## Purpose

Associates visible text with a form control.
Use Label as a companion to Input, Checkbox, Select, RadioButton, or any custom control that needs an explicit accessible name.
Built on Radix Label so clicking the label text activates the associated control even when that control is not a native form element.

---

## Anatomy

```
Label text  *        ← (required indicator, when required)
  ↑         ↑
 text     visible asterisk + sr-only "(required)"
```

Named parts:
- `root` — `<label>` via Radix `Label.Root`
- `labelText` — the `children` content
- `requiredIndicator` — `<span aria-hidden>*</span>` + `<span class="sr-only"> (required)</span>`

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `required` | `boolean` | `false` | No | Renders a visible `*` and announces "(required)" to screen readers. |
| `children` | `ReactNode` | — | Yes | The label text. |
| `htmlFor` | `string` | — | No | ID of the associated control (standard `<label>` attribute). |

All Radix `Label.Root` props are accepted via spread.

---

## Token consumption map

```
Typography
  text-sm                  font size (14px)
  font-medium              font weight (500)
  --content-primary        text colour

Colors — required indicator
  --status-text-error      asterisk colour
  --space-2xs              gap between text and asterisk

States
  peer-disabled:cursor-not-allowed    cursor when associated control is disabled
  peer-disabled:opacity-70            opacity when associated control is disabled
```

---

## Accessibility

```tsx
<label htmlFor="email">
  Email address
  <span aria-hidden="true"> *</span>
  <span className="sr-only"> (required)</span>
</label>
```

- The visible `*` is `aria-hidden` — screen readers announce "(required)" instead
- `htmlFor` links the label to the control by ID; Radix Label also handles programmatic association for custom controls
- When the associated control is `disabled`, the label inherits reduced opacity via the `peer-disabled` selector (the control must have the `peer` class)

### Keyboard behaviour
Label itself is not focusable.
Clicking Label focuses/activates the associated control (native browser and Radix behaviour).

---

## Usage rules

### Do
- Always pair Label with a form control via `htmlFor` matching the control's `id`
- Use `required` consistently — if required fields are marked, mark all of them
- Place Label above the control (not beside it) for most form layouts
- Keep label text concise — "Email address" not "Please enter your email address"

### Don't
- Don't use Label as a generic styled `<span>` — it has form association semantics
- Don't hide labels visually without providing an `aria-label` on the control itself
- Don't use placeholder text as a substitute for Label — placeholders disappear on input

---

## Content / copy guidelines

- Noun form, not instruction form: "Email address" not "Enter your email"
- Sentence case: "First name" not "First Name"
- No trailing colon: "Password" not "Password:"

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Label } from './Label';

figma.connect(Label, 'FIGMA_NODE_ID', {
  props: {
    required: figma.boolean('Required'),
    children: figma.string('Label'),
  },
  example: ({ required, children }) => (
    <Label required={required}>{children}</Label>
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Default` — basic label
3. `Required` — with asterisk
4. `PairedWithInput` — Label + Input together
5. `DisabledControl` — label opacity when control is disabled
6. `LightAndDark` — both themes

---

## Related components

- `Input` — primary consumer
- `Checkbox` — has its own internal label; use Label externally for group labels
- `Select` — paired via `htmlFor`
- `RadioButton` — has its own internal label; use Label for the group legend
