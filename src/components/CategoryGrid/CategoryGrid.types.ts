import type { HTMLAttributes } from 'react';
import type { CategoryTileProps } from '../CategoryTile';

export type CategoryGridItem = Pick<CategoryTileProps, 'icon' | 'name' | 'productCount' | 'href'>;

export interface CategoryGridProps extends HTMLAttributes<HTMLElement> {
  items: CategoryGridItem[];
  /** Optional section heading rendered above the grid. */
  heading?: string;
}
