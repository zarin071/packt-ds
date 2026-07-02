import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleSwitch } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Enable notifications', size: 'medium' },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Outfit, sans-serif' };
const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 24, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={col}>
      <ToggleSwitch {...args} size="small" label="Small" />
      <ToggleSwitch {...args} size="medium" label="Medium" />
      <ToggleSwitch {...args} size="large" label="Large" />
    </div>
  ),
};

export const States: Story = {
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
  args: { label: undefined },
  render: (args) => (
    <div style={row}>
      <ToggleSwitch {...args} size="small" />
      <ToggleSwitch {...args} size="medium" />
      <ToggleSwitch {...args} size="large" />
    </div>
  ),
};

export const Playground: Story = {};
