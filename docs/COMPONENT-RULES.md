# Packt Design System — Component Authoring Rules

Use this as a checklist before committing any new component or change.
These rules exist to prevent issues found in the audit (2026-07-01).

---

## 1. Tokens — what you must never do

| ❌ Never | ✅ Always |
|---|---|
| `color: #f97141` | `color: var(--packt-color-brand)` |
| `font-weight: 600` | `font-weight: var(--packt-weight-semibold-numeric)` |
| `border-radius: 8px` | `border-radius: calc(var(--packt-radius-s) * 1px)` |
| `padding: 12px` | `padding: calc(var(--packt-space-m) * 1px)` |
| `font-size: 14px` | `font-size: calc(var(--packt-size-14) * 1px)` |
| `var(--packt-orange-600)` in hover | `var(--packt-color-brand-hover)` (use semantic, not palette) |
| `border-radius: 50%` hardcoded | add to `tokens.helpers.css` or use `--packt-radius-circle` with `%` context |

**Why:** Hardcoded values break theming and make Figma→code sync impossible.
Palette tokens (`--packt-orange-600`) are for generating semantic tokens only — not for use in components.

---

## 2. Dark mode — the required pattern

All components must respond to dark mode via CSS cascade, **not** a `theme` prop.

### How it works

There are three token layers:

```
Figma Variables
      ↓
tokens.css       — primitive + semantic light vars  (--packt-semantic-colors-light-*)
tokens.dark.css  — semantic dark vars               (--packt-semantic-colors-dark-*)
tokens.theme.css — active-theme aliases             (--packt-color-*, --packt-bg-*, etc.)
```

`tokens.theme.css` (see `src/tokens/tokens.theme.css`) is what components reference.
It maps the active theme alias to either the light or dark semantic token based on a parent selector:

```css
:root {
  --packt-bg-primary: var(--packt-semantic-colors-light-background-primary);
  --packt-content-primary: var(--packt-semantic-colors-light-content-primary);
  /* ... */
}

[data-theme="dark"], .dark {
  --packt-bg-primary: var(--packt-semantic-colors-dark-background-primary);
  --packt-content-primary: var(--packt-semantic-colors-dark-content-primary);
  /* ... */
}
```

### In your component CSS

```css
/* ✅ Correct — responds to theme automatically */
.field {
  background: var(--packt-bg-primary);
  color: var(--packt-content-primary);
  border-color: var(--packt-border-default);
}

/* ❌ Wrong — locked to light mode forever */
.field {
  background: var(--packt-semantic-colors-light-background-primary);
  color: var(--packt-semantic-colors-light-content-primary);
}
```

### Never use a `theme` prop

```tsx
// ❌ Don't do this
<Button theme="dark" />

// ✅ Do this — wrap at the page/app level
<div data-theme="dark">
  <Button />  {/* picks up dark tokens automatically */}
</div>
```

---

## 3. Component anatomy — every component must have

- [ ] **Default state** — base appearance
- [ ] **Hover state** — using semantic hover tokens
- [ ] **Focus-visible state** — `box-shadow: var(--packt-focus-ring)` on keyboard focus, never `outline: none` without a replacement
- [ ] **Disabled state** — `cursor: not-allowed`, disabled bg/border/content tokens, `pointer-events: none` or the `disabled` attribute
- [ ] **Error state** (form controls only) — error border + error text tokens
- [ ] **Loading state** (actions only) — spinner + `aria-busy`, button disabled during load
- [ ] **Dark mode** — verified via Storybook dark background toggle (see §2)

---

## 4. Accessibility — required before merge

Run `/design:accessibility-review` on every new component. Specific rules:

**Colour contrast**
- Normal text (< 18px, non-bold): minimum **4.5:1** against background
- Large text (≥ 18px, or 14px bold): minimum **3:1**
- Interactive elements (borders on inputs, focus rings): minimum **3:1**
- Check both light **and** dark themes

**Keyboard**
- All interactive elements must be reachable via `Tab`
- Buttons/links activate on `Enter`; buttons also activate on `Space`
- Modal/dialog traps focus; `Escape` closes it
- Never remove `:focus-visible` without a visible replacement

**ARIA**
- Form controls must have a `<label>` linked via `htmlFor`/`id` or `aria-label`
- Error messages must be linked via `aria-describedby`
- Required fields must have `aria-required="true"` or the `required` attribute
- Loading state: `aria-busy="true"` on the element
- Icon-only buttons: `aria-label` required

**Screen reader**
- Decorative icons: `aria-hidden="true"`
- Functional icons without visible label: `aria-label` on the parent button
- Status messages that appear dynamically: use `role="status"` or `aria-live="polite"`

---

## 5. Naming conventions

**Component files**
```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.stories.tsx
  index.ts
```

**CSS class names** — BEM-like with component prefix:
```css
.componentName        /* block */
.componentName--sm    /* modifier: size */
.componentName--error /* modifier: state */
.componentName__icon  /* element */
```

**TypeScript types** — export alongside component:
```ts
export type ComponentNameVariant = 'primary' | 'secondary';
export type ComponentNameSize = 'sm' | 'md' | 'lg';
export interface ComponentNameProps { ... }
```

**Storybook title** — match the folder:
```ts
title: 'Components/ComponentName'
```

---

## 6. Stories — every component must have

- [ ] **Playground** — interactive story with all controls
- [ ] **Default** — most common use case, no controls needed
- [ ] **All variants** — one row per variant showing all sizes
- [ ] **States** — disabled, error, loading (where applicable)
- [ ] **Dark mode** — using the Storybook dark background or `data-theme="dark"` wrapper
- [ ] `tags: ['autodocs']` on the meta — generates the API reference page

---

## 7. Before you commit — checklist

- [ ] No hardcoded hex values in `.module.css` files
- [ ] No palette tokens (`--packt-orange-*`, `--packt-neutral-*`) used in components — semantic tokens only
- [ ] No `--packt-semantic-colors-light-*` tokens used directly — use theme aliases from `tokens.theme.css`
- [ ] Dark mode verified in Storybook
- [ ] Focus ring visible on keyboard navigation
- [ ] Contrast ratios checked for both themes
- [ ] Component exported from `src/components/index.ts`
- [ ] Types exported alongside component
- [ ] Stories cover all variants + states + dark mode
