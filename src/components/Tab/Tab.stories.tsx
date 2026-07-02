import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { InfoIcon, SearchIcon, FileIcon } from '../icons';

const items = [
  { key: 'overview', label: 'Overview' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'disabled', label: 'Disabled', disabled: true },
];

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'brand'] },
  },
  args: { items, variant: 'default' },
};

export default meta;
type Story = StoryObj<typeof Tab>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={col}>
      <Tab {...args} variant="default" />
      <Tab {...args} variant="brand" />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: [
      { key: 'overview', label: 'Overview', icon: <InfoIcon /> },
      { key: 'search', label: 'Search', icon: <SearchIcon /> },
      { key: 'files', label: 'Files', icon: <FileIcon /> },
    ],
    variant: 'brand',
  },
};

export const Playground: Story = {};
