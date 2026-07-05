import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Label } from '../Label';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'you@example.com', type: 'email' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

const stack = { display: 'flex', flexDirection: 'column' as const, gap: 20, width: 320 };
const field = { display: 'flex', flexDirection: 'column' as const, gap: 6 };

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={stack}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={stack}>
      <div style={field}>
        <Label htmlFor="input-default">Default</Label>
        <Input id="input-default" placeholder="you@example.com" />
      </div>
      <div style={field}>
        <Label htmlFor="input-error" required>
          Error
        </Label>
        <Input id="input-error" error defaultValue="not-an-email" />
      </div>
      <div style={field}>
        <Label htmlFor="input-disabled">Disabled</Label>
        <Input id="input-disabled" disabled placeholder="Disabled" />
      </div>
    </div>
  ),
};
