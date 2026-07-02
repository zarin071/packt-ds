# Component Spec — Button
# 03-component-specs/Button.md
# Version: 1.0.0

---

## Purpose

Triggers a single, immediate action.
The most common interactive element in the system.

Use Button when the user performs an action (submit, save, delete, open dialog).
Use Link when the user navigates to a new location.
Use IconButton when no label is needed and space is constrained.

---

## Anatomy

```
[ leading-icon? ]  [ label ]  [ trailing-icon? ]
[ spinner? ]
```

Named parts:
- `root` — the `<button>` element
- `label` — the text content
- `leadingIcon` — optional slot before label
- `trailingIcon` — optional slot after label
- `spinner` — replaces label during loading state

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | No | Visual weight and intent |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Height and padding scale |
| `disabled` | `boolean` | `false` | No | Disables interaction |
| `loading` | `boolean` | `false` | No | Shows spinner, locks width, sets aria-busy |
| `leadingIcon` | `ReactNode` | `undefined` | No | Icon before label |
| `trailingIcon` | `ReactNode` | `undefined` | No | Icon after label |
| `children` | `ReactNode` | — | Yes | Button label text |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | Native button type |
| `onClick` | `(e: React.MouseEvent) => void` | — | No | Click handler |
| `hub` | `'brand' \| 'learn' \| 'news'` | `'brand'` | No | **Preview only** — Storybook hub simulation |

All native `<button>` attributes are also accepted via spread.

---

## Variants

### primary
- Background: `var(--bg-brand-selected)` → `#f97141`
- Text: `var(--content-selected)` → `#ffffff`
- Use: Single primary CTA per view. Submit forms, confirm dialogs, primary purchase action.
- Rule: **Maximum one primary button per logical section** (per form, per modal, per card).

### secondary
- Background: `transparent`
- Border: `1px solid var(--border-primary)` → `#000000` (light) / `#ffffff` (dark)
- Text: `var(--content-primary)`
- Use: Supporting action next to a primary. Cancel, Back, secondary form action.
- Rule: Pair with primary for standard confirm/cancel pattern.

### ghost
- Background: `transparent`
- No border
- Text: `var(--content-primary)`
- Use: Low-emphasis, repeated, or inline actions. Toolbar actions, edit buttons inside cards.
- Rule: Never use ghost as the only action in a view — it under-communicates importance.

### danger
- Background: `var(--bg-error-selected)` → `#df1c41`
- Text: `var(--content-error-selected)` → `#ffffff`
- Use: Irreversible or destructive actions ONLY. Delete, Revoke, Remove permanently.
- Rule: Never use danger for non-destructive actions. Never use it for Cancel.

---

## Sizes

| Size | Height | Padding inline | Padding block | Font token | Icon size |
|------|--------|---------------|--------------|-----------|-----------|
| `sm` | 32px | `Space.M` (12px) | `Space.S` (8px) | `Text.Medium.S` (12px/500) | 14px |
| `md` | 40px | `Space.L` (16px) | `Space.M` (12px) | `Text.Medium.L` (16px/500) | 16px |
| `lg` | 48px | `Space.XL` (24px) | `Space.L` (16px) | `Text.Medium.XL` (20px/500) | 20px |

---

## States

### State matrix

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default | Base variant styles | See variants above |
| Hover | Darker background | `var(--bg-brand-hover)` → `#fee3d9` (primary light); darken 8% for others |
| Focus | 2px outline | `outline: 2px solid var(--border-brand-default)` + `outlineOffset: 2px` |
| Active/Pressed | Scale 0.98 | `transform: scale(0.98)` |
| Disabled | Opacity 0.4, cursor not-allowed | `opacity: 0.4; cursor: not-allowed;` |
| Loading | Spinner visible, label hidden, width locked | `aria-busy: true` |

### Hub state variants

When inside a `[data-hub="learn"]` context:
- primary background: `var(--hub-learn-bg-selected)` → `#1a9e92`
- primary hover: `var(--hub-learn-bg-hover)` → `#148076`
- border focus: `var(--hub-learn-border-default)` → `#1a9e92`

When inside a `[data-hub="news"]` context:
- primary background: `var(--hub-news-bg-selected)` → `#6554e6`
- primary hover: `var(--hub-news-bg-hover)` → `#5244c4`
- border focus: `var(--hub-news-border-default)` → `#6554e6`

---

## Token consumption map

The complete list of CSS custom properties this component references:

```
Layout
  --radius-l               border-radius
  --space-xs through --space-xl   padding (size-dependent)

Colors — primary variant
  --bg-brand-selected      background
  --bg-brand-hover         background on hover
  --content-selected       text color
  --border-brand-default   focus ring

Colors — secondary variant
  --border-primary         border color
  --content-primary        text color
  --bg-secondary           background on hover

Colors — danger variant
  --bg-error-selected      background
  --content-error-selected text color
  --border-error           focus ring

Typography
  --font-family-sans       font-family (Outfit)
  [size-specific font tokens]

Hub overrides (applied via CSS selector on parent)
  --hub-learn-bg-selected  primary bg when inside [data-hub="learn"]
  --hub-news-bg-selected   primary bg when inside [data-hub="news"]
```

