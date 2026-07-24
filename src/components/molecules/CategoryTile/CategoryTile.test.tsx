import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { CategoryTile } from './CategoryTile';
import { BookIcon } from '../../../lib/icons';

describe('CategoryTile', () => {
  it('renders as a single link to href, named by the category', () => {
    render(<CategoryTile icon={<BookIcon />} name="Web Development" productCount={1240} href="/web" />);
    const link = screen.getByRole('link', { name: /Web Development/ });
    expect(link).toHaveAttribute('href', '/web');
  });

  it('is the only interactive element (whole tile is the link)', () => {
    render(<CategoryTile icon={<BookIcon />} name="Data" productCount={10} href="/data" />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('formats the product count with grouping and pluralisation', () => {
    const { rerender } = render(<CategoryTile icon={<BookIcon />} name="A" productCount={1240} href="/a" />);
    expect(screen.getByText('1,240 products')).toBeInTheDocument();
    rerender(<CategoryTile icon={<BookIcon />} name="A" productCount={1} href="/a" />);
    expect(screen.getByText('1 product')).toBeInTheDocument();
  });

  it('forwards ref to the anchor', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<CategoryTile icon={<BookIcon />} name="A" productCount={1} href="/a" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CategoryTile icon={<BookIcon />} name="Web Development" productCount={1240} href="/web" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
