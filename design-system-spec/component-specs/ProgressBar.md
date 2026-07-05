# Component Spec — ProgressBar
# 03-component-specs/ProgressBar.md
# Version: 1.0.0

---

## Purpose

Displays a determinate progress value as a filled horizontal bar.
Use ProgressBar for course completion, upload progress, skill levels, and multi-step form advancement.
Use a Spinner for indeterminate loading states (duration unknown).

---

## Anatomy

```
┌────────────────────────────────────┐  37%
│██████████████░░░░░░░░░░░░░░░░░░░░░░│
└────────────────────────────────────┘
         ↑ track          ↑ indicator
```

Named parts:
- `wrapper` — outer `<div>` that holds track + optional label (`flex items-center gap-s`)
- `track` — `<ProgressPrimitive.Root>` — the full-width grey pill (Radix Progress)
- `indicator` — `<ProgressPrimitive.Indicator>` — the brand-coloured fill; width driven by `translateX` transform
- `label` — optional percentage `<span aria-hidden>` to the right of the track

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number` | — | Yes | Progress value 0–100. Automatically clamped. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Track height. |
| `showLabel` | `boolean` | `false` | No | Renders the clamped `value%` to the right of the track. |
| `label` | `string` | `'Progress'` | No | Accessible label for the progress bar (read by screen readers). |

All Radix `Progress.Root` props (except `value` and `max`) are accepted via spread.

---

## Sizes

| Size | Track height |
|------|-------------|
| `small` | 4px (`h-1`) |
| `medium` | 8px (`h-2`) |
| `large` | 12px (`h-3`) |

---

## Token consumption map

```
Layout
  --radius-pill            track and indicator border-radius (full pill)
  --space-s                gap between track and label

Colors — track
  neutral-200              track background (hardcoded — no semantic token yet)

Colors — indicator
  --brand-bg-selected      filled portion

Colors — label
  --content-secondary      percentage label text

Typography
  --font-family-sans       font-family
  text-xs / font-medium / leading-4    label

Animation
  transition-transform duration-300 ease-out    indicator width transition
```

---

## Accessibility

```tsx
<ProgressPrimitive.Root
  value={clamped}
  max={100}
  aria-label={label}
>
```

- Radix `Progress.Root` sets `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` automatically
- `aria-label` should describe what is progressing — "Course completion", "Upload progress"
- The visual percentage label (`showLabel`) is `aria-hidden` — the ARIA role already exposes the value numerically
- `value` is clamped to `[0, 100]` — never pass a raw unclamped value

### Screen reader announcement
> "Course completion, progress bar, 37%"

---

## Usage rules

### Do
- Always provide a meaningful `label` — "Progress" is a last resort
- Use `showLabel` when the exact percentage is important context for the user
- Use `small` in dense tables or card footers
- Use `large` for featured progress indicators (course hero, onboarding checklist)

### Don't
- Don't use ProgressBar for indeterminate loading — use a Spinner
- Don't drive `value` past 100 or below 0 — the component clamps but the semantic is wrong
- Don't place multiple bars without labels — they become indistinguishable to screen reader users

---

## Content / copy guidelines

- `label`: Describe the activity — "Upload progress", "Profile completeness", "Chapter 3 of 8"
- Shown label: just the percentage — "37%" — no additional text needed alongside the visual bar

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { ProgressBar } from './ProgressBar';

figma.connect(ProgressBar, 'FIGMA_NODE_ID', {
  props: {
    value: figma.string('Value'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    showLabel: figma.boolean('ShowLabel'),
  },
  example: ({ value, size, showLabel }) => (
    <ProgressBar value={Number(value)} size={size} showLabel={showLabel} label="Progress" />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `Sizes` — small, medium, large at 50%
3. `WithLabel` — showLabel={true}
4. `ZeroValue` — value={0}
5. `FullValue` — value={100}
6. `AnimatedTransition` — value steps from 0 → 100 with controls
7. `LightAndDark` — both themes

---

## Related components

- `Badge` — can display a status alongside a ProgressBar
- `EmptyState` — used when there is no progress data yet
