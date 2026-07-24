import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { IconButton } from './IconButton';
import { CloseIcon, SearchIcon, ChevronLeftIcon } from '../../../lib/icons';
import { iconArgType } from '../../../lib/story-helpers';

const meta: Meta<typeof IconButton> = {
  title: 'atoms/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'secondary', 'primary', 'danger'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: iconArgType('md'),
  },
  args: { 'aria-label': 'Search', icon: 'search', variant: 'ghost', onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      <IconButton aria-label="Search" icon={<SearchIcon />} variant="ghost" />
      <IconButton aria-label="Search" icon={<SearchIcon />} variant="secondary" />
      <IconButton aria-label="Search" icon={<SearchIcon />} variant="primary" />
      <IconButton aria-label="Delete" icon={<CloseIcon />} variant="danger" />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      <IconButton aria-label="Go back" icon={<ChevronLeftIcon />} variant="secondary" />
      <IconButton aria-label="Close" icon={<CloseIcon />} variant="secondary" disabled />
      <IconButton aria-label="Loading" icon={<SearchIcon />} variant="secondary" loading />
    </div>
  ),
};
