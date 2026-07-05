import { forwardRef, type ElementRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { ProgressBarProps } from './ProgressBar.types';

export const progressBarVariants = cva('relative w-full overflow-hidden rounded-pill bg-neutral-200', {
  variants: {
    size: {
      small: 'h-1',
      medium: 'h-2',
      large: 'h-3',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

/**
 * ProgressBar molecule, built on Radix Progress. The indicator's width/transform
 * is set via inline style bound to `value` (Radix's own recommended pattern) —
 * colors and everything else stay in Tailwind token utilities.
 */
export const ProgressBar = forwardRef<ElementRef<typeof ProgressPrimitive.Root>, ProgressBarProps>(
  ({ className, value, size, showLabel = false, label = 'Progress', ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, value));

    return (
      <div className="flex items-center gap-s font-sans">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressBarVariants({ size }), className)}
          value={clamped}
          max={100}
          aria-label={label}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="size-full flex-1 rounded-pill bg-brand-bg-selected transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${100 - clamped}%)` }}
          />
        </ProgressPrimitive.Root>
        {showLabel && (
          <span
            className="min-w-9 shrink-0 text-right text-xs font-medium leading-4 text-content-secondary"
            aria-hidden="true"
          >
            {clamped}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export type { ProgressBarProps, ProgressSize } from './ProgressBar.types';
