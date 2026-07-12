import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'organisms/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
  argTypes: {
    priceOptions: { control: false },
    formats: { control: false },
    onAddToCart: { action: 'onAddToCart' },
    onSelectFormat: { action: 'onSelectFormat' },
  },
  args: {
    coverSrc: 'https://picsum.photos/seed/packt-react/480/640',
    coverAlt: 'React Anti-Patterns book cover',
    title: 'React Anti-Patterns: Build efficient and maintainable React applications',
    meta: 'By Juntao Qiu · Nov 2025',
    rating: 4.5,
    ratingCount: 128,
    formats: ['ebook', 'paperback'],
    priceOptions: [
      { format: 'ebook', label: 'E-book', price: 27.99, originalPrice: 39.99 },
      { format: 'paperback', label: 'Paperback', price: 34.99 },
    ],
    onAddToCart: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Playground: Story = {
  render: (args) => {
    const [format, setFormat] = useState('ebook');
    return (
      <div style={{ width: 300 }}>
        <ProductCard {...args} selectedFormat={format} onSelectFormat={setFormat} />
      </div>
    );
  },
};

export const AsyncAddToCart: Story = {
  name: 'Async add to cart',
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [format, setFormat] = useState('ebook');
    return (
      <div style={{ width: 300 }}>
        <ProductCard
          {...args}
          selectedFormat={format}
          onSelectFormat={setFormat}
          onAddToCart={() => new Promise((resolve) => setTimeout(resolve, 1500))}
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 300 }}>
      <ProductCard
        coverSrc="https://picsum.photos/seed/packt-go/480/640"
        coverAlt="Go cookbook cover"
        title="Go Cookbook"
        priceOptions={[{ format: 'ebook', label: 'E-book', price: 19.99 }]}
      />
    </div>
  ),
};
