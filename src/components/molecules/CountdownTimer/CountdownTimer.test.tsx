import { render, screen, act } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CountdownTimer } from './CountdownTimer';

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the remaining days/hrs/min/sec', () => {
    const endsAt = new Date(Date.now() + (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000);
    render(<CountdownTimer endsAt={endsAt} />);
    const timer = screen.getByRole('timer');
    expect(timer).toHaveTextContent('2days');
    expect(timer).toHaveTextContent('03hrs');
    expect(timer).toHaveTextContent('04min');
    expect(timer).toHaveTextContent('05sec');
  });

  it('uses aria-live="off" so it does not announce every second', () => {
    render(<CountdownTimer endsAt={new Date(Date.now() + 60_000)} />);
    expect(screen.getByRole('timer')).toHaveAttribute('aria-live', 'off');
  });

  it('ticks down over time', () => {
    render(<CountdownTimer endsAt={new Date(Date.now() + 10_000)} />);
    expect(screen.getByRole('timer')).toHaveTextContent('10sec');
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent('07sec');
  });

  it('calls onExpire exactly once when it reaches zero', () => {
    const onExpire = vi.fn();
    render(<CountdownTimer endsAt={new Date(Date.now() + 2000)} onExpire={onExpire} />);
    expect(onExpire).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it('fires onExpire on mount if already past', () => {
    const onExpire = vi.fn();
    render(<CountdownTimer endsAt={new Date(Date.now() - 1000)} onExpire={onExpire} />);
    expect(onExpire).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('timer')).toHaveTextContent('00sec');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CountdownTimer endsAt={new Date(Date.now() + 86_400_000)} />);
    // axe relies on real async scheduling — restore real timers for this check.
    vi.useRealTimers();
    expect(await axe(container)).toHaveNoViolations();
  });
});
