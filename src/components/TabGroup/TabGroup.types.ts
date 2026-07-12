import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Tabs } from '../Tab';

export interface TabGroupItem {
  /** Unique value linking the tab to its panel. */
  value: string;
  /** Visible tab label. */
  label: string;
  /** Optional leading icon. Always aria-hidden. */
  icon?: ReactNode;
  /** Panel content shown when this tab is active. Omit for a tablist-only group. */
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabGroupProps extends Omit<ComponentPropsWithoutRef<typeof Tabs>, 'children'> {
  items: TabGroupItem[];
  /** Accessible label for the tablist when no visible heading describes it. */
  label?: string;
}
