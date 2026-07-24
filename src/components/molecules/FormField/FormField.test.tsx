import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';

describe('FormField', () => {
  it('associates the label with the input', () => {
    render(<FormField label="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('wires helper text via aria-describedby', () => {
    render(<FormField label="Email" helperText="We never share it." />);
    const input = screen.getByLabelText('Email');
    const helper = screen.getByText('We never share it.');
    expect(input).toHaveAttribute('aria-describedby', helper.id);
  });

  it('marks errors with aria-invalid and an alert containing icon + text', () => {
    render(<FormField label="Email" error="Enter a valid email." />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Enter a valid email.');
    expect(input).toHaveAttribute('aria-describedby', alert.id);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FormField label="Email" required helperText="Work email preferred." />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
