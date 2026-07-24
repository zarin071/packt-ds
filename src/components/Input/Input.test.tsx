import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input aria-label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('accepts and displays typed text', async () => {
    render(<Input aria-label="Name" />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Alice');
    expect(input).toHaveValue('Alice');
  });

  it('calls onChange when the value changes', async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Search" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'x');
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Disabled" disabled onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    await userEvent.type(input, 'hi');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-invalid when error prop is true', () => {
    render(<Input aria-label="Email" error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-invalid when aria-invalid="true" is passed directly', () => {
    render(<Input aria-label="Email" aria-invalid="true" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('has no aria-invalid when not in error state', () => {
    render(<Input aria-label="Email" />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input aria-label="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders placeholder text', () => {
    render(<Input aria-label="Email" placeholder="user@example.com" />);
    expect(screen.getByPlaceholderText('user@example.com')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <label>
        Email
        <Input />
      </label>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
