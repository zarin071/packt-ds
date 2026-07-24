import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { SearchIcon, FileIcon } from '../icons';
import { iconArgType } from '../story-helpers';

const meta: Meta<typeof EmptyState> = {
  title: 'components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: iconArgType('lg'),
  },
  args: {
    title: 'No courses found',
    description: "Try adjusting your search or filters to find what you're looking for.",
    icon: 'none',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const wrapper: CSSProperties = {
  width: 480,
  border: '1px solid var(--packt-neutral-200)',
  borderRadius: 12,
  fontFamily: 'Outfit, sans-serif',
};

export const Playground: Story = {
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  args: {
    action: <Button variant="primary">Browse courses</Button>,
  },
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const SearchEmpty: Story = {
  parameters: { controls: { disable: true } },
  args: {
    icon: <SearchIcon />,
    title: 'No results for "quantum computing"',
    description: 'Check for typos or try a different search term.',
  },
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const NoFiles: Story = {
  parameters: { controls: { disable: true } },
  args: {
    icon: <FileIcon />,
    title: 'No files uploaded yet',
    description: 'Upload your first file to get started.',
  },
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};
