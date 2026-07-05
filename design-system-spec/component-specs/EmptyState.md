# Component Spec — EmptyState
# 03-component-specs/EmptyState.md
# Version: 1.0.0

---

## Purpose

Communicates that a list, page, or section has no content — and tells the user what they can do about it.
Use EmptyState for empty lists, zero-results searches, first-run experiences, and error placeholders.
Do not use it as a loading placeholder — use a Skeleton or Spinner for that.

---

## Anatomy

```
         [ icon / illustration ]
              Title text
         Supporting description
           [ action button ]
```

Named parts:
- `root` — `<div>` centred flex column (`items-center justify-center`)
- `iconSlot` — `<span aria-hidden>` wrapping the icon (defaults to InboxIcon, 48×48)
- `title` — `<h3>` — primary message, always present
- `description` — `<p>` — supporting context, optional
- `actionSlot` — wrapper `<div>` for an action button, optional

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | Yes | Primary message. Rendered as `<h3>`. |
| `description` | `string` | — | No | Supporting explanation. |
| `icon` | `ReactNode` | `<InboxIcon />` | No | Custom illustration or icon. Always `aria-hidden`. |
| `action` | `ReactNode` | — | No | CTA button or link. |

All native `<div>` attributes are accepted via spread.

---

## Token consumption map

```
Layout
  --space-m                gap between elements
  px-8 / py-10             outer padding (hardcoded arbitrary — token candidate)
  max-w-[360px]            description max-width (hardcoded arbitrary — token candidate)
  [&>svg]:size-12           icon size (48px)

Colors
  --content-tertiary + opacity-60    icon colour
  --content-primary        title text
  --content-secondary      description text

Typography
  --font-family-sans       font-family
  text-base / font-semibold / leading-6    title
  text-sm / leading-5                      description
```

---

## Accessibility

- `icon` is always `aria-hidden` — the title and description carry all meaning
- `title` is an `<h3>` — place EmptyState within a section that has an `<h2>` ancestor so the heading level is correct in context
- If the action is a Button, it follows Button's own accessibility rules

### Keyboard behaviour
EmptyState itself is not interactive. If `action` is provided, it is keyboard-focusable per its own component rules.

---

## Usage rules

### Do
- Always provide a `title` — a bare icon with no text is ambiguous
- Use `description` to explain why the state is empty and what the user can do
- Provide an `action` when there is a direct recovery path (e.g. "Create your first course")
- Match the icon to the context — an inbox icon for empty messages, a search icon for no results

### Don't
- Don't use EmptyState as a loading state — use Skeleton or Spinner
- Don't use it for error states that require a retry — provide a dedicated error component with a retry action
- Don't use generic copy like "Nothing here yet" without context
- Don't nest EmptyState inside a card when it already fills a full-page area

---

## Content / copy guidelines

- `title`: Short, empathetic, specific. "No courses yet" not "Empty".
- `description`: Explain why and hint at a fix. "You haven't enrolled in any courses. Browse the library to get started."
- `action` label: Verb-first, specific. "Browse courses" not "Click here".

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { EmptyState } from './EmptyState';

figma.connect(EmptyState, 'FIGMA_NODE_ID', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
  },
  example: ({ title, description }) => (
    <EmptyState title={title} description={description} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `TitleOnly` — minimum viable state
3. `WithDescription` — title + description
4. `WithAction` — title + description + Button
5. `CustomIcon` — with a non-default icon
6. `NoResults` — search empty state example
7. `LightAndDark` — both themes

---

## Related components

- `Button` — used in the `action` slot
- `Icon` — for sizing custom icons in the icon slot
- `Card` — EmptyState can be placed inside a Card's body slot
