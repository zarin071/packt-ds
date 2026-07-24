import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import type { PaginationDotsProps } from './PaginationDots.types';

/**
 * PaginationDots molecule — dot navigation for carousels/sliders. Each dot is
 * a real `<button>` with `aria-label="Go to slide N"` and `aria-current` on the
 * active one. The active dot is also a wider pill (not just a colour change),
 * so its state isn't communicated by colour alone.
 */
export const PaginationDots = forwardRef<HTMLDivElement, PaginationDotsProps>(
  ({ count, activeIndex, onSelect, label = 'Slide navigation', className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cn('inline-flex items-center gap-xs font-sans', className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={`dot-${index}`}
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={active || undefined}
            className={cn(
              'inline-flex items-center justify-center rounded-pill p-2xs',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2'
            )}
          >
            <span
              className={cn(
                'block rounded-pill transition-all',
                active ? 'h-2 w-6 bg-brand-bg-selected' : 'size-2 bg-content-tertiary'
              )}
            />
          </button>
        );
      })}
    </div>
  )
);

PaginationDots.displayName = 'PaginationDots';

export type { PaginationDotsProps } from './PaginationDots.types';
