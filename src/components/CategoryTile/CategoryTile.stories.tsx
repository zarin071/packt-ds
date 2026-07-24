import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CategoryTile } from './CategoryTile';
import { BookIcon, PlayIcon, HeadphonesIcon, FileIcon, SearchIcon, InboxIcon } from '../../lib/icons';

const meta: Meta<typeof CategoryTile> = {
  title: 'molecules/CategoryTile',
  component: CategoryTile,
  parameters: { layout: 'centered' },
  argTypes: {
    icon: { control: false },
    productCount: { control: { type: 'number', min: 0 } },
  },
  args: { icon: <BookIcon />, name: 'Web Development', productCount: 1240, href: '#web-dev' },
};

export default meta;
type Story = StoryObj<typeof CategoryTile>;

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 200px)',
  gap: 16,
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <CategoryTile {...args} />
    </div>
  ),
};

export const HubContexts: Story = {
  name: 'Hub contexts',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={grid}>
      <CategoryTile icon={<BookIcon />} name="Web Development" productCount={1240} href="#web" />
      <CategoryTile icon={<FileIcon />} name="Data & AI" productCount={980} href="#data" />
      <CategoryTile icon={<SearchIcon />} name="Security" productCount={430} href="#security" />
      <CategoryTile icon={<PlayIcon />} name="Video Courses" productCount={612} href="#video" />
      <CategoryTile icon={<HeadphonesIcon />} name="Audiobooks" productCount={88} href="#audio" />
      <CategoryTile icon={<InboxIcon />} name="Cloud & DevOps" productCount={1} href="#cloud" />
    </div>
  ),
};
