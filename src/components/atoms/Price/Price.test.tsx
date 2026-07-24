import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Price } from './Price';

describe('Price', () => {
  it('formats the amount in USD by default', () => {
    render(<Price amount={29.99} />);
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('formats with the given currency', () => {
    render(<Price amount={30} currency="GBP" locale="en-GB" />);
    expect(screen.getByText('£30.00')).toBeInTheDocument();
  });

  it('renders the original price struck through with a "was" label', () => {
    render(<Price amount={29.99} originalAmount={49.99} />);
    const original = screen.getByLabelText('was $49.99');
    expect(original.tagName).toBe('S');
  });

  it('does not render an original price when it is not higher than the amount', () => {
    render(<Price amount={29.99} originalAmount={19.99} />);
    expect(screen.queryByLabelText(/^was /)).not.toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Price amount={10} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Price amount={29.99} originalAmount={49.99} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
