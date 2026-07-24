import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

const TestSvg = () => <svg data-testid="svg-icon" />;

describe('Icon', () => {
  it('renders its child SVG', () => {
    render(<Icon><TestSvg /></Icon>);
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  it('is hidden from assistive tech via aria-hidden', () => {
    render(<Icon><TestSvg /></Icon>);
    // The wrapping span carries aria-hidden="true"
    const wrapper = screen.getByTestId('svg-icon').parentElement;
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size without crashing', (size) => {
    render(<Icon size={size}><TestSvg /></Icon>);
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  it('forwards ref to the span wrapper', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Icon ref={ref}><TestSvg /></Icon>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <button aria-label="Close"><Icon><TestSvg /></Icon></button>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
