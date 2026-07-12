import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icon';
import type { CategoryTileProps } from './CategoryTile.types';

/**
 * CategoryTile molecule — a category entry point. The whole tile is a single
 * `<a>`, so the entire card is one keyboard tab stop and one click target
 * (no nested interactive elements). Composes the Icon atom for the glyph.
 */
export const CategoryTile = forwardRef<HTMLAnchorElement, CategoryTileProps>(
  ({ icon, name, productCount, href, className, ...props }, ref) => {
    const count = `${productCount.toLocaleString()} ${productCount === 1 ? 'product' : 'products'}`;

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'group flex w-full flex-col gap-s rounded-l border border-border-default bg-bg-surface p-l',
          'no-underline transition-colors hover:bg-bg-hover',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        <span className="inline-flex size-10 items-center justify-center rounded-m bg-brand-bg-default text-brand-icon-default">
          <Icon size="md">{icon}</Icon>
        </span>
        <span className="text-base font-semibold text-content-primary">{name}</span>
        <span className="text-sm text-content-tertiary">{count}</span>
      </a>
    );
  }
);

CategoryTile.displayName = 'CategoryTile';

export type { CategoryTileProps } from './CategoryTile.types';
