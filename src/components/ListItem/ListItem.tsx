import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { ListItemProps } from './ListItem.types';

export const listItemVariants = cva(
  [
    'flex items-center gap-m px-l py-m font-sans',
    'border-b border-border-default last:border-b-0',
    'transition-colors',
  ].join(' '),
  {
    variants: {
      interactive: {
        true: 'cursor-pointer hover:bg-bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        false: '',
      },
      selected: {
        true: 'bg-bg-selected',
        false: 'bg-bg-surface',
      },
    },
    defaultVariants: {
      interactive: false,
      selected: false,
    },
  }
);

/**
 * ListItem molecule — a single row with optional leading icon, title/description,
 * and a trailing action slot. Plain semantic `<li>`; no Radix primitive needed.
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    { icon, title, description, action, selected = false, interactive = false, className, ...rest },
    ref
  ) => {
    const titleColor = selected ? 'text-content-selected' : 'text-content-primary';
    const descColor = selected ? 'text-content-selected' : 'text-content-secondary';

    return (
      <li
        ref={ref}
        className={cn(listItemVariants({ interactive, selected }), className)}
        aria-selected={interactive ? selected : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...rest}
      >
        {icon && (
          <span className={cn('flex shrink-0 items-center [&>svg]:size-5', titleColor)} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('truncate text-sm font-medium leading-5', titleColor)}>{title}</span>
          {description && (
            <span className={cn('truncate text-xs leading-4', descColor)}>{description}</span>
          )}
        </span>
        {action && <span className="flex shrink-0 items-center">{action}</span>}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export type { ListItemProps } from './ListItem.types';
