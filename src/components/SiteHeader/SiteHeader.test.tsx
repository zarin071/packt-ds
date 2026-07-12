import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { SiteHeader } from './SiteHeader';

const props = {
  logo: 'PACKT',
  links: [
    { label: 'Books', href: '#books' },
    { label: 'Videos', href: '#videos' },
  ],
};

describe('SiteHeader', () => {
  it('renders the banner with nav, search, and actions', () => {
    render(<SiteHeader {...props} cartCount={3} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cart, 3 items' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument();
  });

  it('opens the drawer as a dialog and closes on Escape', async () => {
    render(<SiteHeader {...props} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Menu' });
    expect(dialog).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('traps initial focus inside the open drawer', async () => {
    render(<SiteHeader {...props} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Menu' });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SiteHeader {...props} cartCount={2} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
