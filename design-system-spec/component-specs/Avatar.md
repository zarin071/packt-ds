# Component Spec — Avatar
# 03-component-specs/Avatar.md
# Version: 1.0.0

---

## Purpose

Represents a user or entity with a photo, initials, or a fallback icon.
Use Avatar when displaying people in lists, comments, headers, or attribution lines.
Use a generic illustration instead when the entity is not a person.

---

## Anatomy

```
┌────────────────────────┐
│   [ image | initials   │  ← root (circle)
│     | fallback icon ]  │
│                    ●   │  ← status dot (optional, bottom-right)
└────────────────────────┘
```

Named parts:
- `root` — the `<span>` wrapper (Radix `Avatar.Root`), always a circle
- `image` — `<img>` rendered when `src` loads successfully (Radix `Avatar.Image`)
- `fallback` — initials or UserIcon shown when image is absent or fails (Radix `Avatar.Fallback`)
- `statusDot` — optional coloured dot at bottom-right indicating presence

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `src` | `string` | — | No | Image URL. Omit to show initials or fallback icon. |
| `alt` | `string` | `''` | No | Alt text for the image. Also used as accessible name. |
| `initials` | `string` | — | No | Shown when no image is available (max 2 chars displayed). |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Controls diameter of the avatar. |
| `status` | `'online' \| 'away' \| 'offline'` | — | No | Renders a status indicator dot at the bottom-right. |
| `fallbackDelayMs` | `number` | `600` | No | Milliseconds before the fallback renders, preventing flash on fast-loading images. |

All native `<span>` attributes are accepted via spread.

---

## Sizes

| Size | Diameter | Font size | Status dot size |
|------|----------|-----------|-----------------|
| `small` | 24px (`size-6`) | `text-xs` | 8px |
| `medium` | 40px (`size-10`) | `text-sm` | 10px |
| `large` | 56px (`size-14`) | `text-xl` | 12px |

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Image loaded | Photo fills circle | — |
| Image failed / no src, initials | 2-char text centred | `brand-text-default`, `brand-bg-hover` |
| Image failed / no src, no initials | UserIcon centred | `content-primary` |
| Status: online | Green dot | `status-bg-success` |
| Status: away | Amber dot | `status-bg-warning` |
| Status: offline | Grey dot | `neutral-400` |

---

## Token consumption map

```
Layout
  --radius-circle          border-radius (full circle)
  --border-default         1px border on root

Colors — root
  --brand-bg-hover         background (fallback state)
  --border-default         border

Colors — fallback
  --brand-text-default     initials text
  --content-primary        fallback icon colour

Colors — status dot
  --status-bg-success      online
  --status-bg-warning      away
  --bg-surface             dot border (creates cutout effect)
  neutral-400              offline (hardcoded — no semantic token)

Typography
  --font-family-sans       font-family
```

---

## Accessibility

### Required ARIA
```tsx
<span
  aria-label={alt || initials || 'Avatar'}
>
  <img alt={alt} />               {/* img has its own alt */}
  <span aria-hidden="true">       {/* initials/icon hidden — root carries name */}
    {initials | <UserIcon />}
  </span>
  <span aria-label={`Status: ${status}`} /> {/* status dot announced separately */}
</span>
```

### Keyboard behaviour
Avatar is not interactive by default — no keyboard role.
If made clickable, wrap in a `<button>` with an `aria-label`.

---

## Usage rules

### Do
- Always supply `alt` when `src` is provided
- Use `initials` as a reliable fallback — don't rely on image availability alone
- Limit `initials` to 2 characters (the component enforces this)
- Pair `status` only with real-time presence data

### Don't
- Don't use Avatar for non-person entities (products, teams) without a custom icon
- Don't omit `alt` when `src` is meaningful to the user
- Don't use the `offline` status to mean "error" — it means the user is offline

---

## Content / copy guidelines

- `alt` text: use the person's full name — "Jane Smith", not "user photo"
- `initials`: derive from first + last name initial — "JD" for Jane Doe
- `aria-label` on the root falls back to `alt`, then `initials`, then `'Avatar'`

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Avatar } from './Avatar';

figma.connect(Avatar, 'FIGMA_NODE_ID', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    status: figma.enum('Status', {
      Online: 'online',
      Away: 'away',
      Offline: 'offline',
      None: undefined,
    }),
    src: figma.string('Image'),
    initials: figma.string('Initials'),
  },
  example: ({ size, status, src, initials }) => (
    <Avatar size={size} status={status} src={src} initials={initials} alt={initials} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `WithImage` — medium with a real photo src
3. `WithInitials` — all three sizes, initials only
4. `FallbackIcon` — no src, no initials
5. `Sizes` — small, medium, large side by side
6. `StatusVariants` — online, away, offline dots
7. `LightAndDark` — both themes side by side

---

## Related components

- `Label` — pair with Avatar for user attribution lines
- `ListItem` — Avatar fits naturally in the `icon` slot
