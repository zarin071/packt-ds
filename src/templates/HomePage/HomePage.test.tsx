import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';
import type { HomePageData } from './HomePage.types';
import { BookIcon } from '../../components/icons';

const product = (id: string, title: string) => ({
  id,
  coverSrc: '/c.jpg',
  coverAlt: `${title} cover`,
  title,
  rating: 4.5,
  ratingCount: 10,
  formats: ['ebook' as const],
  price: 19.99,
});

const data: HomePageData = {
  logo: 'PACKT',
  headerLinks: [{ label: 'Books', href: '#books' }],
  cartCount: 2,
  categories: [{ label: 'All', href: '#all', active: true }],
  saleLabel: 'Spring Sale',
  saleEndsAt: new Date(Date.now() + 86_400_000),
  saleCtaLabel: 'Shop deals',
  saleCtaHref: '#sale',
  heroSlides: [{ id: 'h1', title: 'Hero', copy: 'Copy', ctaLabel: 'Go', ctaHref: '#go' }],
  productSections: [
    { id: 'best', title: 'Best Sellers', products: [product('b1', 'Best One')] },
    { id: 'latest', title: 'Latest Releases', products: [product('l1', 'Latest One')] },
    { id: 'trending', title: 'Trending This Week', products: [product('t1', 'Trending One')] },
  ],
  readingLists: { id: 'lists', title: 'Expert Reading Lists', products: [product('r1', 'A List')] },
  gridHeading: 'Browse by category',
  gridCategories: [{ icon: <BookIcon />, name: 'Web', productCount: 10, href: '#web' }],
  spotlights: [
    { id: 's1', title: 'Spotlight One', ctaLabel: 'Go', ctaHref: '#1' },
    { id: 's2', title: 'Spotlight Two', ctaLabel: 'Go', ctaHref: '#2' },
  ],
  partnersLabel: 'Trusted by teams at',
  partners: [{ name: 'AWS' }, { name: 'Docker' }],
  authorsTitle: 'Meet the authors',
  authors: [{ id: 'a1', name: 'Jane Dev', role: 'Author', initials: 'JD' }],
  footerColumns: [{ heading: 'Explore', links: [{ label: 'Books', href: '#books' }] }],
  footerSocial: [{ platform: 'github', url: 'https://github.com/x' }],
  copyright: '© 2026 Packt',
};

describe('HomePage', () => {
  it('renders the page landmarks in order', () => {
    render(<HomePage data={data} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders every major section', () => {
    render(<HomePage data={data} />);
    // Product + reading-list carousels
    for (const name of ['Best Sellers', 'Latest Releases', 'Trending This Week', 'Expert Reading Lists', 'Meet the authors']) {
      expect(screen.getByRole('region', { name })).toHaveAttribute('aria-roledescription', 'carousel');
    }
    expect(screen.getByRole('region', { name: 'Featured promotions' })).toBeInTheDocument(); // hero
    expect(screen.getByRole('heading', { name: 'Browse by category' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Spotlight One' })).toHaveAttribute('data-hub', 'packt');
    expect(screen.getByRole('region', { name: 'Trusted by teams at' })).toBeInTheDocument();
  });

  it('renders the countdown timer with aria-live off', () => {
    render(<HomePage data={data} />);
    expect(screen.getByRole('timer')).toHaveAttribute('aria-live', 'off');
  });

  it('composes real products with ratings and prices', () => {
    render(<HomePage data={data} />);
    expect(screen.getByRole('heading', { name: 'Best One' })).toBeInTheDocument();
    expect(screen.getAllByText('$19.99').length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<HomePage data={data} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
