import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb';

const ITEMS: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Books', href: '/books' },
  { label: 'Python', href: '/books/python' },
];

describe('Breadcrumb', () => {
  it('renders a nav landmark labelled "Breadcrumb"', () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders all item labels', () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders intermediate items as links with correct hrefs', () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Books' })).toHaveAttribute('href', '/books');
  });

  it('renders the last item as non-link with aria-current="page"', () => {
    render(<Breadcrumb items={ITEMS} />);
    const current = screen.getByText('Python');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).not.toBe('A');
  });

  it('marks an item with active=true as aria-current="page"', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Books', href: '/books', active: true },
    ];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Books')).toHaveAttribute('aria-current', 'page');
  });

  it('uses a custom separator when provided', () => {
    render(<Breadcrumb items={ITEMS} separator={<span>/</span>} />);
    expect(screen.getAllByText('/')).toHaveLength(ITEMS.length - 1);
  });

  it('forwards ref to the nav element', () => {
    const ref = createRef<HTMLElement>();
    render(<Breadcrumb items={ITEMS} ref={ref} />);
    expect(ref.current?.tagName).toBe('NAV');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Breadcrumb items={ITEMS} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
