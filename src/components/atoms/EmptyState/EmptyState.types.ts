import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom illustration or icon node. Defaults to InboxIcon. Always aria-hidden. */
  icon?: ReactNode;
  /** Heading text. */
  title: string;
  /** Supporting description. */
  description?: string;
  /** Action area (e.g. a Button). */
  action?: ReactNode;
}
