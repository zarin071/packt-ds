import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'components/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    count: { control: { type: 'number', min: 0 } },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { value: 4.5, count: 25, size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Rating>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Values: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={col}>
      <Rating value={0} />
      <Rating value={2.5} />
      <Rating value={3} />
      <Rating value={4.5} />
      <Rating value={5} />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={col}>
      <Rating value={4.5} count={128} size="sm" />
      <Rating value={4.5} count={128} size="md" />
    </div>
  ),
};

export const WithoutCount: Story = {
  name: 'Without count',
  parameters: { controls: { disable: true } },
  render: () => <Rating value={3.5} />,
};
