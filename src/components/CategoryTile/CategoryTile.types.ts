import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface CategoryTileProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Icon representing the category. Always aria-hidden — the name is the label. */
  icon: ReactNode;
  /** Category name. */
  name: string;
  /** Number of products in the category. */
  productCount: number;
  /** Destination URL — the whole tile is a single link. */
  href: string;
}
