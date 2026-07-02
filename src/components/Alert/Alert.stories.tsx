import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    icon: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    title: 'Heads up',
    description: 'This is an informational alert with a short description.',
    icon: true,
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Alert>;

const stack = { display: 'flex', flexDirection: 'column' as const, gap: 16, width: 480 };

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={stack}>
      <Alert variant="info" title="Information" description="A neutral, informational message." />
      <Alert variant="success" title="Success" description="Your changes have been saved." />
      <Alert variant="warning" title="Warning" description="Your subscription expires soon." />
      <Alert variant="error" title="Error" description="Something went wrong. Try again." />
    </div>
  ),
};

export const WithClose: Story = {
  render: () => (
    <div style={stack}>
      <Alert variant="success" title="Saved" description="Changes saved successfully." onClose={() => {}} />
      <Alert variant="error" title="Upload failed" description="The file exceeds the size limit." onClose={() => {}} />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div style={stack}>
      <Alert variant="info" title="No icon" description="This alert has its icon disabled." icon={false} />
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div style={stack}>
      <Alert variant="warning" title="Your session will expire in 5 minutes." onClose={() => {}} />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'info',
    title: 'Alert title',
    description: 'Alert description goes here.',
    icon: true,
  },
  render: (args) => <Alert {...args} onClose={() => {}} />,
};
