import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it.each(['brand', 'hub', 'neutral', 'error', 'warning', 'success', 'info'] as const)(
    'renders the %s variant without crashing',
    (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    }
  );

  it('renders an icon when provided', () => {
    render(<Badge icon={<svg data-testid="icon" />}>Sale</Badge>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge variant="success">Active</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
