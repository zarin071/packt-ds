# Component Spec — Alert
# 03-component-specs/Alert.md
# Version: 1.0.0

---

## Purpose

An inline banner that communicates a status message to the user — feedback,
system states, or important information. Not a toast (transient) — Alert is
persistent until explicitly dismissed or the condition resolves.

Use Alert for form-level feedback, page-level warnings, and system state banners.
Use Toast for transient confirmations and background process updates.

---

## Anatomy

```
[ icon ]  [ title ]           [ close × ]
          [ description ]
```

Named parts:
- `root` — outer `<div>` with role
- `icon` — variant icon or custom icon slot (aria-hidden)
- `title` — bold heading line
- `description` — supporting body text
- `closeButton` — optional dismiss button (rendered when `onClose` is provided)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `AlertVariant` | `'info'` | No | Colour + icon + ARIA role |
| `title` | `string` | — | No | Bold heading text |
| `description` | `ReactNode` | — | No | Body text (or use `children`) |
| `icon` | `boolean \| ReactNode` | `true` | No | `true` = default variant icon; `false` = no icon; pass a node to override |
| `onClose` | `() => void` | — | No | Renders a close button; fires on click |
| `children` | `ReactNode` | — | No | Alias for `description` |

`AlertVariant = 'info' | 'success' | 'warning' | 'error'`

All native `HTMLDivElement` attributes are accepted.

---

## Variants

| Variant | ARIA role | Border token | Background token | Icon token | Icon component |
|---------|-----------|-------------|-----------------|-----------|----------------|
| `info` | `status` | `status-border-info` | `status-bg-info` | `status-icon-info` | `InfoIcon` |
| `success` | `status` | `status-border-success` | `status-bg-success` | `status-icon-success` | `SuccessIcon` |
| `warning` | `alert` | `status-border-warning` | `status-bg-warning` | `status-icon-warning` | `WarningIcon` |
| `error` | `alert` | `status-border-error` | `status-bg-error` | `status-icon-error` | `ErrorIcon` |

`role="alert"` interrupts assistive technology immediately.
`role="status"` announces politely without stealing focus.

---

## Token consumption map

```
Layout
  --radius-m        border-radius
  --space-l         padding
  --space-m         gap between icon and content
  --space-2xs       gap between title and description

Colors
  (variant-dependent — see table above)
  --color-content-primary     title text
  --color-content-secondary   description text
  --color-bg-hover            close button hover background
  --color-focus-ring          close button focus ring
  --radius-xs                 close button border-radius
```

---

## Accessibility

```tsx
<div role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}>
  <span aria-hidden="true">{icon}</span>
  <span>{title}</span>
  <span>{description}</span>
  <button aria-label="Dismiss" onClick={onClose} />
</div>
```

- `warning` and `error` use `role="alert"` — do not use these for non-critical messages.
- `info` and `success` use `role="status"` — they will not interrupt screen reader flow.
- Icons are always `aria-hidden` — the title/description provide the accessible name.
- Close button requires `aria-label="Dismiss"`.

---

## Usage rules

### Do
- Use `title` for the primary message and `description` for supporting context.
- Use `error` + `onClose` for form submission failures.
- Use `warning` + `role="alert"` for anything the user must act on.
- Use `info`/`success` for ambient confirmations (saved, sent, etc.).

### Don't
- Don't use `error` for informational messages — it interrupts assistive tech.
- Don't omit `title` — a description without a heading is disorienting.
- Don't use Alert for transient/ephemeral messages — use Toast.

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Variants` — info, success, warning, error stacked
3. `WithClose` — dismissible alert with `onClose`
4. `WithoutIcon` — `icon={false}` variant
5. `CustomIcon` — custom icon node
6. `LightAndDark` — both themes
