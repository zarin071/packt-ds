import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { FeatureSpotlight } from './FeatureSpotlight';

const props = {
  title: 'Stay ahead with expert insights',
  ctaLabel: 'Visit the Hub',
  ctaHref: '/hub',
};

describe('FeatureSpotlight', () => {
  it('wraps the section in data-hub="packt"', () => {
    render(<FeatureSpotlight {...props} />);
    expect(screen.getByRole('region', { name: props.title })).toHaveAttribute('data-hub', 'packt');
  });

  it('renders the CTA as a link styled as a button', () => {
    render(<FeatureSpotlight {...props} />);
    const cta = screen.getByRole('link', { name: 'Visit the Hub' });
    expect(cta).toHaveAttribute('href', '/hub');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FeatureSpotlight {...props} eyebrow="Packt Hub" description="Deep dives and tutorials." />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
