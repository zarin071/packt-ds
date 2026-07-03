# 06 — Design Principles
# Packt DS — The WHY behind every decision

When Claude generates a component, these principles are constraints.
Not suggestions. Every generated output must comply.

---

## Principle 1 — Headless-first

**What it means:**
Components ship with zero default visual opinions.
Structure, behaviour, and accessibility are built in.
All visual styling flows through tokens.

**What Claude must do:**
- Never hardcode a hex value inside a component
- Never hardcode a font size, weight, or family
- Never hardcode a spacing value (padding, margin, gap)
- Every visual property must reference a CSS custom property

**Correct:**
```tsx
<button style={{ background: 'var(--bg-brand-selected)' }}>
```

**Wrong:**
```tsx
<button style={{ background: '#f97141' }}>
```

---

## Principle 2 — Token-driven

**What it means:**
If a value appears twice in the codebase without a token, it is a bug.

**Token hierarchy Claude must follow:**
```
Raw hex → Primitive token → Semantic token → Component token
#f97141 → Orange/500    → Brand/bg-selected → button-bg-primary
```

**Rules:**
- Components consume semantic tokens, not primitives
- Semantic tokens reference primitives, not raw hex
- Component tokens reference semantic tokens, not primitives or hex
- Theming happens by redefining semantic tokens — not by editing components

---

## Principle 3 — Accessibility by default

**What it means:**
WCAG 2.2 Level AA is a build constraint, not a review-stage checklist.

**What Claude must always include:**
- Keyboard navigation (Tab, Enter, Space, Escape, Arrow keys where relevant)
- Focus ring using `--border-brand-default` at `Width.M` (2px)
- ARIA roles, labels, and states on every interactive element
- `aria-disabled` instead of just `disabled` attribute where appropriate
- Reduced motion support via `prefers-reduced-motion`

**What Claude must never do:**
- Use `outline: none` without a replacement focus style
- Communicate state or information using colour alone
- Render interactive elements as non-semantic HTML (`div`, `span` with onClick)

---

## Principle 4 — Hub-aware

**What it means:**
Packt has three surfaces — Main, Learning Hub, Newsletter Hub.
Each has its own colour identity. Components must support all three
without forking component logic.

**Hub colour map:**
```
Main site  → Brand tokens    (Orange — #f97141)
Learning   → Hub-Learn tokens (Teal — #1a9e92)
Newsletter → Hub-News tokens  (Violet — #6554e6)
```

**Implementation rule:**
Hub context is set at the application level via a `data-hub` attribute
on a parent container. Components never receive a `hub` prop directly
for visual styling — they respond to the CSS variable scope.

```html
<div data-hub="learn">  <!-- all children pick up teal semantics -->
<div data-hub="news">   <!-- all children pick up violet semantics -->
```

**Exception:**
Storybook preview stories may use an explicit `hub` prop for side-by-side comparison.
This prop is documented as "preview only" and must not be used in production code.

---

## Principle 5 — Composition over coverage

**What it means:**
Build fewer, more composable components rather than many rigid
one-purpose components.

**Rules:**
- A component that has more than 3 boolean props for toggling visual
  sub-elements should expose slots (children/render props) instead
- Icon slots use instance-swap in Figma and `ReactNode` in code
- Never bake text content into a component — always expose it as a prop

**Correct:**
```tsx
<Button leadingIcon={<SearchIcon />} trailingIcon={<ChevronIcon />}>
  Search
</Button>
```

**Wrong:**
```tsx
<SearchButton showChevron={true} />
```

---

## Principle 6 — Naming consistency

**What it means:**
The same concept has the same name in Figma, CSS, TypeScript, and Storybook.
No translation layer between design and code.

**Naming convention:**
```
Figma variable:  Hub-Learn/bg-selected
CSS custom prop: --hub-learn-bg-selected
TypeScript prop: hubLearnBgSelected (camelCase)
Storybook arg:   hubLearnBgSelected
```

**Component prop naming:**
```
variant   — not type, kind, style, mode
size      — not scale, density (unless density has a specific meaning)
disabled  — not isDisabled (exception: Radix Primitives uses isDisabled; match it)
loading   — not isLoading
```
