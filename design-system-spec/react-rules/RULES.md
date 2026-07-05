# 07 — React Rules
# Standards Claude must follow when generating React components for Packt DS

---

## File structure (per component)

Every component lives in its own folder:

```
src/components/ComponentName/
├── ComponentName.tsx          ← component implementation + cva variants
├── ComponentName.types.ts     ← TypeScript types and interfaces (if props are non-trivial)
├── ComponentName.test.tsx     ← unit + accessibility tests
├── ComponentName.stories.tsx  ← Storybook stories
├── ComponentName.mdx          ← Storybook documentation page
└── index.ts                   ← barrel export
```

There is no `.css.ts` or CSS Module file — styling is Tailwind utility classes driven by `cva`, defined directly in `ComponentName.tsx`. Skip `ComponentName.types.ts` for components with only one or two simple props; define the props interface inline in `ComponentName.tsx` instead.

`index.ts` contents:
```ts
export { ComponentName, componentNameVariants } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

---

## Component template

Claude must use this structure for every component — `cva` for variants, `forwardRef` always, Radix primitives where they add real accessibility value (Slot for `asChild`, Label, Select, Dialog, etc. — not for components plain semantic HTML already handles correctly):

```tsx
// ComponentName.tsx
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { ComponentNameProps } from './ComponentName.types';

