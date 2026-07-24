import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormatBadge } from './FormatBadge';

const meta: Meta<typeof FormatBadge> = {
  title: 'molecules/FormatBadge',
  component: FormatBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    format: { control: 'select', options: ['ebook', 'paperback', 'video', 'audiobook'] },
  },
  args: { format: 'ebook' },
};

export default meta;
type Story = StoryObj<typeof FormatBadge>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 };

export const Playground: Story = {};

export const AllFormats: Story = {
  name: 'All formats',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      <FormatBadge format="ebook" />
      <FormatBadge format="paperback" />
      <FormatBadge format="video" />
      <FormatBadge format="audiobook" />
    </div>
  ),
};
