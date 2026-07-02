import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { SearchIcon, FileIcon } from '../icons';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'No courses found',
    description: "Try adjusting your search or filters to find what you're looking for.",
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

export const Default: Story = {
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const WithAction: Story = {
  args: {
    action: (
      <button
        style={{
          background: 'var(--packt-orange-500)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 20px',
          cursor: 'pointer',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Browse Courses
      </button>
    ),
  },
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const SearchEmpty: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No results for "quantum computing"',
    description: 'Check for typos or try a different search term.',
  },
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const NoFiles: Story = {
  args: {
    icon: <FileIcon />,
    title: 'No files uploaded yet',
    description: 'Upload your first file to get started.',
  },
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};

export const Playground: Story = {
  decorators: [(Story) => <div style={wrapper}><Story /></div>],
};
