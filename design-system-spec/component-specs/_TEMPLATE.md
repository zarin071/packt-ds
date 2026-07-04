# Component Spec — [ComponentName]
# 03-component-specs/[ComponentName].md
# Version: 1.0.0

---

## Purpose

[One or two sentences: What does this component do? When should someone reach for it?
What should they use instead if this isn't right?]

---

## Anatomy

```
[ASCII diagram of the component's visual parts]
```

Named parts:
- `root` — the outermost element
- `[part]` — [description]

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'...' \| '...'` | `'...'` | No | [description] |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | [description] |
| `disabled` | `boolean` | `false` | No | [description] |
| `children` | `ReactNode` | — | Yes | [description] |

---

## Variants

### [variant name]
- Background: `[token]` → `[resolved hex]`
- Text: `[token]` → `[resolved hex]`
- Use: [when to use this variant]
- Rule: [constraint or pattern rule]

---

## Sizes

| Size | Height | Padding | Font token |
|------|--------|---------|-----------|
| `sm` | [Npx] | [Space token] | [Type token] |
| `md` | [Npx] | [Space token] | [Type token] |
| `lg` | [Npx] | [Space token] | [Type token] |

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default | — | — |
| Hover | [description] | [token] |
| Focus | [description] | [token] |
| Active | [description] | [token] |
| Disabled | [description] | [token] |

---

## Token consumption map

```
Layout
  [token] → [property]

Colors
  [token] → [property]

Typography
  [token] → [property]
```

---

## Accessibility

### Required ARIA
```tsx
<element
  role="[role if not semantic]"
  aria-[attribute]={[value]}
>
```

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Move focus in |
| `Shift+Tab` | Move focus out |
| `Enter` | [action] |
| `Escape` | [action if applicable] |

---

## Usage rules

### Do
- [rule]

### Don't
- [rule]

---

## Content / copy guidelines

[How should text inside this component be written?]

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { ComponentName } from './ComponentName';

figma.connect(ComponentName, 'FIGMA_NODE_ID', {
  props: {
    variant: figma.enum('Variant', {
      '[Figma option]': '[code value]',
    }),
  },
  example: ({ variant }) => (
    <ComponentName variant={variant} />
  ),
});
```

---

## Storybook stories to generate

1. `Playground`
2. `AllVariants`
3. `AllSizes`
4. `States`
5. `HubContexts`
6. `LightAndDark`
7. [additional component-specific stories]

---

## Related components

- [ComponentName] — [relationship]
