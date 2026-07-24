import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import { ChevronRightIcon, FileIcon, InfoIcon } from '../icons';
import { Badge } from '../Badge';
import { iconArgType } from '../story-helpers';

const meta: Meta<typeof ListItem> = {
  title: 'components/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    selected: { control: 'boolean' },
    interactive: { control: 'boolean' },
    icon: iconArgType('md'),
  },
  args: { title: 'Getting started with React', description: 'Section 1 · 12 lessons', icon: 'none' },
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

export const Playground: Story = {
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} />
    </ul>
  ),
};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} icon={<FileIcon />} />
      <ListItem {...args} title="Course curriculum" icon={<InfoIcon />} />
    </ul>
  ),
};

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} action={<ChevronRightIcon />} interactive />
      <ListItem {...args} title="Pro course" action={<Badge variant="brand">Pro</Badge>} interactive />
    </ul>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <ul style={listStyle}>
      <ListItem {...args} title="Default item" interactive />
      <ListItem {...args} title="Selected item" selected interactive />
      <ListItem {...args} title="Item with icon" icon={<FileIcon />} interactive />
    </ul>
  ),
};
