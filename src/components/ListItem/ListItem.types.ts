import type { HTMLAttributes, ReactNode } from 'react';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Leading icon. Always aria-hidden. */
  icon?: ReactNode;
  /** Primary text. */
  title: string;
  /** Supporting text below the title. */
  description?: string;
  /** Trailing content (e.g. a Button, Badge, or icon). */
  action?: ReactNode;
  /** Applies the selected background and marks `aria-selected` (only when `interactive`). */
  selected?: boolean;
  /** Renders hover/focus affordances and a pointer cursor. */
  interactive?: boolean;
}
