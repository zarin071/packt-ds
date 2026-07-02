import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Molecules/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'select', options: ['text', 'password', 'search', 'email'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

const stack = { display: 'flex', flexDirection: 'column' as const, gap: 20, width: 320 };

export const Default: Story = {};

export const Types: Story = {
  render: () => (
    <div style={stack}>
      <Input label="Text" type="text" placeholder="Full name" />
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Search" type="search" placeholder="Search…" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={stack}>
      <Input label="Small" size="small" placeholder="Small" />
      <Input label="Medium" size="medium" placeholder="Medium" />
      <Input label="Large" size="large" placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={stack}>
      <Input label="With helper" helperText="We'll never share your email." placeholder="you@example.com" />
      <Input label="Error" error="Enter a valid email address." defaultValue="not-an-email" />
      <Input label="Disabled" disabled placeholder="Disabled" />
      <Input label="Required" required placeholder="Required field" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: 'Label',
    type: 'text',
    size: 'medium',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    disabled: false,
    required: false,
  },
};
