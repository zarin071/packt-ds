# Component Spec — Badge
# 03-component-specs/Badge.md
# Version: 1.0.0

---

## Purpose

A small non-interactive label used to communicate status, category, or count.
Badges are always read-only — they are never clickable. For interactive labels use Tag.

---

## Anatomy

```
[ icon? ]  [ label ]
```

Named parts:
- `root` — `<span>` wrapper
- `icon` — optional leading icon slot (aria-hidden)
- `label` — text content

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `BadgeVariant` | `'neutral'` | No | Colour intent |
| `icon` | `ReactNode` | — | No | Leading icon — always `aria-hidden` |
| `children` | `ReactNode` | — | Yes | Badge label text |

`BadgeVariant = 'brand' | 'hub' | 'neutral' | 'error' | 'warning' | 'success' | 'info'`

All native `HTMLSpanElement` attributes are accepted.

---

## Variants

| Variant | Background token | Border token | Text token | Use |
|---------|-----------------|--------------|-----------|-----|
| `brand` | `brand-tag-bg` | `brand-border-default` | `brand-tag-text` | Packt brand feature, new content |
| `hub` | `hub-tag-bg` | `hub-border-default` | `hub-tag-text` | Hub-specific categorisation |
| `neutral` | `bg-page` | `border-default` | `content-secondary` | Generic, no semantic meaning |
| `error` | `status-bg-error` | `status-border-error` | `status-text-error` | Errors, failures |
| `warning` | `status-bg-warning` | `status-border-warning` | `status-text-warning` | Warnings, caution |
| `success` | `status-bg-success` | `status-border-success` | `status-text-success` | Success, completion |
| `info` | `status-bg-info` | `status-border-info` | `status-text-info` | Informational |

---

## Token consumption map

```
Layout
  --radius-xs             border-radius (pill-like but not full pill)
  --space-xs / 2xs        padding

Typography
  font-size: 12px / font-weight: 500

Colors (variant-dependent, see table above)
  background, border, text — all from status or brand token groups
```

---

## Accessibility

- Badge renders as `<span>` — no interactive role.
- Icons inside are always `aria-hidden="true"` — the badge text is the accessible label.
- If badge text alone is not self-describing in context, the parent element should provide `aria-label`.
- Do not use Badge to convey critical information without a text equivalent.

---

## Usage rules

### Do
- Use `variant` semantically: `error` for failures, `success` for completion, `brand` for new/featured.
- Keep badge text extremely short: 1–3 words maximum ("New", "Beta", "23", "In review").

### Don't
- Don't make badges clickable — use Tag with `onRemove` for interactive labels.
- Don't use `neutral` variant for anything with semantic meaning.
- Don't use icons as the sole content — always include text.

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Variants` — all 7 variants side by side
3. `WithIcon` — badge with leading icon
4. `LightAndDark` — both themes
