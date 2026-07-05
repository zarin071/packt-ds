# Component Spec — Tooltip
# 03-component-specs/Tooltip.md
# Version: 1.0.0

---

## Purpose

A non-interactive floating label that provides supplementary context for an element on hover or focus.
Use Tooltip for icon-only buttons that need a visible label, abbreviations, and truncated text.
Do not use it for critical information — content that is essential to completing a task must be visible by default.

---

## Anatomy

```
                ┌───────────────────┐
                │   Tooltip text    │  ← content bubble
                └────────▼──────────┘
                         ▲ arrow
              [ trigger element ]
```

Named parts:
- `root` — `<TooltipPrimitive.Root>` — manages open/close state (Radix)
- `provider` — `<TooltipPrimitive.Provider>` — wraps Root; included automatically in this component
- `trigger` — `<TooltipPrimitive.Trigger asChild>` — the element that shows the tooltip on hover/focus
- `portal` — `<TooltipPrimitive.Portal>` — renders the bubble in a portal to escape overflow constraints
- `content` — `<TooltipPrimitive.Content>` — the bubble (`role="tooltip"`)
- `arrow` — `<TooltipPrimitive.Arrow>` — the triangle pointer

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | `ReactNode` | — | Yes | The text or node shown in the bubble. |
| `children` | `ReactNode` | — | Yes | The trigger element. Must be a single focusable child. |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | No | Which side of the trigger the tooltip appears on. |
| `delayDuration` | `number` | `200` | No | Milliseconds before the tooltip opens on hover. |
| `open` | `boolean` | — | No | Controlled open state. |
| `defaultOpen` | `boolean` | — | No | Uncontrolled initial open state. |
| `onOpenChange` | `(open: boolean) => void` | — | No | Fires on open/close. |
| `className` | `string` | — | No | Additional class applied to the content bubble. |

---

## States

| State | Behaviour |
|-------|-----------|
| Closed | Content not rendered (portal) |
| Open (hover) | After `delayDuration`ms — fade + zoom-in animation |
| Open (focus) | Immediately on focus (no delay) |
| Closing | `data-[state=closed]` → fade-out + zoom-out animation |

---

## Token consumption map

```
Layout
  --radius-xs              bubble border-radius
  max-w-[200px]            max bubble width (hardcoded — token candidate)
  sideOffset: 8px          gap between trigger and bubble
  --space-s                horizontal padding (px-s)
  --space-xs               vertical padding (py-xs)
  arrow: 10×5px            arrow dimensions

Colors
  --bg-selected            bubble background (inverted: dark in light mode, light in dark mode)
  --content-selected       bubble text (inverse of surface)
  fill-bg-selected         arrow fill (matches bubble)

Typography
  text-xs                  bubble font size
  text-balance             balanced line wrapping (CSS property)
  text-center              centred text

Animation
  animate-in fade-in-0 zoom-in-95      open
  animate-out fade-out-0 zoom-out-95   close
```

---

## Accessibility

```tsx
<TooltipPrimitive.Root>
  <TooltipPrimitive.Trigger asChild>
    {children}   {/* must be focusable */}
  </TooltipPrimitive.Trigger>
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      role="tooltip"
      id={tooltipId}
    >
      {content}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
</TooltipPrimitive.Root>
```

- Radix sets `role="tooltip"` and manages `aria-describedby` on the trigger automatically
- The trigger **must** be a focusable element — if passing a non-interactive element (e.g. `<span>`), add `tabIndex={0}` to it
- Never put interactive content (buttons, links) inside `content` — tooltips are non-interactive
- Tooltip opens on focus so keyboard users can access it; it closes on `Escape`

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Focus the trigger → tooltip opens |
| `Escape` | Dismiss the tooltip |
| `Shift+Tab` | Move focus away → tooltip closes |

---

## Usage rules

### Do
- Use Tooltip for icon-only buttons — it is the accessible name for the action
- Keep `content` short — 1 sentence max, ideally 5–10 words
- Use `position` to avoid the tooltip obscuring adjacent content
- Wrap the Provider-less version of this component in a `TooltipPrimitive.Provider` at the app level if mounting many tooltips (performance)

### Don't
- Don't put essential information only in a Tooltip — mobile and keyboard users can miss hover-only content
- Don't put interactive content inside `content` (links, buttons) — it is unreachable
- Don't use Tooltip on touch-only controls where hover is unavailable
- Don't open tooltips automatically without user intent — `defaultOpen={true}` is almost always wrong

---

## Content / copy guidelines

- `content`: Sentence case, no trailing period for short phrases — "Copy to clipboard" not "Copies to clipboard."
- For icon-only buttons: use the button's action as the label — "Delete", "Edit", "Share"
- For abbreviations: expand the full term — "CTR → Click-through rate"

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Tooltip } from './Tooltip';

figma.connect(Tooltip, 'FIGMA_NODE_ID', {
  props: {
    content: figma.string('Content'),
    position: figma.enum('Position', {
      Top: 'top',
      Bottom: 'bottom',
      Left: 'left',
      Right: 'right',
    }),
  },
  example: ({ content, position }) => (
    <Tooltip content={content} position={position}>
      <button>Hover me</button>
    </Tooltip>
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `AllPositions` — top, bottom, left, right side by side
3. `OnIconButton` — correct usage on an icon-only button
4. `LongContent` — multi-line text wrapping at max-width
5. `Controlled` — open state driven by external toggle
6. `LightAndDark` — both themes (bubble should invert correctly)

---

## Related components

- `Button` — Tooltip is most commonly used as a label for icon-only Button variants
- `Icon` — the trigger inside a Tooltip is typically an Icon-wrapped SVG
- `Badge` — for persistent visible metadata; use instead of Tooltip when the info is always relevant
