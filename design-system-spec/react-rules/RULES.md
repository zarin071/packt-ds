# 07 — React Rules
# Standards Claude must follow when generating React components for Packt DS

---

## File structure (per component)

Every component lives in its own folder:

```
src/components/ComponentName/
├── ComponentName.tsx          ← component implementation
├── ComponentName.types.ts     ← TypeScript types and interfaces
├── ComponentName.css.ts       ← CSS custom property mappings (if needed)
├── ComponentName.test.tsx     ← unit + accessibility tests
├── ComponentName.stories.tsx  ← Storybook stories
├── ComponentName.mdx          ← Storybook documentation page
└── index.ts                   ← barrel export
```

`index.ts` contents:
```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

---

## Component template

Claude must use this structure for every component:

```tsx
// ComponentName.tsx
import React from 'react';
import type { ComponentNameProps } from './ComponentName.types';

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={['pds-component-name', className].filter(Boolean).join(' ')}
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
- Always prefix class names with `pds-` (Packt DS namespace)
- Always spread `...props` to allow aria-* and data-* pass-through
- Always set `displayName` for React DevTools

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

## CSS custom property usage

Never import CSS files that hard-code values. Reference variables:

```tsx
// Correct — CSS vars from tokens
const style = {
  background: 'var(--bg-brand-selected)',
  color: 'var(--content-selected)',
  borderRadius: 'var(--radius-l)',
  padding: 'var(--space-m) var(--space-xl)',
};

// Wrong — hardcoded
const style = {
  background: '#f97141',
  borderRadius: '16px',
};
```

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
  <span
    className="pds-spinner"
    role="status"
    aria-label="Loading"
    aria-live="polite"
  />
)}
```

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
  {leadingIcon && (
    <span className="pds-button__icon pds-button__icon--leading" aria-hidden="true">
      {leadingIcon}
    </span>
  )}
  <span className="pds-button__label">{children}</span>
  {trailingIcon && (
    <span className="pds-button__icon pds-button__icon--trailing" aria-hidden="true">
      {trailingIcon}
    </span>
  )}
</button>
```

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
