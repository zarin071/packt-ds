import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { CountdownTimer } from './CountdownTimer';

const meta: Meta<typeof CountdownTimer> = {
  title: 'molecules/CountdownTimer',
  component: CountdownTimer,
  parameters: { layout: 'centered' },
  argTypes: {
    endsAt: { control: false },
    onExpire: { action: 'onExpire' },
  },
  args: { onExpire: fn() },
};

export default meta;
type Story = StoryObj<typeof CountdownTimer>;

const inDays = (days: number, extraSeconds = 0) =>
  new Date(Date.now() + days * 86400_000 + extraSeconds * 1000);

export const Playground: Story = {
  args: { endsAt: inDays(2, 3 * 3600 + 25 * 60 + 12) },
};

export const EndingSoon: Story = {
  name: 'Ending soon',
  parameters: { controls: { disable: true } },
  args: { endsAt: inDays(0, 65) },
};

export const AlreadyExpired: Story = {
  name: 'Already expired',
  parameters: { controls: { disable: true } },
  args: { endsAt: new Date(Date.now() - 1000) },
};
