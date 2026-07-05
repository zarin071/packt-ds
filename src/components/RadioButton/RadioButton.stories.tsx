import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'components/RadioButton',
  component: RadioButton,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    value: { control: 'text' },
  },
  args: { label: 'Option A', value: 'a' },
  decorators: [
    (Story) => (
      <RadioGroup.Root defaultValue="a" name="demo">
        <Story />
      </RadioGroup.Root>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {
  args: { label: 'Playground radio', disabled: false },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={col}>
      <RadioGroup.Root defaultValue="checked" name="states-a">
        <RadioButton value="unchecked" label="Unchecked" />
        <RadioButton value="checked" label="Checked" />
      </RadioGroup.Root>
      <RadioGroup.Root defaultValue="disabled-checked" name="states-b">
        <RadioButton value="disabled" label="Disabled" disabled />
        <RadioButton value="disabled-checked" label="Disabled checked" disabled />
      </RadioGroup.Root>
      <RadioGroup.Root name="states-c">
        <RadioButton value="error" label="Error" error="Please select an option" />
      </RadioGroup.Root>
    </div>
  ),
};

export const Group: Story = {
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <RadioGroup.Root defaultValue="a" name="group">
        <Story />
      </RadioGroup.Root>
    ),
  ],
  render: () => (
    <div style={col}>
      <RadioButton value="a" label="Option A" />
      <RadioButton value="b" label="Option B" />
      <RadioButton value="c" label="Option C" />
    </div>
  ),
};
