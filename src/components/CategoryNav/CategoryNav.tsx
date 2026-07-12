import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type { CategoryNavProps } from './CategoryNav.types';

/**
 * CategoryNav organism — a horizontally scrollable strip of category links.
 * A real `<nav>` landmark; the active category carries `aria-current="page"`
 * and brand styling (pill fill, not colour-only: it is also the only filled pill).
 */
export const CategoryNav = forwardRef<HTMLElement, CategoryNavProps>(
  ({ items, label = 'Categories', className, ...props }, ref) => (
    <nav ref={ref} aria-label={label} className={cn('w-full font-sans', className)} {...props}>
      <ul className="m-0 flex list-none items-center gap-xs overflow-x-auto p-0 pb-2xs">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'inline-flex items-center whitespace-nowrap rounded-pill border px-m py-xs text-sm font-medium no-underline transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
                item.active
                  ? 'border-brand-bg-selected bg-brand-bg-selected font-semibold text-brand-text-on-brand'
                  : 'border-border-default bg-bg-surface text-content-secondary hover:bg-bg-hover hover:text-content-primary'
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
);

CategoryNav.displayName = 'CategoryNav';

export type { CategoryNavProps, CategoryNavItem } from './CategoryNav.types';
