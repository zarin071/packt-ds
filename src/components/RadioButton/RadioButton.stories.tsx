import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: { label: 'Option A', name: 'demo' },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={col}>
      <RadioButton {...args} label="Unchecked" />
      <RadioButton {...args} label="Checked" defaultChecked />
      <RadioButton {...args} label="Disabled" disabled />
      <RadioButton {...args} label="Disabled checked" disabled defaultChecked />
      <RadioButton {...args} label="Error" error="Please select an option" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={col}>
      <RadioButton name="group" value="a" label="Option A" defaultChecked />
      <RadioButton name="group" value="b" label="Option B" />
      <RadioButton name="group" value="c" label="Option C" />
    </div>
  ),
};

export const Playground: Story = {
  args: { label: 'Playground radio', disabled: false },
};
