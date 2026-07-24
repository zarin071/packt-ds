import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'atoms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'text' },
    checked: { control: 'boolean' },
  },
  args: { label: 'Accept terms and conditions' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {
  args: { label: 'Playground checkbox', disabled: false, indeterminate: false },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Disabled unchecked" disabled />
      <Checkbox {...args} label="Disabled checked" disabled defaultChecked />
      <Checkbox {...args} label="Error state" error="This field is required" />
    </div>
  ),
};

export const NoLabel: Story = {
  parameters: { controls: { disable: true } },
  args: { label: undefined },
};
