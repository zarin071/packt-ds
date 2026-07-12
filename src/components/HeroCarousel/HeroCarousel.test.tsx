import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { HeroCarousel } from './HeroCarousel';

const slides = [
  { id: 'a', content: <div>Slide A</div> },
  { id: 'b', content: <div>Slide B</div> },
  { id: 'c', content: <div>Slide C</div> },
];

describe('HeroCarousel', () => {
  it('is an aria carousel with labelled slides and dots', () => {
    render(<HeroCarousel slides={slides} label="Featured" />);
    expect(screen.getByRole('region', { name: 'Featured' })).toHaveAttribute('aria-roledescription', 'carousel');
    expect(screen.getByRole('group', { name: '2 of 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toBeInTheDocument();
  });

  it('disables the previous arrow on the first slide and next on the last', async () => {
    render(<HeroCarousel slides={slides} />);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }));
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
  });

  it('moves the active dot when navigating with the arrows', async () => {
    render(<HeroCarousel slides={slides} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute('aria-current', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<HeroCarousel slides={slides} label="Featured" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
