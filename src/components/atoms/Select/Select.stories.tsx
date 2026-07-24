import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'atoms/Select',
  component: Select,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Framework',
    placeholder: 'Choose a framework…',
    options: sampleOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const col: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  fontFamily: 'Outfit, sans-serif',
  width: 280,
};

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <Select {...args} size="sm" label="Small" />
      <Select {...args} size="md" label="Medium" />
      <Select {...args} size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <Select {...args} label="Default" helperText="Helper text goes here" />
      <Select {...args} label="Error" error="Please select a framework" />
      <Select {...args} label="Disabled" disabled />
      <Select {...args} label="Required" required />
    </div>
  ),
};
