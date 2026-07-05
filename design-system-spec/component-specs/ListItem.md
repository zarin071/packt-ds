# Component Spec — ListItem
# 03-component-specs/ListItem.md
# Version: 1.0.0

---

## Purpose

A single row in a vertical list — icon, title, optional description, and a trailing action slot.
Use ListItem for navigation menus, settings lists, search results, and command palettes.
Must be used inside a `<ul>` or `<ol>` — it renders as `<li>`.

---

## Anatomy

```
[ icon ]  Title text              [ action ]
          Supporting description
```

Named parts:
- `root` — `<li>` with bottom border (last child has no border)
- `iconSlot` — leading icon wrapper, always `aria-hidden`
- `textStack` — flex column holding `title` and `description`
- `title` — primary text, truncated with ellipsis if overflow
- `description` — secondary text below title, also truncated
- `actionSlot` — trailing slot for Badge, Button, icon button, or similar

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | Yes | Primary label text. |
| `description` | `string` | — | No | Secondary text below the title. |
| `icon` | `ReactNode` | — | No | Leading icon. Always `aria-hidden`. |
| `action` | `ReactNode` | — | No | Trailing content (Badge, Button, icon). |
| `selected` | `boolean` | `false` | No | Highlights the row in the selected state and sets `aria-selected`. |
| `interactive` | `boolean` | `false` | No | Adds hover/focus affordances and a pointer cursor. Sets `tabIndex={0}`. |

All native `<li>` attributes are accepted via spread.

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default | White background | `bg-surface` |
| Selected | Tinted background | `bg-selected` |
| Hover (interactive) | Subtle background change | `bg-hover` |
| Focus (interactive) | 2px ring | `focus-ring` |
| Default text | Primary + secondary | `content-primary`, `content-secondary` |
| Selected text | Both slots become selected | `content-selected` |

---

## Token consumption map

```
Layout
  --space-l                horizontal padding
  --space-m                vertical padding
  --space-m                gap between icon/text/action
  --border-default         bottom divider between rows

Colors
  --bg-surface             default background
  --bg-selected            selected background
  --bg-hover               interactive hover background
  --content-primary        title (default), icon (selected)
  --content-secondary      description (default)
  --content-selected       title + description when selected

Focus
  --focus-ring             focus ring (interactive only)

Typography
  --font-family-sans       font-family
  text-sm / font-medium / leading-5    title
  text-xs / leading-4                  description
```

---

## Accessibility

```tsx
<li
  aria-selected={interactive ? selected : undefined}
  tabIndex={interactive ? 0 : undefined}
>
```

- `aria-selected` is only set when `interactive={true}` — static list items don't need it
- When used as a listbox option, wrap the `<ul>` in `role="listbox"` and set `role="option"` on each `<li>`
- The `icon` slot is always `aria-hidden` — meaning must come from `title`

### Keyboard behaviour (interactive)
| Key | Action |
|-----|--------|
| `Tab` | Move focus to the row |
| `Enter` | Activate the item (consumer adds handler via `onClick`) |
| `Space` | Activate the item (consumer adds handler) |
| Arrow keys | Not handled by this component — implement in the parent if building a listbox |

---

## Usage rules

### Do
- Always provide `title` — it is the accessible name for the row
- Use `selected` + `interactive` together; `selected` alone on a static row is visual only
- Wrap a group of ListItems in `<ul>` — the `<li>` is semantically meaningful
- Use the `action` slot for controls that are independent of the row click (e.g. a delete button)

### Don't
- Don't make an interactive ListItem contain other interactive elements (the row itself being a button creates nested focusable items)
- Don't use ListItem for tabular data — use a `<table>` for that
- Don't truncate `title` intentionally — only use truncation for overflow safety; keep titles short

---

## Content / copy guidelines

- `title`: Noun phrase or short verb phrase, max ~40 chars before truncation kicks in
- `description`: Supporting context — version numbers, metadata, statuses
- Keep `description` to one line — it truncates at overflow

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { ListItem } from './ListItem';

figma.connect(ListItem, 'FIGMA_NODE_ID', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    selected: figma.boolean('Selected'),
    interactive: figma.boolean('Interactive'),
  },
  example: ({ title, description, selected, interactive }) => (
    <ListItem title={title} description={description} selected={selected} interactive={interactive} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Default` — title only
3. `WithDescription` — title + description
4. `WithIcon` — leading icon
5. `WithAction` — trailing badge or button
6. `Selected` — selected state
7. `Interactive` — hover and focus demo
8. `FullComposition` — icon + title + description + action
9. `ListOfItems` — several rows showing divider pattern
10. `LightAndDark` — both themes

---

## Related components

- `Badge` — common in the `action` slot
- `Avatar` — can be used as the `icon` slot for user lists
- `SearchBar` — often paired above a ListItem list
