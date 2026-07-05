import type { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** Marks the current page — renders as `<span>` with `aria-current="page"`. */
  active?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Custom separator node. Defaults to ChevronRight. Always rendered aria-hidden. */
  separator?: ReactNode;
}
