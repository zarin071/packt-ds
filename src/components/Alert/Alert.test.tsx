import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders a status role for info variant', () => {
    render(<Alert variant="info" title="Info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders a status role for success variant', () => {
    render(<Alert variant="success" title="Done" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders an alert role for warning variant', () => {
    render(<Alert variant="warning" title="Warning" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders an alert role for error variant', () => {
    render(<Alert variant="error" title="Error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays the title text', () => {
    render(<Alert title="Something happened" />);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('displays description text', () => {
    render(<Alert title="Note" description="Check your inbox." />);
    expect(screen.getByText('Check your inbox.')).toBeInTheDocument();
  });

  it('renders children as description when description prop is absent', () => {
    render(<Alert title="Info">Child content here</Alert>);
    expect(screen.getByText('Child content here')).toBeInTheDocument();
  });

  it('renders a dismiss button when onClose is provided', () => {
    render(<Alert title="Info" onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onClose when the dismiss button is clicked', async () => {
    const onClose = vi.fn();
    render(<Alert title="Info" onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render a dismiss button without onClose', () => {
    render(<Alert title="Info" />);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Alert title="Done" description="Saved." variant="success" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
