import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { PaginationDots } from './PaginationDots';

describe('PaginationDots', () => {
  it('renders one labelled button per slide', () => {
    render(<PaginationDots count={4} activeIndex={0} />);
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to slide 4' })).toBeInTheDocument();
  });

  it('marks the active dot with aria-current', () => {
    render(<PaginationDots count={4} activeIndex={2} />);
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).not.toHaveAttribute('aria-current');
  });

  it('calls onSelect with the zero-based index', async () => {
    const onSelect = vi.fn();
    render(<PaginationDots count={4} activeIndex={0} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }));
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('exposes an accessible group label', () => {
    render(<PaginationDots count={3} activeIndex={0} label="Featured books" />);
    expect(screen.getByRole('group', { name: 'Featured books' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PaginationDots count={5} activeIndex={1} label="Slides" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
