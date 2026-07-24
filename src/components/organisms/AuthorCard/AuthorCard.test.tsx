import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { AuthorCard } from './AuthorCard';

describe('AuthorCard', () => {
  it('renders name, role, and avatar with the author name as alt', () => {
    render(<AuthorCard name="Juntao Qiu" role="Author" initials="JQ" />);
    expect(screen.getByRole('heading', { name: 'Juntao Qiu' })).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Juntao Qiu')).toBeInTheDocument();
  });

  it('renders social links scoped to the author', () => {
    render(
      <AuthorCard name="Juntao Qiu" links={[{ platform: 'github', url: 'https://github.com/x' }]} />
    );
    expect(screen.getByRole('list', { name: 'Juntao Qiu on social media' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <AuthorCard
        name="Juntao Qiu"
        role="Author"
        initials="JQ"
        bio="Writes about maintainable React."
        links={[{ platform: 'github', url: 'https://github.com/x' }]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
