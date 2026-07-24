import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { PriceBlock } from './PriceBlock';
import { FileIcon, BookIcon, PlayIcon, HeadphonesIcon } from '../../../lib/icons';

const meta: Meta<typeof PriceBlock> = {
  title: 'molecules/PriceBlock',
  component: PriceBlock,
  parameters: { layout: 'centered' },
  args: { onSelect: fn() },
};

export default meta;
type Story = StoryObj<typeof PriceBlock>;

const items = [
  { format: 'ebook', label: 'E-book', icon: <FileIcon />, price: 29.99, originalPrice: 44.99 },
  { format: 'paperback', label: 'Paperback', icon: <BookIcon />, price: 39.99 },
  { format: 'video', label: 'Video course', icon: <PlayIcon />, price: 49.99, originalPrice: 79.99 },
  { format: 'audiobook', label: 'Audiobook', icon: <HeadphonesIcon />, price: 24.99 },
];

export const Playground: Story = {
  argTypes: { items: { control: false }, selectedFormat: { control: false } },
  render: (args) => {
    const [selected, setSelected] = useState('ebook');
    return (
      <div style={{ width: 360 }}>
        <PriceBlock
          {...args}
          items={items}
          selectedFormat={selected}
          onSelect={(f) => {
            setSelected(f);
            args.onSelect?.(f);
          }}
        />
      </div>
    );
  },
};

export const NoSelection: Story = {
  name: 'No selection',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <PriceBlock items={items} />
    </div>
  ),
};
