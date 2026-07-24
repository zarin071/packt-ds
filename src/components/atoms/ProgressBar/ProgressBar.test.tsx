import { render, screen } from '@testing-library/react';
import { createRef, type ElementRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders a progressbar role with the correct value', () => {
    render(<ProgressBar value={40} label="Completion" />);
    expect(screen.getByRole('progressbar', { name: 'Completion' })).toHaveAttribute('aria-valuenow', '40');
  });

  it('clamps values above 100 to 100', () => {
    render(<ProgressBar value={120} label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps values below 0 to 0', () => {
    render(<ProgressBar value={-10} label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows the percentage label when showLabel is true', () => {
    render(<ProgressBar value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not show the percentage label by default', () => {
    render(<ProgressBar value={75} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size without crashing', (size) => {
    render(<ProgressBar value={50} size={size} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('forwards ref to the progress root', () => {
    const ref = createRef<ElementRef<typeof ProgressPrimitive.Root>>();
    render(<ProgressBar value={50} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProgressBar value={60} label="Upload progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
