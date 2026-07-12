import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { AuthModal } from './AuthModal';

function setup(onSubmit = vi.fn(), onOpenChange = vi.fn()) {
  render(<AuthModal open onOpenChange={onOpenChange} onSubmit={onSubmit} />);
  return { onSubmit, onOpenChange };
}

describe('AuthModal', () => {
  it('renders a dialog with email and password fields', () => {
    setup();
    expect(screen.getByRole('dialog', { name: 'Create your account' })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/, { selector: 'input' })).toBeInTheDocument();
  });

  it('shows every requirement as unmet initially, with icon + hidden state text', () => {
    setup();
    const list = screen.getByRole('list', { name: 'Password requirements' });
    expect(list).toHaveTextContent('Not met:At least 8 characters');
    expect(list).toHaveTextContent('Not met:One uppercase letter');
    expect(list).toHaveTextContent('Not met:One number');
  });

  it('updates the checklist as the password is typed', async () => {
    setup();
    await userEvent.type(screen.getByLabelText(/^Password/, { selector: 'input' }), 'Secret12');
    const list = screen.getByRole('list', { name: 'Password requirements' });
    expect(list).toHaveTextContent('Met:At least 8 characters');
    expect(list).toHaveTextContent('Met:One uppercase letter');
    expect(list).toHaveTextContent('Met:One number');
  });

  it('keeps submit disabled until all requirements are met, then submits credentials', async () => {
    const { onSubmit } = setup();
    const submit = screen.getByRole('button', { name: 'Create account' });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/^Email/, { selector: 'input' }), 'dev@packt.com');
    await userEvent.type(screen.getByLabelText(/^Password/, { selector: 'input' }), 'Secret12');
    expect(submit).toBeEnabled();

    await userEvent.click(submit);
    expect(onSubmit).toHaveBeenCalledWith({ email: 'dev@packt.com', password: 'Secret12' });
  });

  it('closes on Escape via Radix Dialog', async () => {
    const { onOpenChange } = setup();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AuthModal open onOpenChange={() => {}} />);
    // Radix portals the dialog to document.body — run axe on the body instead.
    expect(await axe(document.body)).toHaveNoViolations();
    void container;
  });
});
