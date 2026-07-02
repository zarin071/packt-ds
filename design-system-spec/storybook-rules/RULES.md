# 08 — Storybook Rules
# Standards Claude must follow when generating Storybook files for Packt DS

---

## Story file template

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'One sentence describing what this component is and does.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual weight and intent',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and padding scale',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and signals unavailability',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state — locks width, adds spinner',
    },
    hub: {
      control: 'radio',
      options: ['brand', 'learn', 'news'],
      description: 'Preview only — simulates hub colour context',
      table: {
        category: 'Preview',
        defaultValue: { summary: 'brand' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;
```

---

## Required stories per component

Every component must have these named exports:

### 1. Playground (always first)

```tsx
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
};
```

Purpose: Full controls panel. Engineers experiment here before copying usage.

### 2. AllVariants

```tsx
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="ghost">Ghost</ComponentName>
      <ComponentName variant="danger">Danger</ComponentName>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
```

### 3. AllSizes

```tsx
export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
```

### 4. States

```tsx
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <ComponentName>Default</ComponentName>
      <ComponentName disabled>Disabled</ComponentName>
      <ComponentName loading>Loading</ComponentName>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
```

### 5. HubContexts (for hub-aware components)

```tsx
export const HubContexts: Story = {
  name: 'Hub contexts',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      {(['brand', 'learn', 'news'] as const).map((hub) => (
        <div key={hub} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 80, fontSize: 11, color: '#797979' }}>{hub}</span>
          <ComponentName hub={hub} variant="primary">Button</ComponentName>
          <ComponentName hub={hub} variant="secondary">Button</ComponentName>
          <ComponentName hub={hub} variant="ghost">Button</ComponentName>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
```

### 6. LightAndDark

```tsx
export const LightAndDark: Story = {
  name: 'Light and dark',
  render: () => (
    <div style={{ display: 'flex', gap: 4 }}>
      <div style={{ background: '#ffffff', padding: '20px 24px', borderRadius: 8 }}>
        <ComponentName variant="primary">Light</ComponentName>
      </div>
      <div style={{ background: '#1e1e1e', padding: '20px 24px', borderRadius: 8 }}>
        <ComponentName variant="primary">Dark</ComponentName>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
```

---

## MDX documentation template

Every component must have a `.mdx` file using `<Meta of={Stories} />`:

```mdx
{/* ComponentName.mdx */}
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ComponentNameStories from './ComponentName.stories';

<Meta of={ComponentNameStories} />

# ComponentName

One-sentence description of what this component does and when to use it.

<Canvas of={ComponentNameStories.Playground} />
<Controls of={ComponentNameStories.Playground} />

---

## When to use

[Fill from component spec 03-component-specs/ComponentName.md]

---

## Usage rules

[Fill from component spec 03-component-specs/ComponentName.md]

---

## All states

<Canvas of={ComponentNameStories.States} />

## All variants

<Canvas of={ComponentNameStories.AllVariants} />
```

---

## Category structure in sidebar

```
Packt DS
├── Introduction
└── Developer Guide

Foundation
├── Colour
├── Typography
├── Spacing
└── Border

Components
├── Button
├── Input
├── Card
└── [every component alphabetically]

Patterns
├── Forms
├── Navigation
└── Data display
```

Title format in `meta.title`:
- `'Components/Button'` — not `'components/button'`
- `'Foundation/Colour'` — not `'foundations/Colors'`
- Singular nouns: `'Component/Badge'` not `'Components/Badges'`

---

## Story naming conventions

```tsx
export const Playground: Story = { ... };    // always Playground
export const AllVariants: Story = { name: 'All variants', ... };
export const AllSizes: Story = { name: 'All sizes', ... };
export const States: Story = { name: 'States', ... };
export const HubContexts: Story = { name: 'Hub contexts', ... };
export const LightAndDark: Story = { name: 'Light and dark', ... };
export const WithIcon: Story = { name: 'With icon', ... };
export const IconOnly: Story = { name: 'Icon only', ... };
```

- Story exports are PascalCase
- `name` overrides use sentence case
- Never: `ButtonPrimary`, `SmallButton`, `DisabledState`

---

## Parameters rules

```tsx
parameters: {
  layout: 'centered',          // default for isolated components
  // layout: 'fullscreen',     // for navigation, full-width components
  // layout: 'padded',         // for components that need breathing room
  docs: {
    story: { inline: true },   // always inline stories in docs
  },
  backgrounds: { disable: true }, // backgrounds controlled by theme toggle
}
```

Never hardcode background colours in story parameters — use the global theme decorator from `preview.ts`.
