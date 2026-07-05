import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'away'] },
    initials: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  args: { size: 'medium', initials: 'JD' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Avatar {...args} size="small" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="large" />
    </div>
  ),
};

export const Fallbacks: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Avatar {...args} initials="AB" size="large" />
      <Avatar {...args} initials={undefined} size="large" />
    </div>
  ),
};

export const WithStatus: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Avatar {...args} status="online" />
      <Avatar {...args} status="away" />
      <Avatar {...args} status="offline" />
    </div>
  ),
};
