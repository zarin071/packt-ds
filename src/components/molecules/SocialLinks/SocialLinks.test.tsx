import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { SocialLinks } from './SocialLinks';

const links = [
  { platform: 'github' as const, url: 'https://github.com/x' },
  { platform: 'linkedin' as const, url: 'https://linkedin.com/x' },
];

describe('SocialLinks', () => {
  it('renders a link per platform pointing at its url', () => {
    render(<SocialLinks links={links} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/x');
  });

  it('opens links safely in a new tab', () => {
    render(<SocialLinks links={links} />);
    const link = screen.getByRole('link', { name: /GitHub/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('includes an "opens in new tab" hint in the accessible name', () => {
    render(<SocialLinks links={links} />);
    expect(screen.getByRole('link', { name: 'GitHub (opens in new tab)' })).toBeInTheDocument();
  });

  it('honours a custom label override', () => {
    render(<SocialLinks links={[{ platform: 'twitter', url: 'https://x.com/y', label: 'Follow us on X' }]} />);
    expect(screen.getByRole('link', { name: 'Follow us on X (opens in new tab)' })).toBeInTheDocument();
  });

  it('forwards ref to the list element', () => {
    const ref = createRef<HTMLUListElement>();
    render(<SocialLinks links={links} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SocialLinks links={links} label="Follow Packt" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
