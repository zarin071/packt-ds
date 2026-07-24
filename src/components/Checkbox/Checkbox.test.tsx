import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import type { CheckboxRef } from './Checkbox.types';

describe('Checkbox', () => {
  it('renders an unchecked checkbox by default', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
  });

  it('renders the label text', () => {
    render(<Checkbox label="Subscribe" />);
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('calls onCheckedChange when toggled', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Toggle" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('shows indeterminate state when indeterminate prop is set', () => {
    render(<Checkbox label="Select all" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'indeterminate');
  });

  it('is disabled and cannot be toggled', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Disabled" disabled onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('shows error message and sets aria-invalid', () => {
    render(<Checkbox label="Agree" error="You must agree." />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('You must agree.')).toBeInTheDocument();
  });

  it('error message is linked via aria-describedby', () => {
    render(<Checkbox label="Agree" error="Required." />);
    const checkbox = screen.getByRole('checkbox');
    const errorId = checkbox.getAttribute('aria-describedby');
    expect(document.getElementById(errorId!)).toHaveTextContent('Required.');
  });

  it('forwards ref to the checkbox root', () => {
    const ref = createRef<CheckboxRef>();
    render(<Checkbox label="Ref test" ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
