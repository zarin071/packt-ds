import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'away'] },
    initials: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  args: { size: 'md', initials: 'JD', alt: 'Jane Doe' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};

export const Fallbacks: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Avatar {...args} initials="AB" alt="Ada Byron" size="lg" />
      <Avatar {...args} initials={undefined} alt="Unknown user" size="lg" />
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
