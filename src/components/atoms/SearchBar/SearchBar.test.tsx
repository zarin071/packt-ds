import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders a search input with default aria-label', () => {
    render(<SearchBar />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('uses a custom aria-label when provided', () => {
    render(<SearchBar aria-label="Find books" />);
    expect(screen.getByRole('searchbox', { name: 'Find books' })).toBeInTheDocument();
  });

  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('searchbox'), 'React');
    expect(onChange).toHaveBeenCalled();
  });

  it('does not show clear button when value is empty', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('shows clear button when value is non-empty', () => {
    render(<SearchBar value="React" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('calls onClear when the clear button is clicked', async () => {
    const onClear = vi.fn();
    render(<SearchBar value="React" onChange={vi.fn()} onClear={onClear} />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch with the current value when Enter is pressed', async () => {
    const onSearch = vi.fn();
    render(<SearchBar value="hooks" onChange={vi.fn()} onSearch={onSearch} />);
    await userEvent.type(screen.getByRole('searchbox'), '{Enter}');
    expect(onSearch).toHaveBeenCalledWith('hooks');
  });

  it('hides clear button while loading', () => {
    render(<SearchBar value="React" onChange={vi.fn()} loading />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', async () => {
    const onChange = vi.fn();
    render(<SearchBar disabled onChange={onChange} />);
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });

  it('forwards ref to the inner input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<SearchBar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SearchBar value="" onChange={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
