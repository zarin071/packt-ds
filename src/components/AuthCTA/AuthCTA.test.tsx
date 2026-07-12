import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { AuthCTA } from './AuthCTA';

describe('AuthCTA', () => {
  it('renders title, description, and both actions', () => {
    render(<AuthCTA />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create free account' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('fires the callbacks', async () => {
    const onSignUp = vi.fn();
    const onSignIn = vi.fn();
    render(<AuthCTA onSignUp={onSignUp} onSignIn={onSignIn} />);
    await userEvent.click(screen.getByRole('button', { name: 'Create free account' }));
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(onSignUp).toHaveBeenCalledTimes(1);
    expect(onSignIn).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AuthCTA />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
