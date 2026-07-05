# Component Spec — Tab
# 03-component-specs/Tab.md
# Version: 1.0.0

---

## Purpose

Switches between related content views within the same page context.
Use Tab for sibling views that are related and equally important (Overview / Curriculum / Reviews).
Use Breadcrumb for hierarchical back-navigation. Use a `<select>` for more than ~7 tab options.

**Note:** This component renders the tab list only — not the content panels. Wire each tab's `key` to your own content panels using `activeKey` / `onChange`.

---

## Anatomy

```
┌──────────┬──────────┬──────────┐
│  Tab 1   │  Tab 2   │  Tab 3   │     ← tabList
└──────────┴──────────┴──────────┘─────
                ████                   ← active indicator bar (border-bottom)
```

Named parts:
- `root` — `<TabsPrimitive.Root>` — owns value/defaultValue (Radix Tabs)
- `tabList` — `<TabsPrimitive.List>` — `role="tablist"`, bottom-bordered flex row
- `trigger` — `<TabsPrimitive.Trigger>` — `role="tab"`, the individual tab button
- `icon` — optional icon before the label, always `aria-hidden`
- `activeIndicator` — the `after:` pseudo-element on the active trigger — a coloured bottom bar

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `TabItem[]` | — | Yes | Ordered list of tab definitions. |
| `variant` | `'default' \| 'brand'` | `'default'` | No | Active indicator and text colour scheme. |
| `activeKey` | `string` | — | No | Controlled active tab key. |
| `defaultActiveKey` | `string` | — | No | Uncontrolled default; falls back to `items[0].key`. |
| `onChange` | `(key: string) => void` | — | No | Fired when a tab is selected. |
| `aria-label` | `string` | `'Tab navigation'` | No | Accessible name for the tablist when no visible heading describes it. |

### `TabItem` shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | `string` | Yes | Unique identifier, used as Radix `value`. |
| `label` | `string` | Yes | Visible tab text. |
| `icon` | `ReactNode` | No | Icon before the label. Always `aria-hidden`. |
| `disabled` | `boolean` | No | Prevents selecting this tab. |

---

## Variants

### `default`
- Active indicator: `var(--border-strong)` (dark line)
- Active text: `var(--content-primary)`, `font-semibold`
- Use: standard content tabs inside pages and panels

### `brand`
- Active indicator: `var(--brand-border-default)` (orange line)
- Active text: `var(--brand-text-default)`
- Use: feature tabs, primary navigation tabs in hub contexts

---

## States

| State | Visual change | Token used |
|-------|--------------|-----------|
| Inactive | Muted text, transparent bg | `content-tertiary` |
| Inactive hover | Subtle bg, primary text | `bg-hover`, `content-primary` |
| Active (`default`) | Bold text, dark bottom bar | `content-primary`, `border-strong` |
| Active (`brand`) | Brand text, orange bottom bar | `brand-text-default`, `brand-border-default` |
| Disabled | Opacity 0.4, no hover | — |
| Focus | 2px ring | `focus-ring` |

---

## Token consumption map

```
Layout
  --radius-xs              trigger top corners
  --space-xl               trigger horizontal padding
  --space-m                trigger vertical padding
  --space-xs               gap between icon and label
  --border-default         tablist bottom border
  --space-m (h-m)          active indicator height (via after: pseudo-element)

Colors — tabList
  --border-default         bottom separator line

Colors — trigger (inactive)
  --content-tertiary       text
  --bg-hover               hover background
  --content-primary        hover text

Colors — trigger (active, default)
  --content-primary        text
  --border-strong          indicator bar

Colors — trigger (active, brand)
  --brand-text-default     text
  --brand-border-default   indicator bar

Focus
  --focus-ring             focus ring on trigger
```

---

## Accessibility

```tsx
<TabsPrimitive.Root value={activeKey} onValueChange={onChange}>
  <TabsPrimitive.List aria-label={ariaLabel} role="tablist">
    <TabsPrimitive.Trigger
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      disabled={item.disabled}
    >
      <span aria-hidden="true">{item.icon}</span>
      {item.label}
    </TabsPrimitive.Trigger>
  </TabsPrimitive.List>
</TabsPrimitive.Root>
```

Radix handles `role="tablist"`, `role="tab"`, `aria-selected`, roving tabindex, and `aria-controls` / `aria-labelledby` automatically.

### Keyboard behaviour (Radix roving tabindex)
| Key | Action |
|-----|--------|
| `Tab` | Move focus into the tablist (to the selected tab) |
| `Arrow →` | Move focus to next tab; activates it |
| `Arrow ←` | Move focus to previous tab; activates it |
| `Home` | Focus and activate first tab |
| `End` | Focus and activate last tab |
| `Shift+Tab` | Exit the tablist |

---

## Usage rules

### Do
- Keep tab labels short — 1–2 words max
- Use `aria-label` on the root when no visible heading describes the tab group
- Wire `onChange` to update URL state or page content
- Use `defaultActiveKey` for simple uncontrolled patterns; use `activeKey` + `onChange` for URL-sync

### Don't
- Don't use more than 7 tabs in a single row — they overflow on mobile
- Don't put tabs inside a scrollable container with sticky positioning (z-index issues)
- Don't use tabs to separate form steps — use a Stepper
- Don't disable tabs to hide content — remove the tab if the content is unavailable

---

## Content / copy guidelines

- Labels: Noun or noun-phrase — "Overview", "Curriculum", "Reviews"
- Sentence case: "My courses" not "My Courses"
- Avoid verbs — tabs display content, they don't trigger actions
- Keep all labels approximately the same length to avoid visual imbalance

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { Tab } from './Tab';

figma.connect(Tab, 'FIGMA_NODE_ID', {
  props: {
    variant: figma.enum('Variant', {
      Default: 'default',
      Brand: 'brand',
    }),
  },
  example: ({ variant }) => (
    <Tab
      variant={variant}
      items={[
        { key: 'overview', label: 'Overview' },
        { key: 'curriculum', label: 'Curriculum' },
        { key: 'reviews', label: 'Reviews' },
      ]}
    />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls
2. `DefaultVariant` — 3 tabs, default style
3. `BrandVariant` — 3 tabs, brand active indicator
4. `WithIcons` — tabs with leading icons
5. `WithDisabledTab` — one disabled tab in group
6. `Controlled` — activeKey + onChange with panel content shown
7. `ManyTabs` — 6 tabs to show overflow behaviour
8. `LightAndDark` — both themes

---

## Related components

- `Breadcrumb` — for hierarchical navigation; Tab is for sibling views
- `Pagination` — for navigating between ordered pages of content
