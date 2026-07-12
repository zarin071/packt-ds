import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { SiteFooter } from './SiteFooter';

const columns = [
  { heading: 'Explore', links: [{ label: 'Books', href: '#books' }] },
  { heading: 'Support', links: [{ label: 'Help centre', href: '#help' }] },
];

describe('SiteFooter', () => {
  it('renders a contentinfo landmark with one labelled nav per column', () => {
    render(<SiteFooter columns={columns} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Explore' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Support' })).toBeInTheDocument();
  });

  it('renders social links and copyright', () => {
    render(
      <SiteFooter
        columns={columns}
        socialLinks={[{ platform: 'github', url: 'https://github.com/x' }]}
        copyright="© 2026 Packt"
      />
    );
    expect(screen.getByRole('list', { name: 'Packt on social media' })).toBeInTheDocument();
    expect(screen.getByText('© 2026 Packt')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SiteFooter columns={columns} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
