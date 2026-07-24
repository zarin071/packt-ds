import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { ToggleSwitch } from './ToggleSwitch';
import type { ToggleSwitchRef } from './ToggleSwitch.types';

describe('ToggleSwitch', () => {
  it('renders an unchecked switch by default', () => {
    render(<ToggleSwitch label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).not.toBeChecked();
  });

  it('renders with a label', () => {
    render(<ToggleSwitch label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('calls onCheckedChange when toggled', async () => {
    const onCheckedChange = vi.fn();
    render(<ToggleSwitch label="Toggle" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('reflects controlled checked state', () => {
    render(<ToggleSwitch label="On" checked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('is disabled and cannot be toggled', async () => {
    const onCheckedChange = vi.fn();
    render(<ToggleSwitch label="Disabled" disabled onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole('switch');
    expect(sw).toBeDisabled();
    await userEvent.click(sw);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('forwards ref to the switch root', () => {
    const ref = createRef<ToggleSwitchRef>();
    render(<ToggleSwitch label="Ref" ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ToggleSwitch label="Enable feature" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
