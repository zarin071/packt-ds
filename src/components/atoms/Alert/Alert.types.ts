import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  /** Bold heading line. */
  title?: string;
  /** Supporting body text (or arbitrary children). */
  description?: ReactNode;
  /** Show the default variant icon. Pass a node to override it. Always aria-hidden. */
  icon?: boolean | ReactNode;
  /** Renders a close button and calls this when clicked. */
  onClose?: () => void;
}
