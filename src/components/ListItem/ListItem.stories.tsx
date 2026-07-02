import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import { ChevronRightIcon, FileIcon, InfoIcon } from '../icons';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    selected: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
  args: { title: 'Getting started with React', description: 'Section 1 · 12 lessons' },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

const listStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  width: 400,
  fontFamily: 'Outfit, sans-serif',
  border: '1px solid var(--packt-neutral-200)',
  borderRadius: 8,
  overflow: 'hidden',
};

export const Default: Story = {
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} />
    </ul>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} icon={<FileIcon />} />
      <ListItem {...args} title="Course curriculum" icon={<InfoIcon />} />
    </ul>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} action={<ChevronRightIcon />} interactive />
      <ListItem {...args} title="Pro course" action={<Badge variant="brand">Pro</Badge>} interactive />
    </ul>
  ),
};

export const States: Story = {
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} title="Default item" interactive />
      <ListItem {...args} title="Selected item" selected interactive />
      <ListItem {...args} title="Item with icon" icon={<FileIcon />} interactive />
    </ul>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} />
    </ul>
  ),
};
