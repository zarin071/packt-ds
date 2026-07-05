import type { HTMLAttributes, ReactNode } from 'react';

export type TabVariant = 'default' | 'brand';

export interface TabItem {
  key: string;
  label: string;
  /** Optional icon displayed before the label. Always aria-hidden. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir' | 'defaultValue'> {
  items: TabItem[];
  variant?: TabVariant;
  /** Controlled active tab key. */
  activeKey?: string;
  /** Default active tab key (uncontrolled). */
  defaultActiveKey?: string;
  /** Fired when a tab is selected. */
  onChange?: (key: string) => void;
  /** Accessible label for the tablist when no visible heading describes it. */
  'aria-label'?: string;
}
