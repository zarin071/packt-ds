import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { CheckIcon } from '../icons';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'brand', 'info', 'success', 'warning', 'error'] },
    children: { control: 'text' },
  },
  args: { children: 'New', variant: 'brand' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="brand">Brand</Badge>
      <Badge {...args} variant="info">Info</Badge>
      <Badge {...args} variant="success">Success</Badge>
      <Badge {...args} variant="warning">Warning</Badge>
      <Badge {...args} variant="error">Error</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div style={row}>
      <Badge {...args} variant="success" icon={<CheckIcon />}>Verified</Badge>
      <Badge {...args} variant="brand" icon={<CheckIcon />}>New</Badge>
    </div>
  ),
};

export const Playground: Story = {};
