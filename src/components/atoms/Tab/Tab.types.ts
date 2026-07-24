import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Trigger } from '@radix-ui/react-tabs';

export interface TabProps extends ComponentPropsWithoutRef<typeof Trigger> {
  /** Optional leading icon. Always aria-hidden — the tab label is the accessible name. */
  icon?: ReactNode;
}
