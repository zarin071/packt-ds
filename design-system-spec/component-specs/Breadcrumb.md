# Component Spec — Breadcrumb
# 03-component-specs/Breadcrumb.md
# Version: 1.0.0

---

## Purpose

Shows the user's location in a hierarchical navigation path.
Use Breadcrumb on pages more than one level deep when users need to navigate back up the tree.
Do not use it for step-by-step flows — use a Stepper for that.

---

## Anatomy

```
Home  ›  Library  ›  React  ›  [Current Page]
  ↑          ↑          ↑            ↑
 link       link       link       active span
       ↑          ↑
    separator  separator
```

Named parts:
- `root` — `<nav aria-label="Breadcrumb">`
- `list` — `<ol>` of breadcrumb items
- `item` — `<li>` for each crumb
- `link` — `<a>` for non-active ancestors
- `activeCrumb` — `<span aria-current="page">` for the current location
- `separator` — decorative icon between items (always `aria-hidden`)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `BreadcrumbItem[]` | — | Yes | Ordered list of crumb definitions. |
| `separator` | `ReactNode` | `<ChevronRightIcon />` | No | Custom separator. Always rendered `aria-hidden`. |

### `BreadcrumbItem` shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | Yes | Display text of the crumb. |
| `href` | `string` | No | Link target. Omit or use `'#'` for non-navigable crumbs. |
| `active` | `boolean` | No | Marks this crumb as the current page — renders as `<span>` instead of `<a>`. |

The last item in the array is always treated as the current page, even if `active` is not set.

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default (link) | Muted text | `content-tertiary` |
| Hover (link) | Brand colour + underline | `brand-text-default` |
| Focus (link) | 2px ring | `focus-ring` |
| Active (current page) | Bold, primary text | `content-primary` |

---

## Token consumption map

```
Typography
  --font-family-sans       font-family
  text-sm / leading-5      font size

Colors — links
  --content-tertiary       default link text
  --brand-text-default     hovered link text

Colors — active crumb
  --content-primary        current page text

Layout
  --space-2xs              gap between items and separator
  --radius-xs              focus ring border-radius

Focus
  --focus-ring             focus ring colour
```

---

## Accessibility

### Required ARIA
```tsx
<nav aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/library">Library</a>
      <span aria-hidden="true"><ChevronRightIcon /></span>
    </li>
    <li>
      <span aria-current="page">React</span>
    </li>
  </ol>
</nav>
```

- The `<nav>` element gives the landmark role; `aria-label="Breadcrumb"` distinguishes it from site nav.
- `aria-current="page"` on the active crumb tells screen readers this is the current location.
- The separator is always `aria-hidden` — it has no semantic value.

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Move focus through each link |
| `Shift+Tab` | Move focus back |
| `Enter` | Follow the focused link |

---

## Usage rules

### Do
- Always include the current page as the last item
- Link all ancestors except the current page
- Use short, specific labels — match the actual page title
- Keep breadcrumbs to the top of the page content area

### Don't
- Don't use breadcrumbs for flat navigation (no hierarchy)
- Don't use them as a substitute for a Back button in modals or drawers
- Don't include the site root ("Home") unless the hierarchy genuinely starts there
- Don't truncate labels — if the path is too long, consider collapsing mid-levels

---

## Content / copy guidelines

- Labels should match page titles exactly — no paraphrasing
- Sentence case: "Course library" not "Course Library"
- Keep labels concise: "Settings" not "Account settings page"

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Breadcrumb } from './Breadcrumb';

figma.connect(Breadcrumb, 'FIGMA_NODE_ID', {
  props: {},
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Library', href: '/library' },
        { label: 'React', active: true },
      ]}
    />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `TwoLevels` — one ancestor + current page
3. `FourLevels` — realistic deep path
4. `CustomSeparator` — slash or pipe as separator
5. `LightAndDark` — both themes side by side

---

## Related components

- `Tab` — for switching between sibling views at the same level
- `Pagination` — for navigating between ordered pages within a section
