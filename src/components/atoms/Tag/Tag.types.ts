import type { HTMLAttributes, ReactNode } from 'react';

export type TagVariant = 'brand' | 'hub' | 'neutral' | 'error' | 'warning' | 'success' | 'info';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  /** Renders a remove (×) button and fires this callback when clicked. */
  onRemove?: () => void;
  /** Optional leading icon. Always aria-hidden. */
  icon?: ReactNode;
  children: ReactNode;
}
