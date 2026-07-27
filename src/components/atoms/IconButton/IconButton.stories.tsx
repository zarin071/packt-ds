import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { IconButton } from './IconButton';
import { Badge } from '../Badge/Badge';
import { BellIcon, CloseIcon, SearchIcon, ChevronLeftIcon } from '../../../lib/icons';
import { iconArgType } from '../../../lib/story-helpers';
import type { IconButtonVariant } from './IconButton.types';

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

export const WithInstancePlayground: Story = {
  args: { icon: 'bell' as unknown as ReactNode, variant: 'ghost' },
  render: (args) => (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: -8 }}>
        <IconButton {...args} />
      </div>
      <Badge variant="brand">1</Badge>
    </div>
  ),
};

const ICON_BUTTON_VARIANTS: IconButtonVariant[] = ['ghost', 'secondary', 'primary', 'danger'];

export const WithInstance: Story = {
  name: 'With instance — badge on icon button',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', fontFamily: 'Outfit, sans-serif' }}>
      {ICON_BUTTON_VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
            <div style={{ marginRight: -8 }}>
              <IconButton aria-label="Notifications" icon={<BellIcon />} variant={v} />
            </div>
            <Badge variant="brand">1</Badge>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
            <div style={{ marginRight: -8 }}>
              <IconButton aria-label="Notifications" icon={<BellIcon />} variant={v} />
            </div>
            <Badge variant="brand" dot />
          </div>
          <span style={{ fontSize: 10, color: 'var(--packt-content-tertiary)' }}>{v}</span>
        </div>
      ))}
    </div>
  ),
};
