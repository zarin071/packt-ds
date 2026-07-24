import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';
import { CloseIcon } from '../../../lib/icons';

describe('IconButton', () => {
  it('uses aria-label as the accessible name', () => {
    render(<IconButton aria-label="Close" icon={<CloseIcon />} />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders as a real <button> with type="button" by default', () => {
    render(<IconButton aria-label="Close" icon={<CloseIcon />} />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies a 44px touch target', () => {
    render(<IconButton aria-label="Close" icon={<CloseIcon />} />);
    // size-11 = 44px in the Tailwind scale
    expect(screen.getByRole('button').className).toContain('size-11');
  });

  it('fires onClick when activated', async () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Close" icon={<CloseIcon />} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Close" icon={<CloseIcon />} onClick={onClick} disabled />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets aria-busy and disables while loading', () => {
    render(<IconButton aria-label="Close" icon={<CloseIcon />} loading />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('forwards ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton aria-label="Close" icon={<CloseIcon />} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it.each(['ghost', 'secondary', 'primary', 'danger'] as const)(
    'renders the %s variant without crashing',
    (variant) => {
      render(<IconButton aria-label="Action" icon={<CloseIcon />} variant={variant} />);
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    }
  );

  it('has no accessibility violations', async () => {
    const { container } = render(<IconButton aria-label="Close" icon={<CloseIcon />} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
