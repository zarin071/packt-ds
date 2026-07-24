import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  it('renders as a single labelled image', () => {
    render(<Rating value={4.5} count={25} />);
    expect(screen.getByRole('img', { name: '4.5 out of 5 stars, 25 reviews' })).toBeInTheDocument();
  });

  it('omits the review count from the label when count is not provided', () => {
    render(<Rating value={3} />);
    expect(screen.getByRole('img', { name: '3 out of 5 stars' })).toBeInTheDocument();
  });

  it('rounds fractional values to the nearest half in the label', () => {
    render(<Rating value={3.7} />);
    expect(screen.getByRole('img', { name: '3.5 out of 5 stars' })).toBeInTheDocument();
  });

  it('clamps values above 5 and below 0', () => {
    const { rerender } = render(<Rating value={9} />);
    expect(screen.getByRole('img', { name: '5 out of 5 stars' })).toBeInTheDocument();
    rerender(<Rating value={-2} />);
    expect(screen.getByRole('img', { name: '0 out of 5 stars' })).toBeInTheDocument();
  });

  it('shows the visible review count', () => {
    render(<Rating value={4} count={128} />);
    expect(screen.getByText('(128)')).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Rating value={4} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Rating value={4.5} count={25} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
