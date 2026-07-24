import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from '../../lib/icons';
import type { PaginationProps } from './Pagination.types';

export const paginationButtonVariants = cva(
  [
    'inline-flex size-8 items-center justify-center rounded-xs border text-sm font-medium',
    'transition-colors cursor-pointer select-none [&>svg]:size-4',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:text-content-tertiary disabled:border-border-disabled',
  ].join(' '),
  {
    variants: {
      active: {
        true: 'border-brand-bg-selected bg-brand-bg-selected text-brand-text-on-brand hover:bg-brand-bg-selected-hover hover:border-brand-bg-selected-hover',
        false: 'border-border-default bg-bg-surface text-content-primary hover:bg-bg-hover',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

function buildPages(current: number, total: number, siblings: number): (number | '…')[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  const pages: (number | '…')[] = [1];
  if (left > 2) pages.push('…');
  pages.push(...range(left, right));
  if (right < total - 1) pages.push('…');
  if (total > 1) pages.push(total);

  return pages;
}

/**
 * Pagination molecule — prev/next arrows plus truncated page buttons. Plain
 * semantic `<nav>` with `aria-current="page"` on the active button.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ totalPages, currentPage, siblingCount = 1, onPageChange, className, ...rest }, ref) => {
    const pages = buildPages(currentPage, totalPages, siblingCount);

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('flex items-center gap-xs font-sans', className)}
        {...rest}
      >
        <button
          type="button"
          className={paginationButtonVariants({ active: false })}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>

        {pages.map((p, i) =>
          p === '…' ? (
            <span
              key={`ellipsis-${i}`}
              className="inline-flex size-8 items-center justify-center text-content-tertiary [&>svg]:size-4"
              aria-hidden="true"
            >
              <EllipsisIcon />
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={paginationButtonVariants({ active: p === currentPage })}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          className={paginationButtonVariants({ active: false })}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export type { PaginationProps } from './Pagination.types';
