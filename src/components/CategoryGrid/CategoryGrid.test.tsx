import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { CategoryGrid } from './CategoryGrid';
import { BookIcon } from '../../lib/icons';

const items = [
  { icon: <BookIcon />, name: 'Web Development', productCount: 1240, href: '#web' },
  { icon: <BookIcon />, name: 'Security', productCount: 430, href: '#security' },
];

describe('CategoryGrid', () => {
  it('renders a labelled section with one tile link per item', () => {
    render(<CategoryGrid items={items} heading="Browse by category" />);
    expect(screen.getByRole('region', { name: 'Browse by category' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Browse by category' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CategoryGrid items={items} heading="Categories" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
