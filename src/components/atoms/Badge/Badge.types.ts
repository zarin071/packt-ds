import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'hub' | 'neutral' | 'error' | 'warning' | 'success' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** When true, renders an 8 px solid dot instead of a pill with text. */
  dot?: boolean;
  /** Optional leading icon (standard mode only). Always aria-hidden. */
  icon?: ReactNode;
}
