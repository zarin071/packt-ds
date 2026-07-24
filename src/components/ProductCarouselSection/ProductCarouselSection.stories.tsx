import type { Meta, StoryObj } from '@storybook/react';
import { ProductCarouselSection } from './ProductCarouselSection';
import { ProductCard } from '../ProductCard';

const meta: Meta<typeof ProductCarouselSection> = {
  title: 'organisms/ProductCarouselSection',
  component: ProductCarouselSection,
  parameters: { layout: 'padded' },
  argTypes: { items: { control: false } },
};

export default meta;
type Story = StoryObj<typeof ProductCarouselSection>;

const products = [
  { seed: 'react', title: 'React Anti-Patterns', price: 27.99, originalPrice: 39.99, rating: 4.5, count: 128 },
  { seed: 'go', title: 'Go Cookbook: Practical recipes for building fast services', price: 24.99, rating: 4, count: 64 },
  { seed: 'rust', title: 'Rust Web Programming', price: 31.99, originalPrice: 44.99, rating: 5, count: 39 },
  { seed: 'python', title: 'Python Machine Learning by Example', price: 29.99, rating: 4.5, count: 212 },
  { seed: 'devops', title: 'The Ultimate Docker Container Book', price: 27.99, rating: 4, count: 87 },
  { seed: 'ts', title: 'Mastering TypeScript', price: 23.99, rating: 4.5, count: 143 },
];

export const Playground: Story = {
  args: { title: 'Bestsellers in Web Development' },
  render: (args) => (
    <ProductCarouselSection
      {...args}
      items={products.map((p) => (
        <ProductCard
          key={p.seed}
          coverSrc={`https://picsum.photos/seed/packt-${p.seed}/480/640`}
          coverAlt={`${p.title} cover`}
          title={p.title}
          rating={p.rating}
          ratingCount={p.count}
          priceOptions={[{ format: 'ebook', label: 'E-book', price: p.price, originalPrice: p.originalPrice }]}
          selectedFormat="ebook"
        />
      ))}
    />
  ),
};
