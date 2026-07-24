import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByRole('heading', { name: 'No results found' })).toBeInTheDocument();
  });

  it('renders a description when provided', () => {
    render(<EmptyState title="No results" description="Try a different search term." />);
    expect(screen.getByText('Try a different search term.')).toBeInTheDocument();
  });

  it('does not render a description when absent', () => {
    render(<EmptyState title="No results" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    render(<EmptyState title="Empty" icon={<svg data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders a default icon when no icon is provided', () => {
    // InboxIcon is a MaterialIcon that renders the text "inbox" inside aria-hidden
    const { container } = render(<EmptyState title="Empty" />);
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).not.toBeNull();
    expect(iconWrapper?.textContent).toBeTruthy();
  });

  it('renders an action when provided', () => {
    render(<EmptyState title="No books" action={<button>Browse catalog</button>} />);
    expect(screen.getByRole('button', { name: 'Browse catalog' })).toBeInTheDocument();
  });

  it('does not render an action slot when absent', () => {
    render(<EmptyState title="No books" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyState title="Empty" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <EmptyState
        title="No results"
        description="Try adjusting your filters."
        action={<button>Clear filters</button>}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
