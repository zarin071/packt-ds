import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ChevronRightIcon } from '../../lib/icons';
import type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';

export const breadcrumbVariants = cva('font-sans');

/**
 * Breadcrumb molecule — plain semantic `<nav><ol>`, no Radix primitive needed
 * since native HTML + ARIA (`aria-label`, `aria-current="page"`) already
 * covers the accessibility requirements for breadcrumb navigation.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className, ...props }, ref) => {
    const sep = separator ?? <ChevronRightIcon />;

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn(breadcrumbVariants(), className)} {...props}>
        <ol className="flex flex-wrap items-center gap-2xs text-sm leading-5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="inline-flex items-center gap-2xs">
                {item.active || isLast ? (
                  <span className="font-medium text-content-primary" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a
                    className={cn(
                      'text-content-tertiary transition-colors hover:text-brand-text-default hover:underline',
                      'focus-visible:rounded-xs focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-focus-ring focus-visible:ring-offset-2'
                    )}
                    href={item.href ?? '#'}
                  >
                    {item.label}
                  </a>
                )}
                {!isLast && (
                  <span className="inline-flex items-center text-content-primary opacity-50 [&>svg]:size-3" aria-hidden="true">
                    {sep}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
