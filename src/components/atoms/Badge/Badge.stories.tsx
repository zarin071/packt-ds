import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Badge } from './Badge';
import { BellIcon } from '../../../lib/icons';
import { iconArgType } from '../../../lib/story-helpers';
import type { BadgeVariant } from './Badge.types';

const meta: Meta<typeof Badge> = {
  title: 'atoms/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'hub', 'error', 'warning', 'success', 'info'],
    },
    dot: { control: 'boolean' },
    children: { control: 'text' },
    icon: iconArgType('sm'),
  },
  args: { children: '1', variant: 'brand', dot: false, icon: 'none' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
  fontFamily: 'Outfit, sans-serif',
};

const VARIANTS: BadgeVariant[] = ['neutral', 'brand', 'hub', 'error', 'warning', 'success', 'info'];

// Replicates the Figma "With Instance" layout: the icon button pulls left
// via marginRight: -8 so the badge overlaps its top-right corner.
function InstanceBell({ variant, dot }: { variant: BadgeVariant; dot?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: -8, padding: 8 }}>
        <BellIcon size="lg" />
      </div>
      {dot ? (
        <Badge variant={variant} dot />
      ) : (
        // Figma "With Instance" standard column: count badge shows text only, no icon inside
        <Badge variant={variant}>1</Badge>
      )}
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <Badge {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('1')).toBeInTheDocument();
  },
};

export const Variants: Story = {
  name: 'Standard — all variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      {VARIANTS.map((v) => (
        <Badge key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Badge>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const v of VARIANTS) {
      expect(canvas.getByText(v.charAt(0).toUpperCase() + v.slice(1))).toBeInTheDocument();
    }
  },
};

export const WithIcon: Story = {
  name: 'Trailing with icon — all variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      {VARIANTS.map((v) => (
        <Badge key={v} variant={v} icon={<BellIcon size="sm" />}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

export const Dots: Story = {
  name: 'Dot — all variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ ...row, alignItems: 'center', gap: 16 }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Badge variant={v} dot />
          <span style={{ fontSize: 10, color: 'var(--packt-content-tertiary)', fontFamily: 'Outfit, sans-serif' }}>
            {v}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const WithInstancePlayground: Story = {
  render: ({ variant = 'brand', dot, children }) => (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: -8, padding: 8 }}>
        <BellIcon size="lg" />
      </div>
      <Badge variant={variant} dot={dot}>
        {!dot ? (children ?? '1') : undefined}
      </Badge>
    </div>
  ),
};

export const WithInstance: Story = {
  name: 'With instance — badge on icon button',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', fontFamily: 'Outfit, sans-serif' }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <InstanceBell variant={v} />
          <InstanceBell variant={v} dot />
          <span style={{ fontSize: 10, color: 'var(--packt-content-tertiary)' }}>{v}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllVariantsRendered: Story = {
  name: 'All variants render without error',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={row}>
        {VARIANTS.map((v) => (
          <Badge key={v} variant={v}>{v}</Badge>
        ))}
      </div>
      <div style={{ ...row, gap: 12 }}>
        {VARIANTS.map((v) => (
          <Badge key={v} variant={v} dot />
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const v of VARIANTS) {
      expect(canvas.getByText(v)).toBeInTheDocument();
    }
  },
};

