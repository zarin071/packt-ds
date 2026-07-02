# 05 — Accessibility Rules
# WCAG 2.2 AA requirements applied per component category

These are build constraints, not optional additions.
Claude must apply every relevant rule when generating a component.

---

## Global rules (every component)

### Focus management
```tsx
// Every interactive element must have a visible focus ring
// Use the design token, never hardcode
':focus-visible': {
  outline: '2px solid var(--border-brand-default)',
  outlineOffset: '2px',
}

// Never do this
':focus': { outline: 'none' }
':focus-visible': { outline: 'none' }
```

### Colour alone
Never communicate state, status, or information using colour alone.
Always pair with one of: icon, text label, pattern, border change.

```tsx
// Wrong — error only shown by red border
<input style={{ border: '1px solid red' }} />

// Correct — error shown by border + icon + text
<div>
  <input aria-invalid="true" aria-describedby="error-msg" />
  <span id="error-msg" role="alert">
    <ErrorIcon aria-hidden="true" />
    This field is required
  </span>
</div>
```

### Touch targets
Minimum interactive area: 44 × 44px.
For visually smaller elements, use padding to meet the minimum.

```css
.pds-icon-button {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Include this in the global token stylesheet, not per-component.

---

## Interactive element rules

### Buttons
```tsx
// Always render as <button>, never <div> or <span>
<button
  type="button"             // always explicit — prevents form submission
  disabled={disabled}       // native disabled, not just visual
  aria-busy={loading}
  aria-label={iconOnly ? label : undefined}  // required for icon-only
>
```

Keyboard: Enter and Space both activate. These are native to `<button>`.

### Links
```tsx
// Use <a> for navigation, <button> for actions
// Never use <a> without href
<a href="/path">Navigate somewhere</a>
<button onClick={doSomething}>Do something</button>

// External links
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  External site <span aria-hidden="true">↗</span>
  <span className="sr-only">(opens in new tab)</span>
</a>
```

---

## Form element rules

### Input
```tsx
<div>
  <label htmlFor={id}>          {/* always visible, never placeholder-only */}
    {label}
    {required && <span aria-hidden="true"> *</span>}
    {required && <span className="sr-only"> (required)</span>}
  </label>

  {helperText && (
    <p id={`${id}-helper`}>{helperText}</p>
  )}

  <input
    id={id}
    aria-required={required}
    aria-invalid={!!error}
    aria-describedby={[
      helperText && `${id}-helper`,
      error && `${id}-error`,
    ].filter(Boolean).join(' ')}
  />

  {error && (
    <p id={`${id}-error`} role="alert" aria-live="polite">
      <ErrorIcon aria-hidden="true" />
      {error}
    </p>
  )}
</div>
```

### Select / Combobox
- Use Radix UI Select primitive — it handles ARIA automatically
- Arrow key navigation is handled by Radix
- Escape closes the dropdown
- All options must be keyboard-reachable

---

## Overlay rules (Modal, Drawer, Popover, Tooltip)

### Focus trap
All modal overlays must trap focus. Use `@radix-ui/react-dialog` or a focus-trap library.

```tsx
// Focus must:
// 1. Move to the dialog when it opens
// 2. Stay inside the dialog while it's open (Tab cycles within)
// 3. Return to the trigger when it closes
```

### Escape key
All overlays close on Escape. No exceptions.

### Click outside
- Non-destructive overlays: close on click outside
- Destructive action dialogs: do NOT close on click outside (user must explicitly confirm or cancel)

### ARIA for overlays
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={descriptionId}
>
  <h2 id={titleId}>{title}</h2>
  <p id={descriptionId}>{description}</p>
</div>
```

For destructive confirmations:
```tsx
role="alertdialog"
```

---

## Navigation rules

### Active state
```tsx
<a
  href="/current-page"
  aria-current="page"    // not class="active" alone
>
  Current page
</a>
```

### Skip link (required at page level, not component level)
```html
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Keyboard: tab order
Tab order must match visual order.
Never use `tabIndex` values greater than 0.

---

## Screen reader utility classes

Include in the global stylesheet:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Use `.sr-only` for text that should be announced but not visible.
Do not use `display: none` or `visibility: hidden` for this — those hide from screen readers too.

---

## ARIA rules summary

| Situation | Required attribute |
|-----------|-------------------|
| Disabled interactive element | `aria-disabled="true"` |
| Loading state | `aria-busy="true"` |
| Expanded dropdown | `aria-expanded="true/false"` |
| Active nav item | `aria-current="page"` |
| Invalid input | `aria-invalid="true"` |
| Error message for input | `aria-describedby` pointing to error element |
| Icon-only button | `aria-label="[action description]"` |
| Decorative icon | `aria-hidden="true"` |
| Live region (toast, alert) | `aria-live="polite"` or `role="alert"` |
| Dialog | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |

---

## Testing accessibility

Every component test must include:

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Also test manually with:
1. Keyboard-only navigation (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys)
2. Screen reader (VoiceOver on Mac, NVDA on Windows)
3. 200% browser zoom (content must not overflow or overlap)
4. `prefers-reduced-motion` (toggle in browser DevTools)
