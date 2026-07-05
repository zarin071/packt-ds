# Component Spec — SearchBar
# 03-component-specs/SearchBar.md
# Version: 1.0.0

---

## Purpose

A pill-shaped search input with a leading search/spinner icon and a trailing clear button.
Use SearchBar for filtering lists, searching content libraries, and site-wide search.
Use a plain Input with `type="search"` only when the pill shape and icon affordances are not needed.

---

## Anatomy

```
┌─────────────────────────────────────────────────────┐
│  [ 🔍 | ⟳ ]  [ input ]                      [ × ]  │
│    ↑ icon      ↑ text field                  ↑ clear │
└─────────────────────────────────────────────────────┘
```

Named parts:
- `root` — outer `<div>` with pill shape, border, and `focus-within` ring
- `leadingIcon` — SearchIcon (idle) or SpinnerIcon with `animate-spin` (loading); always `aria-hidden`
- `input` — Input atom with `type="search"`, borderless and transparent inside the pill
- `clearButton` — `<button>` shown when `value` is non-empty and `loading` is false

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | — | No | Controlled value. |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | No | Fires on every keystroke. |
| `onSearch` | `(value: string) => void` | — | No | Fires when the user presses Enter. |
| `onClear` | `() => void` | — | No | Fires when the clear button is pressed. Returns focus to input. |
| `loading` | `boolean` | `false` | No | Shows spinner instead of search icon; hides clear button. |
| `disabled` | `boolean` | `false` | No | Disables the input and applies muted styles. |
| `placeholder` | `string` | `'Search…'` | No | Input placeholder text. |

All `InputHTMLAttributes<HTMLInputElement>` (except `type`, `onChange`, `size`) are accepted via spread.

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default | White pill, grey border | `bg-surface`, `border-default` |
| Focus-within | Brand ring on the outer pill | `focus-ring` |
| Disabled | Muted background, no cursor | `bg-disabled`, `border-disabled` |
| Loading | SpinnerIcon replaces SearchIcon | — |
| Has value | Clear button appears | — |
| Clear button hover | Icon darkens | `content-primary` |
| Clear button focus | 2px ring | `focus-ring` |

---

## Token consumption map

```
Layout
  --radius-pill            border-radius (full pill)
  --space-m                horizontal padding
  --space-xs               gap between icon/input/clear

Colors — root
  --bg-surface             background
  --border-default         border
  --bg-disabled            disabled background
  --border-disabled        disabled border

Colors — icons
  --content-secondary      leading and clear icons (default)
  --content-primary        clear button icon on hover

Focus
  --focus-ring             focus-within ring on root
  --focus-ring             focus ring on clear button

Typography (inherited from Input)
  --font-family-sans       font-family
  text-sm                  input text
```

---

## Accessibility

```tsx
<div role="search">  {/* optional — consumer can wrap in role="search" landmark */}
  <div className="search-bar-root">
    <span aria-hidden="true"><SearchIcon /></span>
    <Input
      type="search"
      aria-label={ariaLabel ?? 'Search'}
      value={value}
      onChange={onChange}
    />
    {hasValue && !loading && (
      <button aria-label="Clear search" onClick={handleClear} />
    )}
  </div>
</div>
```

- `type="search"` tells browsers this is a search field; some browsers add their own clear button — suppress it with `[&::-webkit-search-cancel-button]:hidden`
- `aria-label` defaults to `'Search'` if none is passed via props
- The clear button has `aria-label="Clear search"` — after clearing, focus returns to the input

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Focus the input |
| `Enter` | Calls `onSearch` with the current value |
| `Tab` (when value present) | Focus moves to clear button |
| `Enter` / `Space` (on clear) | Clears value, returns focus to input |
| `Escape` | Browser-native: clears `type="search"` inputs in some browsers |

---

## Usage rules

### Do
- Provide `onClear` when providing `onChange` — the clear button won't do anything useful without it
- Use `loading={true}` while an async search is in flight to signal activity
- Set a meaningful `aria-label` when the surrounding context doesn't make the purpose obvious (e.g. `aria-label="Search courses"`)
- Place SearchBar above the content it filters

### Don't
- Don't use SearchBar inside a form that submits — use a form with a submit button and `Input` instead
- Don't show the clear button when `loading` is true — the two states conflict
- Don't use SearchBar for filtering a local array on every keystroke without debouncing first

---

## Content / copy guidelines

- `placeholder`: "Search…" (default) or more specific — "Search courses", "Find a component"
- `aria-label`: Matches the placeholder intent — "Search courses"
- Never use the placeholder as the only label — provide `aria-label`

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { SearchBar } from './SearchBar';

figma.connect(SearchBar, 'FIGMA_NODE_ID', {
  props: {
    loading: figma.boolean('Loading'),
    disabled: figma.boolean('Disabled'),
    placeholder: figma.string('Placeholder'),
  },
  example: ({ loading, disabled, placeholder }) => (
    <SearchBar loading={loading} disabled={disabled} placeholder={placeholder} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `Default` — empty search bar
3. `WithValue` — with a value (clear button visible)
4. `Loading` — spinner state
5. `Disabled` — disabled state
6. `OnSearch` — enter-to-search demo with alert
7. `LightAndDark` — both themes

---

## Related components

- `Input` — SearchBar composes Input internally; use Input directly for non-search text fields
- `ListItem` — often below SearchBar for filtered results
- `Pagination` — often below the filtered list
