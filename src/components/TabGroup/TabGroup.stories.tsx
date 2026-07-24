import type { Meta, StoryObj } from '@storybook/react';
import { TabGroup } from './TabGroup';
import { BookIcon, PlayIcon, HeadphonesIcon } from '../../lib/icons';

const meta: Meta<typeof TabGroup> = {
  title: 'molecules/TabGroup',
  component: TabGroup,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

const catalogueItems = [
  { value: 'books', label: 'Books', icon: <BookIcon />, content: 'Browse 8,000+ programming books.' },
  { value: 'videos', label: 'Videos', icon: <PlayIcon />, content: 'Hands-on video courses for every level.' },
  { value: 'audiobooks', label: 'Audiobooks', icon: <HeadphonesIcon />, content: 'Listen on the go with our audiobook library.' },
];

export const Playground: Story = {
  args: { items: catalogueItems, label: 'Content type' },
  argTypes: { items: { control: false } },
  render: (args) => (
    <div style={{ width: 520 }}>
      <TabGroup {...args} />
    </div>
  ),
};

export const TablistOnly: Story = {
  name: 'Tablist only',
  parameters: { controls: { disable: true } },
  render: () => (
    <TabGroup
      label="Content type"
      items={[
        { value: 'books', label: 'Books', icon: <BookIcon /> },
        { value: 'videos', label: 'Videos', icon: <PlayIcon /> },
        { value: 'audiobooks', label: 'Audiobooks', icon: <HeadphonesIcon /> },
      ]}
    />
  ),
};
