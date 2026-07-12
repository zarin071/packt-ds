import type { HTMLAttributes } from 'react';

export interface CategoryNavItem {
  label: string;
  href: string;
  /** Marks the current category — gets aria-current="page" + brand styling. */
  active?: boolean;
}

export interface CategoryNavProps extends HTMLAttributes<HTMLElement> {
  items: CategoryNavItem[];
  /** Accessible name for the nav landmark. */
  label?: string;
}
