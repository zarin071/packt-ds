import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { InfoIcon } from '../icons';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'brand', 'info', 'success', 'warning', 'error'] },
    children: { control: 'text' },
  },
  args: { children: 'Tag label', variant: 'default' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      <Tag {...args} variant="default">Default</Tag>
      <Tag {...args} variant="brand">Brand</Tag>
      <Tag {...args} variant="info">Info</Tag>
      <Tag {...args} variant="success">Success</Tag>
      <Tag {...args} variant="warning">Warning</Tag>
      <Tag {...args} variant="error">Error</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div style={row}>
      <Tag {...args} variant="info" icon={<InfoIcon />}>With icon</Tag>
      <Tag {...args} variant="brand" icon={<InfoIcon />}>Brand</Tag>
    </div>
  ),
};

export const Removable: Story = {
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

export const Playground: Story = {};
