import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

const baseProps = {
  coverSrc: '/cover.jpg',
  coverAlt: 'Book cover',
  title: 'React Anti-Patterns',
  priceOptions: [
    { format: 'ebook', label: 'E-book', price: 27.99, originalPrice: 39.99 },
    { format: 'paperback', label: 'Paperback', price: 34.99 },
  ],
};

describe('ProductCard', () => {
  it('renders the cover lazily with alt text', () => {
    render(<ProductCard {...baseProps} />);
    const img = screen.getByRole('img', { name: 'Book cover' });
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders title, rating, formats, and prices', () => {
    render(<ProductCard {...baseProps} rating={4.5} ratingCount={128} formats={['ebook', 'paperback']} />);
    expect(screen.getByRole('heading', { name: 'React Anti-Patterns' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '4.5 out of 5 stars, 128 reviews' })).toBeInTheDocument();
    // "E-book" appears twice by design: FormatBadge row + PriceBlock option label.
    expect(screen.getAllByText('E-book')).toHaveLength(2);
    expect(screen.getByText('$27.99')).toBeInTheDocument();
  });

  it('shows the loading state while an async add-to-cart is in flight', async () => {
    let resolveAdd!: () => void;
    const onAddToCart = vi.fn(() => new Promise<void>((resolve) => (resolveAdd = resolve)));
    render(<ProductCard {...baseProps} onAddToCart={onAddToCart} />);

    const button = screen.getByRole('button', { name: 'Add to cart' });
    await userEvent.click(button);
    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();

    resolveAdd();
    await waitFor(() => expect(button).not.toHaveAttribute('aria-busy'));
  });

  it('selects formats through the PriceBlock', async () => {
    const onSelectFormat = vi.fn();
    render(<ProductCard {...baseProps} selectedFormat="ebook" onSelectFormat={onSelectFormat} />);
    await userEvent.click(screen.getByRole('radio', { name: /Paperback/ }));
    expect(onSelectFormat).toHaveBeenCalledWith('paperback');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ProductCard {...baseProps} rating={4} ratingCount={12} formats={['ebook']} selectedFormat="ebook" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
