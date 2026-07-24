import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { InfoIcon } from '../../../lib/icons';
import { iconArgType } from '../../../lib/story-helpers';

const meta: Meta<typeof Tag> = {
  title: 'atoms/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'hub', 'neutral', 'error', 'warning', 'success', 'info'],
    },
    children: { control: 'text' },
    icon: iconArgType('sm'),
  },
  args: { children: 'Tag label', variant: 'neutral', icon: 'none' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Tag {...args} variant="brand">Brand</Tag>
      <Tag {...args} variant="hub">Hub</Tag>
      <Tag {...args} variant="neutral">Neutral</Tag>
      <Tag {...args} variant="info">Info</Tag>
      <Tag {...args} variant="success">Success</Tag>
      <Tag {...args} variant="warning">Warning</Tag>
      <Tag {...args} variant="error">Error</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={row}>
      <Tag {...args} variant="info" icon={<InfoIcon />}>With icon</Tag>
      <Tag {...args} variant="brand" icon={<InfoIcon />}>Brand</Tag>
    </div>
  ),
};

export const Removable: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Node.js']);
    return (
      <div style={row}>
        {tags.map((t) => (
          <Tag
            key={t}
            {...args}
            variant="brand"
            onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
          >
            {t}
          </Tag>
        ))}
      </div>
    );
  },
};
