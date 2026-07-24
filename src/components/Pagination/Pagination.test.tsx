import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders a nav landmark labelled "Pagination"', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('marks the current page with aria-current="page"', () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('disables the previous button on the first page', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('calls onPageChange with currentPage+1 when next is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={2} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with currentPage-1 when previous is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the page number when a page button is clicked', async () => {
    const onPageChange = vi.fn();
    // current=3, total=5: buildPages yields [1,2,3,4,5] — all visible
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Page 5' }));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('hides interior pages behind ellipsis when there are many pages', () => {
    // current=5, total=10, siblings=1 → pages [1,'…',4,5,6,'…',10]
    // page 2 and 3 are skipped
    render(<Pagination totalPages={10} currentPage={5} onPageChange={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Page 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Page 3' })).not.toBeInTheDocument();
  });

  it('always renders page 1 and the last page', () => {
    render(<Pagination totalPages={10} currentPage={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 10' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
