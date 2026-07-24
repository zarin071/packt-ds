import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleSwitch } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'atoms/ToggleSwitch',
  component: ToggleSwitch,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Enable notifications', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Outfit, sans-serif' };
const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 24, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <ToggleSwitch {...args} size="sm" label="Small" />
      <ToggleSwitch {...args} size="md" label="Medium" />
      <ToggleSwitch {...args} size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <ToggleSwitch {...args} label="Off (default)" />
      <ToggleSwitch {...args} label="On (checked)" defaultChecked />
      <ToggleSwitch {...args} label="Disabled off" disabled />
      <ToggleSwitch {...args} label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const NoLabel: Story = {
  parameters: { controls: { disable: true } },
  args: { label: undefined },
  render: (args) => (
    <div style={row}>
      <ToggleSwitch {...args} size="sm" />
      <ToggleSwitch {...args} size="md" />
      <ToggleSwitch {...args} size="lg" />
    </div>
  ),
};