---

## Accessibility

### Required ARIA
```tsx
<button
  type={type}
  disabled={disabled}
  aria-disabled={disabled}
  aria-busy={loading}
  aria-label={iconOnly ? label : undefined}
>
```

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Enter` | Activates the button (native) |
| `Space` | Activates the button (native) |
| `Tab` | Moves focus to next interactive element |
| `Shift+Tab` | Moves focus to previous interactive element |

### Focus ring
- Style: `outline: 2px solid var(--border-brand-default); outline-offset: 2px`
- Must be visible in both light and dark mode
- Must have minimum 3:1 contrast ratio against adjacent colours (WCAG 2.4.11)

### Icon-only buttons
If no text label (`children` is an icon only), the button MUST have `aria-label` describing the action.

```tsx
// Correct
<Button aria-label="Delete project">
  <TrashIcon />
</Button>

// Wrong — no accessible name
<Button>
  <TrashIcon />
</Button>
```

---

## Loading state specification

When `loading={true}`:
1. Width must be locked to its pre-loading width (no layout shift)
2. Label text is visually hidden but preserved for width calculation
3. Spinner appears centred where the label was
4. `aria-busy="true"` is set on the button element
5. Button is not `disabled` (user can still focus it) but click does nothing
6. `aria-label` updates to include "loading" context if the component has one

```tsx
// Loading state implementation hint
<button aria-busy={loading} style={{ width: loading ? 'var(--locked-width)' : undefined }}>
  <span aria-hidden={loading}>{children}</span>
  {loading && <Spinner aria-label="Loading" role="status" />}
</button>
```

---

## Responsive behaviour

Buttons do not change size at breakpoints by default.
They respond to their container width if set to `width: 100%`.

Full-width pattern (mobile forms, full-width CTA sections):
```tsx
<Button fullWidth>Continue</Button>
// renders with: display: block; width: 100%;
```

---

## Usage rules

### Do
- One primary button per logical view section (form, modal, card)
- Pair `primary` + `secondary` for confirm/cancel patterns
- Use `danger` only for irreversible destructive actions
- Use verb-first labels: "Save changes", "Delete account", "Add member"
- Keep labels 1–3 words. "Continue" is better than "Click here to continue"
- Provide a tooltip or helper text when a button is disabled

### Don't
- Don't use `primary` for navigation — use a Link component
- Don't use `danger` for Cancel or non-destructive actions
- Don't put two `danger` buttons side by side
- Don't let button label text wrap to two lines
- Don't disable without a discoverable reason
- Don't use `ghost` as the sole action in a view

---

## Content / copy guidelines

Button labels follow the system-wide content principles:
- Verb first: "Save", "Delete account", "Send invite", "Create project"
- Sentence case: "Save changes" not "Save Changes"
- No punctuation: "Submit" not "Submit."
- Specific over generic: "Delete project" not just "Delete" when context is ambiguous

---

## Do / Don't examples

**Do:** One primary CTA per card
```
[Secondary action]     [Primary action ★]
```

**Don't:** Two primary buttons competing
```
[Primary action ★]     [Primary action ★]
```

**Do:** Danger for destructive only
```
Are you sure? This cannot be undone.
[Cancel]    [Delete project]  ← danger
```

**Don't:** Danger for cancel
```
[Cancel]  ← danger    [Save]  ← primary
```

---

## Figma Code Connect

Token: `Packt DS / Components / Button`

```ts
import { figma } from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'FIGMA_NODE_ID', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Danger: 'danger',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    disabled: figma.boolean('Disabled'),
    loading: figma.boolean('Loading'),
    children: figma.string('Label'),
  },
  example: ({ variant, size, disabled, loading, children }) => (
    <Button variant={variant} size={size} disabled={disabled} loading={loading}>
      {children}
    </Button>
  ),
});
```

---

## Storybook stories to generate

When generating from this spec, create:
1. `Playground` — all controls enabled
2. `AllVariants` — primary, secondary, ghost, danger side by side
3. `AllSizes` — sm, md, lg side by side
4. `States` — default, hover (note only), disabled, loading
5. `HubContexts` — brand, learn, news colour contexts
6. `LightAndDark` — both themes side by side
7. `WithLeadingIcon` — primary md with a leading icon
8. `WithTrailingIcon` — primary md with a trailing icon
9. `IconOnly` — icon-only button with aria-label
10. `FullWidth` — full-width button inside a constrained container

---

## Related components

- `IconButton` — icon-only variant with enforced aria-label
- `ButtonGroup` — groups of related buttons with shared border-radius treatment
- `Link` — for navigation actions (renders as `<a>`)
- `LoadingButton` — alias for Button with loading=true (for convenience imports)
