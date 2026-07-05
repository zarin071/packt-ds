# Component Spec — Card
# 03-component-specs/Card.md
# Version: 1.0.0

---

## Purpose

A bordered surface that groups related content — image, title, description, and actions — into a scannable unit.
Use Card for content grids, product listings, feature highlights, and course tiles.
Use a plain `<section>` or `<article>` when the content doesn't need a visual container.

---

## Anatomy

```
┌──────────────────────────────────┐
│  [ image (aspect-video) ]        │  ← imageSlot (optional)
├──────────────────────────────────┤
│  Title                           │  ← title (optional)
│  Description text here           │  ← description (optional)
│  [ children slot ]               │  ← default slot
├──────────────────────────────────┤
│  [ actions slot ]                │  ← actions (optional, bottom row)
└──────────────────────────────────┘
```

Named parts:
- `root` — `<div>` with border, background, and `rounded-m`
- `imageSlot` — 16:9 aspect-ratio container for the card image
- `body` — flex column holding title, description, and children (`p-l`, `gap-xs`)
- `actionsRow` — bottom row with top border, for buttons or links (`px-l py-m`)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `imageSrc` | `string` | — | No | URL for the card's header image. |
| `imageAlt` | `string` | `''` | No | Alt text for the image. |
| `title` | `string` | — | No | Card heading rendered as `<h3>`. |
| `description` | `ReactNode` | — | No | Supporting body text. |
| `actions` | `ReactNode` | — | No | Bottom action row (e.g. buttons). |
| `interactive` | `boolean` | `false` | No | Adds hover/focus affordances for clickable cards. |
| `children` | `ReactNode` | — | No | Additional content rendered inside the body. |

All native `<div>` attributes are accepted via spread.

---

## Variants

### Default (non-interactive)
- Background: `var(--bg-surface)`
- Border: `1px solid var(--border-default)`
- No hover or focus state
- Use for static content cards

### Interactive
- Same base appearance as default
- Hover: `var(--bg-hover)`
- Focus: 2px ring `var(--focus-ring)` with 2px offset
- Cursor: pointer
- **Note:** `interactive` only adds visual affordances. You must supply `tabIndex`, `role`, and a keyboard handler (or wrap the card in a `<button>` or `<a>`) to make it truly accessible.

---

## Token consumption map

```
Layout
  --radius-m               border-radius (card root)
  --space-l                body padding, actions horizontal padding
  --space-xs               body gap between elements
  --space-m                actions vertical padding
  --space-s                actions gap between items

Colors
  --bg-surface             card background
  --bg-hover               interactive hover background
  --border-default         border, actions top divider
  --content-primary        title text
  --content-secondary      description text
  --focus-ring             focus outline (interactive)

Typography
  --font-family-sans       font-family
  text-base / font-semibold / leading-6    title
  text-sm / leading-5                      description
```

---

## Accessibility

### Image
```tsx
<img src={imageSrc} alt={imageAlt} />
```
- `imageAlt` must describe the image if the image conveys meaning
- Use `imageAlt=""` for decorative images

### Interactive card
When `interactive={true}` and the card is clickable as a unit:
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="View course: Introduction to React"
>
```
Or prefer wrapping the card in an `<a>` or `<button>` tag.

### Keyboard behaviour (interactive)
| Key | Action |
|-----|--------|
| `Tab` | Focus the card |
| `Enter` | Activate (if consumer adds handler) |
| `Space` | Activate (if consumer adds handler) |

---

## Usage rules

### Do
- Supply `imageAlt` when the image is meaningful
- Use `title` consistently — a card without a title is harder to scan
- Use the `actions` slot for buttons — don't nest them in `children` unless the layout requires it
- Set `interactive` only when the whole card is a single clickable target

### Don't
- Don't nest interactive elements inside an interactive card (e.g. a "Like" button inside a card with `interactive`) — this creates nested keyboard traps
- Don't use `interactive` as a style shortcut when only part of the card is clickable
- Don't put two cards side by side with different heights and no grid alignment

---

## Content / copy guidelines

- `title`: Sentence case, 1–5 words. Match the destination page's `<h1>`.
- `description`: 1–2 sentences max. Focus on value, not features.
- `actions`: verb-first labels — "Start course", "View details", "Add to list"

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Card } from './Card';

figma.connect(Card, 'FIGMA_NODE_ID', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    interactive: figma.boolean('Interactive'),
  },
  example: ({ title, description, interactive }) => (
    <Card title={title} description={description} interactive={interactive} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `WithImage` — card with image, title, description, and actions
3. `TextOnly` — no image
4. `Interactive` — interactive card with hover/focus demo
5. `MinimalCard` — title only
6. `LightAndDark` — both themes side by side

---

## Related components

- `Button` — used in the `actions` slot
- `Badge` — can be overlaid on the image or placed in the body
- `EmptyState` — used when the card grid has no items
