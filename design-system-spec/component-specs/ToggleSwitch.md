# Component Spec — ToggleSwitch
# 03-component-specs/ToggleSwitch.md
# Version: 1.0.0

---

## Purpose

A binary on/off control for settings that take immediate effect without a form submission.
Use ToggleSwitch for feature flags, notification preferences, and visibility toggles.
Use Checkbox when the setting requires form submission to take effect, or when the option is part of a multi-select group.

---

## Anatomy

```
[○────]  Label text       ← off state (thumb left)
[────●]  Label text       ← on state (thumb right)
```

Named parts:
- `root` — `<label>` wrapping switch and label text (`flex items-center gap-s`)
- `switch` — `<SwitchPrimitive.Root>` (Radix) — the pill track
- `thumb` — `<SwitchPrimitive.Thumb>` — the sliding circle
- `labelText` — optional `<span>` with the visible label

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Visible text beside the switch. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Controls track and thumb dimensions. |
| `checked` | `boolean` | — | No | Controlled on/off state. |
| `defaultChecked` | `boolean` | — | No | Uncontrolled initial state. |
| `onCheckedChange` | `(checked: boolean) => void` | — | No | Fires when state changes. |
| `disabled` | `boolean` | `false` | No | Disables the toggle. |
| `id` | `string` | auto | No | Explicit id; auto-generated if omitted. |

All Radix `Switch.Root` props are accepted via spread.

---

## Sizes

| Size | Track (W × H) | Thumb size | Checked translation |
|------|--------------|-----------|-------------------|
| `small` | 28 × 16px | 12×12px (`size-3`) | `translate-x-3` (12px) |
| `medium` | 36 × 20px | 16×16px (`size-4`) | `translate-x-4` (16px) |
| `large` | 44 × 24px | 18×18px (`size-[18px]`) | `translate-x-5` (20px) |

Track padding: `p-0.5` (small/medium), `p-[3px]` (large — hardcoded; token candidate).

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Off | Grey track, white thumb | `neutral-300`, `brand-text-on-brand` |
| On | Brand track, white thumb | `brand-bg-selected` |
| Off + Disabled | Grey track, opacity 0.4 | `bg-disabled` |
| On + Disabled | Grey track (not brand), opacity 0.4 | `bg-disabled` |
| Focus | 2px ring | `focus-ring` |

---

## Token consumption map

```
Layout
  --radius-pill            track border-radius
  --radius-circle          thumb border-radius
  --space-s                gap between switch and label

Colors — track
  neutral-300              off state (hardcoded — semantic token candidate)
  --brand-bg-selected      on state
  --bg-disabled            disabled state (both on and off)

Colors — thumb
  --brand-text-on-brand    thumb colour (white in both themes)

Colors — label
  --content-primary        label text

Focus
  --focus-ring             focus ring
```

---

## Accessibility

```tsx
<label htmlFor={inputId}>
  <SwitchPrimitive.Root
    id={inputId}
    role="switch"
    aria-checked={checked}
    disabled={disabled}
  >
    <SwitchPrimitive.Thumb />
  </SwitchPrimitive.Root>
  <span>{label}</span>
</label>
```

- Radix `Switch.Root` sets `role="switch"` and `aria-checked` automatically
- `<label htmlFor>` associates the visible text — clicking the label toggles the switch
- When disabled, the `<label>` carries `cursor-not-allowed opacity-40` — the switch itself is `disabled`

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Focus the switch |
| `Space` | Toggle on/off |
| `Shift+Tab` | Move focus away |

### Screen reader announcement
> "Label text, switch, on" / "Label text, switch, off"

---

## Usage rules

### Do
- Provide `label` — an unlabelled switch is inaccessible
- Apply the setting immediately on change — no "Save" button needed
- Use `small` in dense settings panels; `large` for touch-primary mobile layouts
- When both sides of the toggle need labels ("On / Off"), render them outside this component

### Don't
- Don't use ToggleSwitch inside a `<form>` that submits — use Checkbox instead
- Don't use it for multi-option choices — use RadioButton or Checkbox
- Don't hide the label visually without providing `aria-label` on the switch root

---

## Content / copy guidelines

- `label`: Describe what turning it ON does — "Email notifications" not "Notifications off"
- Positive framing: "Receive weekly digest" not "Disable weekly digest"
- Avoid "Enable / Disable" as the label text — the switch state already communicates that

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { ToggleSwitch } from './ToggleSwitch';

figma.connect(ToggleSwitch, 'FIGMA_NODE_ID', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    checked: figma.boolean('Checked'),
    disabled: figma.boolean('Disabled'),
    label: figma.string('Label'),
  },
  example: ({ size, checked, disabled, label }) => (
    <ToggleSwitch size={size} checked={checked} disabled={disabled} label={label} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Sizes` — small, medium, large side by side
3. `OnAndOff` — both states side by side
4. `Disabled` — on and off, disabled
5. `WithoutLabel` — switch alone (accessibility warning in notes)
6. `ControlledExample` — state wired to a counter
7. `LightAndDark` — both themes

---

## Related components

- `Checkbox` — use for form submission, multi-select, and indeterminate states
- `RadioButton` — use for mutually exclusive options (not binary on/off)
