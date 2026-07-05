# Component Spec — Icon
# 03-component-specs/Icon.md
# Version: 1.0.0

---

## Purpose

A sizing wrapper for SVG icon components that enforces consistent icon dimensions and hides the icon from assistive technology.
Use Icon when you need to render a standalone icon at a specific size with no surrounding control.
The accessible name must always come from the element that contains or describes the icon — never from the Icon wrapper itself.

---

## Anatomy

```
<span aria-hidden="true">
  [ SVG child ]
</span>
```

Named parts:
- `root` — `<span>` wrapper; always `aria-hidden="true"`
- `svgChild` — the icon component passed as `children`, sized via CSS override

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Controls the icon's rendered dimensions. |
| `children` | `ReactNode` | — | Yes | A single SVG icon component. |

All native `<span>` attributes are accepted via spread (e.g. `className`).

---

## Sizes

| Size | Dimensions |
|------|-----------|
| `sm` | 16×16px (`[&>svg]:size-4`) |
| `md` | 20×20px (`[&>svg]:size-5`) |
| `lg` | 24×24px (`[&>svg]:size-6`) |

Sizing is applied via CSS — it overrides any `width`/`height` the SVG element itself has, so icon components do not need to remove their own dimensions.

---

## Token consumption map

```
Layout
  [&>svg]:size-4   16px (sm)
  [&>svg]:size-5   20px (md)
  [&>svg]:size-6   24px (lg)

Colors
  Inherited from parent context — Icon sets no colour itself.
  Apply colour classes to Icon's className or its parent.
```

---

## Accessibility

```tsx
<span aria-hidden="true">
  <SearchIcon />
</span>
```

- The wrapper is **always** `aria-hidden="true"` — icon-only controls must carry their accessible name on the control, not the icon
- Never set `role` or `aria-label` on Icon — it is purely visual
- When an icon communicates meaning without an adjacent label, the containing control must have `aria-label`

### Correct pattern
```tsx
// Button with icon — label is on the button
<button aria-label="Search">
  <Icon><SearchIcon /></Icon>
</button>

// Icon next to text — no label needed, text is the label
<button>
  <Icon><SearchIcon /></Icon>
  Search
</button>
```

### Incorrect pattern
```tsx
// WRONG — aria-label on Icon is ignored by AT because aria-hidden is set
<Icon aria-label="Search"><SearchIcon /></Icon>
```

---

## Usage rules

### Do
- Use Icon when you need explicit size control over a third-party or system icon
- Always provide the accessible name on the surrounding control when using icon-only buttons
- Use `sm` for inline icons in dense UI (badges, table cells)
- Use `md` for standard button icons and navigation icons
- Use `lg` for feature icons, empty states, and illustration-adjacent contexts

### Don't
- Don't use Icon for decorative icons that aren't inside a control — just render the SVG directly with `aria-hidden`
- Don't set `aria-label` or `role` on Icon
- Don't pass multiple children — Icon expects a single SVG element

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Icon } from './Icon';
import { SearchIcon } from '../icons';

figma.connect(Icon, 'FIGMA_NODE_ID', {
  props: {
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
  },
  example: ({ size }) => (
    <Icon size={size}><SearchIcon /></Icon>
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — size control
2. `AllSizes` — sm, md, lg side by side
3. `ColourInheritance` — icon inside coloured text containers
4. `IconInButton` — correct usage inside button with aria-label

---

## Related components

- `Button` — the most common consumer of Icon
- `Badge` — uses icon-sized glyphs
- `Avatar` — uses Icon sizing for fallback
