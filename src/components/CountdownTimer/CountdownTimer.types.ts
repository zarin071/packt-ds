import type { HTMLAttributes } from 'react';

export interface CountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
  /** The moment the countdown reaches zero. */
  endsAt: Date;
  /** Called once when the countdown reaches zero. */
  onExpire?: () => void;
}