export const componentNameVariants = cva(
  'base classes here — layout, transitions, focus-visible ring',
  {
    variants: {
      variant: {
        primary: 'bg-brand-bg-selected text-brand-text-on-brand',
        secondary: 'bg-brand-bg-default text-brand-text-default border-brand-border-default',
      },
      size: {
        sm: 'h-8 px-s text-sm',
        md: 'h-10 px-m text-sm',
        lg: 'h-12 px-l text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentNameVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </element>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

**Rules:**
- Always use `React.forwardRef` — consumers need ref access for focus management
- Always define variants with `cva`; never branch className with string concatenation or template literals
- Always merge classNames with the `cn()` helper (`src/lib/utils.ts` — `clsx` + `tailwind-merge`), so a consumer's `className` prop can override a variant's Tailwind classes without specificity fights
- Always spread `...props` to allow aria-* and data-* pass-through
- Always set `displayName` for React DevTools
- Export the `cva` variants function (e.g. `buttonVariants`) alongside the component — other components or consumers may need to reuse the same visual variants (e.g. a link styled like a button)

---

## Radix primitives and the `asChild` pattern

Reach for a Radix primitive only when it removes real accessibility/behavior work — keyboard navigation, focus trapping, portal + positioning, or correct ARIA wiring that plain HTML doesn't give you for free (Label, Select, Dialog, Tooltip, Popover, RadioGroup). Don't wrap a primitive around something a native element already handles correctly (a plain `<button>` doesn't need a Radix wrapper).

Where a component supports rendering as a different element/component (e.g. a router `<Link>` styled as a `Button`), add an `asChild` prop backed by `@radix-ui/react-slot`:

```tsx
import { Slot } from '@radix-ui/react-slot';

const Comp = asChild ? Slot : 'button';

return (
  <Comp className={cn(componentNameVariants({ variant, size }), className)} {...props}>
    {children}
  </Comp>
);
```

`Slot` requires exactly one child element. When `asChild` is true, don't also try to inject sibling icon/spinner markup — pass `children` straight through and let the consumer compose icons into their own child.

---

## TypeScript rules

```ts
// ComponentName.types.ts

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLElement> {    // extend the correct HTML type
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  // hub prop is Storybook-preview only — document it
  /** @preview-only Do not use in production. Use data-hub on a parent container. */
  hub?: 'brand' | 'learn' | 'news';
}
```

**Rules:**
- Every prop must have a JSDoc comment if its purpose isn't self-evident
- Extend the correct native HTML element type (not just `React.HTMLAttributes<HTMLElement>`)
- Union types for variant/size (never `string` alone)
- Optional props have `?` — never use `| undefined` explicitly
- Default values are set in the destructured parameters, not as separate `defaultProps`

---

## Styling — Tailwind token utilities

Never hardcode a colour, hex value, or `rgba()` in a component — not in a className string, not in an inline `style` object. Use the Tailwind utilities that are already wired to design tokens via `src/styles/tailwind.css` (which itself reads the theme-aware aliases in `src/tokens/tokens.theme.css` — see `docs/TOKEN-PIPELINE.md`):

```tsx
// Correct — Tailwind utilities backed by tokens, theme-aware automatically
<div className="bg-brand-bg-selected text-brand-text-on-brand rounded-l p-m" />

// Wrong — hardcoded, breaks theming and Figma↔code sync
<div style={{ background: '#f97141', borderRadius: 16 }} />
<div className="bg-[#f97141]" />
```

If a token you need isn't mapped into the Tailwind theme yet, add it to `src/styles/tailwind.css` (and to `src/tokens/tokens.theme.css` first, if it needs a light/dark alias) rather than reaching for an arbitrary hex value. Non-color dimensions without a named token (e.g. component heights) may use Tailwind's default numeric scale (`h-10`, `gap-2`, etc.) — the "never hardcode" rule is specifically about colour.

---

## Prop defaults

Set defaults in destructuring, not in separate `defaultProps`:

```tsx
// Correct
const Button = ({ variant = 'primary', size = 'md', disabled = false, ...props }) => {

// Wrong
Button.defaultProps = { variant: 'primary' };
```

---

## Event handler naming

```tsx
// Correct — standard React convention
onClick, onChange, onFocus, onBlur, onKeyDown

// Wrong — custom naming
handleClick, onPress, onActivate
```

---

## Accessibility requirements (mandatory in every component)

Generated components must include:

```tsx
// Focus management
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') handleAction();
  if (e.key === 'Escape') handleClose();
}}

// ARIA state
aria-disabled={disabled}
aria-busy={loading}
aria-expanded={isOpen}  // where applicable
aria-current="page"     // for active navigation items

// Role — only when semantic HTML is not available
role="button"           // only if not using <button>
```

**Never use:**
```tsx
// Wrong — div with onClick but no keyboard handling
<div onClick={handleClick}>Click me</div>

// Wrong — missing role
<span onClick={handleClick}>Click me</span>
```

---

## Loading state pattern

```tsx
{loading && (
  <svg
    className="animate-spin"
    role="status"
    aria-label="Loading"
    aria-live="polite"
    {...spinnerSvgProps}
  />
)}
```

Use Tailwind's built-in `animate-spin` utility rather than a hand-written `@keyframes` block.

When loading is true:
- Lock the width (prevent layout shift)
- Add `aria-busy="true"` to the component root
- Update `aria-label` to include "loading" context

---

## Icon slot pattern

```tsx
interface ButtonProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

// Usage
<button>
  {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
  {children}
  {trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
</button>
```

For a standalone sized icon (not inline in a button), use the `Icon` atom (`src/components/Icon`) — it sizes an SVG child via Tailwind's `size-*` utilities and applies `aria-hidden` for you.

Icons inside buttons are always `aria-hidden="true"` — the button label provides the accessible name.
Icon-only buttons must have `aria-label` on the button element itself.

---

## Test requirements

Every component test file must cover:

```tsx
describe('ComponentName', () => {
  // 1. Renders without crashing
  it('renders', () => { ... });

  // 2. All variants render correctly
  it('renders primary variant', () => { ... });
  it('renders secondary variant', () => { ... });

  // 3. Disabled state
  it('does not fire onClick when disabled', () => { ... });

  // 4. Loading state
  it('shows loading indicator and sets aria-busy', () => { ... });

  // 5. Keyboard interaction
  it('activates on Enter key', () => { ... });
  it('activates on Space key', () => { ... });

  // 6. Ref forwarding
  it('forwards ref to the underlying element', () => { ... });

  // 7. Accessibility
  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

Use `@testing-library/react` and `jest-axe`.

---

## Exports

`src/index.ts` (package root barrel):
```ts
// Components
export { Button } from './components/Button';
export { Input } from './components/Input';
// ... every component

// Types
export type { ButtonProps } from './components/Button';
export type { InputProps } from './components/Input';
```

Never export internal helpers, hooks, or utilities through the root barrel unless they are intended for public consumption.
