import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { PriceBlock } from './PriceBlock';

const items = [
  { format: 'ebook', label: 'E-book', price: 29.99, originalPrice: 44.99 },
  { format: 'paperback', label: 'Paperback', price: 39.99 },
  { format: 'audiobook', label: 'Audiobook', price: 24.99 },
];

describe('PriceBlock', () => {
  it('renders a radio per option with visible labels and prices', () => {
    render(<PriceBlock items={items} label="Choose a format" />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByText('E-book')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('marks the selected format as checked', () => {
    render(<PriceBlock items={items} selectedFormat="paperback" />);
    expect(screen.getByRole('radio', { name: /Paperback/ })).toBeChecked();
    expect(screen.getByRole('radio', { name: /E-book/ })).not.toBeChecked();
  });

  it('calls onSelect with the chosen format', async () => {
    const onSelect = vi.fn();
    render(<PriceBlock items={items} selectedFormat="ebook" onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('radio', { name: /Audiobook/ }));
    expect(onSelect).toHaveBeenCalledWith('audiobook');
  });

  it('renders the struck-through original price when provided', () => {
    render(<PriceBlock items={items} />);
    expect(screen.getByLabelText('was $44.99')).toBeInTheDocument();
  });

  it('forwards ref to the fieldset', () => {
    const ref = createRef<HTMLFieldSetElement>();
    render(<PriceBlock items={items} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PriceBlock items={items} selectedFormat="ebook" label="Choose a format" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
