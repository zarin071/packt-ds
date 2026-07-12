import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { CategoryTile } from '../CategoryTile';
import type { CategoryGridProps } from './CategoryGrid.types';

/**
 * CategoryGrid organism — a responsive grid of CategoryTiles
 * (2 columns on mobile, up to 4 on desktop).
 */
export const CategoryGrid = forwardRef<HTMLElement, CategoryGridProps>(
  ({ items, heading, className, ...props }, ref) => (
    <section
      ref={ref}
      aria-label={heading ?? 'Categories'}
      className={cn('flex w-full flex-col gap-l font-sans', className)}
      {...props}
    >
      {heading && <h2 className="m-0 text-xl font-semibold text-content-primary">{heading}</h2>}
      <ul className="m-0 grid list-none grid-cols-2 gap-l p-0 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.href}>
            <CategoryTile {...item} className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  )
);

CategoryGrid.displayName = 'CategoryGrid';

export type { CategoryGridProps, CategoryGridItem } from './CategoryGrid.types';
