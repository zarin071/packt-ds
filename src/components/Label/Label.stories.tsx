import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input';

const meta: Meta<typeof Label> = {
  title: 'components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  argTypes: {
    required: { control: 'boolean' },
  },
  args: { children: 'Email address' },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {};

export const Required: Story = {
  parameters: { controls: { disable: true } },
  args: { required: true },
};

export const WithInput: Story = {
  name: 'With Input',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
      <Label htmlFor="email-field" required>
        Email address
      </Label>
      <Input id="email-field" type="email" placeholder="you@example.com" />
    </div>
  ),
};
