# Component Spec — Pagination
# 03-component-specs/Pagination.md
# Version: 1.0.0

---

## Purpose

Navigates between pages of a paginated dataset — previous/next arrows plus numbered page buttons with ellipsis truncation for large page counts.
Use Pagination beneath tables, search results, and content grids.
Use infinite scroll or a "Load more" button when the dataset is open-ended or the total page count is unknown.

---

## Anatomy

```
[ ‹ ]  [ 1 ]  [ 2 ]  [ ● ]  [ 4 ]  [ … ]  [ 12 ]  [ › ]
         ↑                   ↑        ↑              ↑
       page btn           active    ellipsis       last page
```

Named parts:
- `root` — `<nav aria-label="Pagination">`
- `prevButton` — left arrow button (`aria-label="Previous page"`)
- `pageButton` — numbered page button (`aria-current="page"` on active)
- `ellipsis` — `<span aria-hidden>` with EllipsisIcon; not interactive
- `nextButton` — right arrow button (`aria-label="Next page"`)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `totalPages` | `number` | — | Yes | Total number of pages. |
| `currentPage` | `number` | — | Yes | Active page (1-indexed). |
| `siblingCount` | `number` | `1` | No | Number of page buttons shown either side of the active page. |
| `onPageChange` | `(page: number) => void` | — | Yes | Fired with the target page number. |

All native `<nav>` attributes (except `onChange`) are accepted via spread.

---

## Page truncation algorithm

The `buildPages` function produces a `(number | '…')[]` array:

1. Always includes page `1` and page `totalPages`
2. Always includes `currentPage ± siblingCount`
3. Inserts `'…'` between page `1` and the left sibling window when there is a gap > 1
4. Inserts `'…'` between the right sibling window and `totalPages` when there is a gap > 1

Example — 12 pages, current = 4, siblings = 1:
`[1, 2, 3, 4, 5, '…', 12]`

Example — 12 pages, current = 8, siblings = 1:
`[1, '…', 7, 8, 9, '…', 12]`

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default page button | White background, grey border | `bg-surface`, `border-default`, `content-primary` |
| Active page button | Brand background | `brand-bg-selected`, `brand-text-on-brand` |
| Active hover | Darker brand | `brand-bg-selected-hover`, `brand-bg-selected-hover` border |
| Inactive hover | Subtle bg | `bg-hover` |
| Prev/Next disabled | Muted text, disabled border | `content-tertiary`, `border-disabled` |
| Focus | 2px ring | `focus-ring` |

---

## Token consumption map

```
Layout
  size-8 (32px)            button size (square)
  --radius-xs              button border-radius
  --space-xs               gap between buttons

Colors — inactive button
  --bg-surface             background
  --border-default         border
  --content-primary        text
  --bg-hover               hover background

Colors — active button
  --brand-bg-selected      background
  --brand-text-on-brand    text
  --brand-bg-selected-hover  hover background and border

Colors — disabled
  --content-tertiary       prev/next text when at boundary
  --border-disabled        prev/next border when at boundary

Typography
  --font-family-sans       font-family
  text-sm / font-medium    button text

Focus
  --focus-ring             focus ring
```

---

## Accessibility

```tsx
<nav aria-label="Pagination">
  <button aria-label="Previous page" disabled={currentPage <= 1}>‹</button>
  <button aria-label="Page 1" aria-current={page === currentPage ? 'page' : undefined}>1</button>
  <span aria-hidden="true">…</span>
  <button aria-label="Next page" disabled={currentPage >= totalPages}>›</button>
</nav>
```

- `<nav>` gives the landmark role; `aria-label="Pagination"` distinguishes it from other navs
- `aria-current="page"` on the active button announces the current page to screen readers
- Ellipsis is `aria-hidden` — it is decorative
- Prev/Next use `disabled` (not `aria-disabled`) so they are removed from tab order at boundaries

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Move between page buttons |
| `Enter` or `Space` | Activate the focused button |

---

## Usage rules

### Do
- Always keep Pagination below its associated content
- Use `siblingCount={2}` for wide layouts where more context helps
- Treat `onPageChange` as the single source of truth — update `currentPage` from outside
- Disable the component or hide it when there is only one page

### Don't
- Don't pre-select page 0 — pages are 1-indexed
- Don't use Pagination when the total is unknown — use infinite scroll or a load-more pattern
- Don't put Pagination inside a scrollable container if the list itself scrolls — it gets lost

---

## Content / copy guidelines

- Prev/next buttons use icon only — accessible names are `aria-label`
- Page numbers are digits only — no "Page X" labels visible (they are in `aria-label`)

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Pagination } from './Pagination';

figma.connect(Pagination, 'FIGMA_NODE_ID', {
  props: {
    totalPages: figma.string('TotalPages'),
    currentPage: figma.string('CurrentPage'),
  },
  example: ({ totalPages, currentPage }) => (
    <Pagination
      totalPages={Number(totalPages)}
      currentPage={Number(currentPage)}
      onPageChange={() => {}}
    />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `FewPages` — 3 pages, no ellipsis
3. `ManyPages` — 12 pages, current in middle (ellipsis both sides)
4. `FirstPage` — prev disabled
5. `LastPage` — next disabled
6. `WideSiblings` — siblingCount={2}
7. `LightAndDark` — both themes

---

## Related components

- `ListItem` — Pagination typically controls a list of ListItems
- `SearchBar` — often appears above the paginated list
