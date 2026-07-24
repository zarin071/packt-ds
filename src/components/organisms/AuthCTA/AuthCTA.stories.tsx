import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { AuthCTA } from './AuthCTA';

const meta: Meta<typeof AuthCTA> = {
  title: 'organisms/AuthCTA',
  component: AuthCTA,
  parameters: { layout: 'padded' },
  args: { onSignUp: fn(), onSignIn: fn() },
};

export default meta;
type Story = StoryObj<typeof AuthCTA>;

export const Playground: Story = {};
