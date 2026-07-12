import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { FormatBadge } from './FormatBadge';

describe('FormatBadge', () => {
  it('renders the label for each format', () => {
    const { rerender } = render(<FormatBadge format="ebook" />);
    expect(screen.getByText('E-book')).toBeInTheDocument();
    rerender(<FormatBadge format="paperback" />);
    expect(screen.getByText('Paperback')).toBeInTheDocument();
    rerender(<FormatBadge format="video" />);
    expect(screen.getByText('Video')).toBeInTheDocument();
    rerender(<FormatBadge format="audiobook" />);
    expect(screen.getByText('Audiobook')).toBeInTheDocument();
  });

  it('forwards ref to the underlying badge element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<FormatBadge format="ebook" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FormatBadge format="audiobook" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
