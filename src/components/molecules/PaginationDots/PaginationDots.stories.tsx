import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { PaginationDots } from './PaginationDots';

const meta: Meta<typeof PaginationDots> = {
  title: 'molecules/PaginationDots',
  component: PaginationDots,
  parameters: { layout: 'centered' },
  argTypes: {
    count: { control: { type: 'number', min: 1, max: 10 } },
    activeIndex: { control: { type: 'number', min: 0 } },
    onSelect: { action: 'onSelect' },
  },
  args: { count: 5, activeIndex: 0, onSelect: fn() },
};

export default meta;
type Story = StoryObj<typeof PaginationDots>;

export const Playground: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.activeIndex);
    return (
      <PaginationDots
        {...args}
        activeIndex={active}
        onSelect={(i) => {
          setActive(i);
          args.onSelect?.(i);
        }}
      />
    );
  },
};

export const Positions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PaginationDots count={5} activeIndex={0} />
      <PaginationDots count={5} activeIndex={2} />
      <PaginationDots count={5} activeIndex={4} />
    </div>
  ),
};
