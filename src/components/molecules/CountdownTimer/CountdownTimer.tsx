import { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import type { CountdownTimerProps } from './CountdownTimer.types';

function segmentsFrom(remainingMs: number) {
  const totalSec = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return [
    { key: 'days', value: days, label: days === 1 ? 'day' : 'days', pad: false },
    { key: 'hrs', value: hrs, label: 'hrs', pad: true },
    { key: 'min', value: mins, label: 'min', pad: true },
    { key: 'sec', value: secs, label: 'sec', pad: true },
  ];
}

/**
 * CountdownTimer molecule — counts down to `endsAt`, updating every second.
 *
 * The live region is `aria-live="off"`: announcing a changing value every
 * second would flood a screen-reader user, so updates are silent and the
 * current value is available on demand when they navigate to it. `onExpire`
 * fires exactly once when the timer reaches zero.
 */
export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  ({ endsAt, onExpire, className, ...props }, ref) => {
    const target = endsAt.getTime();
    const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));

    // Keep the latest callback without re-subscribing the interval each render.
    const onExpireRef = useRef(onExpire);
    onExpireRef.current = onExpire;

    useEffect(() => {
      let expired = false;
      const tick = () => {
        const rem = Math.max(0, target - Date.now());
        setRemaining(rem);
        if (rem <= 0 && !expired) {
          expired = true;
          onExpireRef.current?.();
        }
      };
      tick(); // sync immediately so a late mount isn't a second behind
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, [target]);

    const segments = segmentsFrom(remaining);

    return (
      <div
        ref={ref}
        role="timer"
        aria-live="off"
        className={cn('inline-flex items-start gap-l font-sans tabular-nums', className)}
        {...props}
      >
        {segments.map((segment) => (
          <div key={segment.key} className="flex min-w-10 flex-col items-center">
            <span className="text-2xl font-semibold leading-none text-content-primary">
              {segment.pad ? String(segment.value).padStart(2, '0') : segment.value}
            </span>
            <span className="mt-2xs text-xs uppercase tracking-wide text-content-tertiary">
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    );
  }
);

CountdownTimer.displayName = 'CountdownTimer';

export type { CountdownTimerProps } from './CountdownTimer.types';
