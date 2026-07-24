import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { AuthModal } from './AuthModal';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof AuthModal> = {
  title: 'organisms/AuthModal',
  component: AuthModal,
  parameters: { layout: 'centered' },
  argTypes: { open: { control: false }, onOpenChange: { control: false } },
  args: { onSubmit: fn() },
};

export default meta;
type Story = StoryObj<typeof AuthModal>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Sign up
        </Button>
        <AuthModal {...args} open={open} onOpenChange={setOpen} />
      </>
    );
  },
};
