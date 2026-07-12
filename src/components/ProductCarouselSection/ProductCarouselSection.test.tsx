import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { ProductCarouselSection } from './ProductCarouselSection';

function renderCarousel() {
  return render(
    <ProductCarouselSection title="Bestsellers">
      <div>Slide A</div>
      <div>Slide B</div>
      <div>Slide C</div>
    </ProductCarouselSection>
  );
}

describe('ProductCarouselSection', () => {
  it('is an aria carousel region named by its title', () => {
    renderCarousel();
    const region = screen.getByRole('region', { name: 'Bestsellers' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('labels each slide "N of M"', () => {
    renderCarousel();
    expect(screen.getByRole('group', { name: '1 of 3' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '3 of 3' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '2 of 3' })).toHaveAttribute('aria-roledescription', 'slide');
  });

  it('renders previous/next arrow buttons that are safe to activate', async () => {
    renderCarousel();
    // jsdom has no scrollBy — activating the arrows must not throw.
    await userEvent.click(screen.getByRole('button', { name: 'Next items' }));
    await userEvent.click(screen.getByRole('button', { name: 'Previous items' }));
  });

  it('makes the track focusable for keyboard scrolling', () => {
    renderCarousel();
    expect(screen.getByLabelText('Bestsellers items')).toHaveAttribute('tabindex', '0');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCarousel();
    expect(await axe(container)).toHaveNoViolations();
  });
});
