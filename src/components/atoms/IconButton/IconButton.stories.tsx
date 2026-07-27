import type { ComponentType, CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { IconButton } from './IconButton';
import { Badge } from '../Badge/Badge';
import {
  BellIcon, SearchIcon, CloseIcon, ChevronLeftIcon, MenuIcon, UserIcon,
  BookIcon, PlayIcon, HeadphonesIcon, StarIcon, ZapIcon,
  CartIcon, InfoIcon, WarningIcon, InboxIcon,
} from '../../../lib/icons';
import { iconArgType } from '../../../lib/story-helpers';
import type { IconButtonVariant } from './IconButton.types';

type IconSize = 'sm' | 'md' | 'lg';

const INSTANCE_ICONS: Record<string, ComponentType<{ size?: IconSize; style?: CSSProperties }>> = {
  bell: BellIcon, search: SearchIcon, close: CloseIcon, menu: MenuIcon,
  user: UserIcon, book: BookIcon, play: PlayIcon, headphones: HeadphonesIcon,
  star: StarIcon, zap: ZapIcon, cart: CartIcon, info: InfoIcon,
  warning: WarningIcon, inbox: InboxIcon,
};

const ICON_COLOR_VARIANTS: Record<string, string | undefined> = {
  default: undefined,
  neutral: 'var(--packt-content-primary)',
  brand:   'var(--packt-brand-icon-default)',
  hub:     'var(--packt-hub-icon-default)',
  error:   'var(--packt-status-icon-error)',
  warning: 'var(--packt-status-icon-warning)',
  success: 'var(--packt-status-icon-success)',
  info:    'var(--packt-status-icon-info)',
};

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
  argTypes: {
    icon: { table: { disable: true } },
    iconName: { control: 'select', options: Object.keys(INSTANCE_ICONS), description: 'Icon shown in the button' },
    iconSize: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Icon size' },
    iconColor: { control: 'select', options: Object.keys(ICON_COLOR_VARIANTS), description: 'Icon colour variant' },
    badgeVariant: { control: 'select', options: ['neutral', 'brand', 'hub', 'error', 'warning', 'success', 'info'], description: 'Badge variant' },
    badgeDot: { control: 'boolean', description: 'Show as dot badge' },
  } as any,
  args: { iconName: 'bell', iconSize: 'md', iconColor: 'default', variant: 'ghost', badgeVariant: 'brand', badgeDot: false } as any,
  render: (args: any) => {
    const { variant, loading, disabled, iconName = 'bell', iconSize = 'md', iconColor = 'default', badgeVariant = 'brand', badgeDot = false } = args;
    const IconComp = INSTANCE_ICONS[iconName] ?? BellIcon;
    const iconColorValue = ICON_COLOR_VARIANTS[iconColor];
    return (
      <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
        <div style={{ marginRight: -8 }}>
          <IconButton
            aria-label="Notifications"
            icon={<IconComp size={iconSize} style={iconColorValue ? { color: iconColorValue } : undefined} />}
            variant={variant}
            loading={loading}
            disabled={disabled}
          />
        </div>
        <Badge variant={badgeVariant} dot={badgeDot}>
          {!badgeDot ? '1' : undefined}
        </Badge>
      </div>
    );
  },
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
