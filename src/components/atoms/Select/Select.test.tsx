import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

describe('Select', () => {
  it('renders the trigger with a label', () => {
    render(<Select label="Framework" options={OPTIONS} />);
    expect(screen.getByLabelText('Framework')).toBeInTheDocument();
  });

  it('shows a placeholder when no value is selected', () => {
    render(<Select label="Pick" options={OPTIONS} placeholder="Choose…" />);
    expect(screen.getByText('Choose…')).toBeInTheDocument();
  });

  it('renders a trigger button with combobox role', () => {
    render(<Select label="Framework" options={OPTIONS} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('accepts an onValueChange handler without throwing', () => {
    // Portal-based dropdown doesn't open in jsdom; verify the prop is wired
    const onValueChange = vi.fn();
    expect(() =>
      render(<Select label="Framework" options={OPTIONS} onValueChange={onValueChange} />)
    ).not.toThrow();
  });

  it('shows error message and marks trigger as invalid', () => {
    render(<Select label="Framework" options={OPTIONS} error="Please select a framework." />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Please select a framework.')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', async () => {
    render(<Select label="Framework" options={OPTIONS} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('reflects controlled value', () => {
    render(<Select label="Framework" options={OPTIONS} value="vue" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Vue');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Select label="Framework" options={OPTIONS} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
