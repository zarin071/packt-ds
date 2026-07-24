import { render, screen } from '@testing-library/react';
import { createRef, type ElementRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders its children', () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('associates with an input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows a visible asterisk and sr-only "(required)" when required', () => {
    render(<Label required>Password</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('(required)')).toBeInTheDocument();
  });

  it('hides the asterisk from assistive tech (aria-hidden)', () => {
    render(<Label required>Password</Label>);
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render the required marker when required is false', () => {
    render(<Label>Username</Label>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('forwards ref to the label element', () => {
    const ref = createRef<ElementRef<typeof LabelPrimitive.Root>>();
    render(<Label ref={ref}>Ref</Label>);
    expect(ref.current).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Label htmlFor="name" required>Full name</Label>
        <input id="name" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
