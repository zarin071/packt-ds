import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'hub' | 'neutral' | 'error' | 'warning' | 'success' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Optional leading icon. Always aria-hidden — the badge text is the accessible name. */
  icon?: ReactNode;
}
