import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';

const meta: Meta<typeof Price> = {
  title: 'atoms/Price',
  component: Price,
  parameters: { layout: 'centered' },
  argTypes: {
    amount: { control: { type: 'number', min: 0 } },
    originalAmount: { control: { type: 'number', min: 0 } },
    currency: { control: 'select', options: ['USD', 'EUR', 'GBP', 'JPY', 'INR'] },
  },
  args: { amount: 29.99, originalAmount: 49.99, currency: 'USD' },
};

export default meta;
type Story = StoryObj<typeof Price>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Regular: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Price amount={29.99} />,
};

export const OnSale: Story = {
  name: 'On sale',
  parameters: { controls: { disable: true } },
  render: () => <Price amount={29.99} originalAmount={49.99} />,
};

export const Currencies: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={col}>
      <Price amount={29.99} originalAmount={49.99} currency="USD" />
      <Price amount={29.99} originalAmount={49.99} currency="EUR" />
      <Price amount={29.99} originalAmount={49.99} currency="GBP" />
      <Price amount={2999} originalAmount={4999} currency="JPY" />
    </div>
  ),
};
