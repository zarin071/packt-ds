import type { Meta, StoryObj } from '@storybook/react';
import { CategoryGrid } from './CategoryGrid';
import { BookIcon, FileIcon, SearchIcon, PlayIcon, HeadphonesIcon, InboxIcon } from '../../../lib/icons';

const meta: Meta<typeof CategoryGrid> = {
  title: 'organisms/CategoryGrid',
  component: CategoryGrid,
  parameters: { layout: 'padded' },
  argTypes: { items: { control: false } },
  args: {
    heading: 'Browse by category',
    items: [
      { icon: <BookIcon />, name: 'Web Development', productCount: 1240, href: '#web' },
      { icon: <FileIcon />, name: 'Data & AI', productCount: 980, href: '#data' },
      { icon: <SearchIcon />, name: 'Security', productCount: 430, href: '#security' },
      { icon: <PlayIcon />, name: 'Video Courses', productCount: 612, href: '#video' },
      { icon: <HeadphonesIcon />, name: 'Audiobooks', productCount: 88, href: '#audio' },
      { icon: <InboxIcon />, name: 'Cloud & DevOps', productCount: 731, href: '#cloud' },
      { icon: <BookIcon />, name: 'Game Development', productCount: 264, href: '#games' },
      { icon: <FileIcon />, name: 'Mobile', productCount: 402, href: '#mobile' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof CategoryGrid>;

export const Playground: Story = {};
