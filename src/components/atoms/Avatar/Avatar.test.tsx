import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('exposes the alt text as the accessible name', () => {
    render(<Avatar initials="JD" alt="Jane Doe" />);
    expect(screen.getByLabelText('Jane Doe')).toBeInTheDocument();
  });

  it('renders initials (uppercased, max 2 chars) as the fallback', async () => {
    render(<Avatar initials="abc" alt="Ada Byron" />);
    // Radix renders the fallback after an effect resolves the image status.
    expect(await screen.findByText('AB')).toBeInTheDocument();
  });

  it('renders a status dot with an accessible label when status is set', () => {
    render(<Avatar initials="JD" alt="Jane Doe" status="online" />);
    expect(screen.getByLabelText('Status: online')).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar initials="JD" alt="Jane Doe" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Avatar initials="JD" alt="Jane Doe" status="online" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
