import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { CategoryNav } from './CategoryNav';

const items = [
  { label: 'All', href: '#all', active: true },
  { label: 'Web', href: '#web' },
];

describe('CategoryNav', () => {
  it('renders a labelled nav landmark with links', () => {
    render(<CategoryNav items={items} />);
    expect(screen.getByRole('navigation', { name: 'Categories' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('marks the active category with aria-current', () => {
    render(<CategoryNav items={items} />);
    expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Web' })).not.toHaveAttribute('aria-current');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CategoryNav items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
