import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Icon } from '../Icon';
import { StarIcon, StarHalfIcon, StarOutlineIcon } from '../icons';
import type { RatingProps, RatingSize } from './Rating.types';

const MAX = 5;

export const ratingVariants = cva('inline-flex items-center gap-2xs font-sans align-middle', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const iconSize: Record<RatingSize, 'sm' | 'md'> = { sm: 'sm', md: 'md' };

function formatValue(v: number) {
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

/**
 * Rating atom — displays a 0–5 star rating (supports halves).
 *
 * The distinction between full, half, and empty stars is carried by the star
 * **shape** (filled / half-filled / outline), not colour alone, so it remains
 * legible for colour-blind users and in high-contrast modes. The whole control
 * is a single `role="img"` with a descriptive label; individual stars are
 * hidden from assistive tech.
 */
export const Rating = forwardRef<HTMLSpanElement, RatingProps>(
  ({ value, count, size = 'md', className, ...rest }, ref) => {
    const clamped = Math.max(0, Math.min(MAX, value));
    const rounded = Math.round(clamped * 2) / 2;

    const label =
      count != null
        ? `${formatValue(rounded)} out of ${MAX} stars, ${count} reviews`
        : `${formatValue(rounded)} out of ${MAX} stars`;

    return (
      <span
        ref={ref}
        role="img"
        aria-label={label}
        className={cn(ratingVariants({ size }), className)}
        {...rest}
      >
        <span className="inline-flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: MAX }, (_, i) => {
            const position = i + 1;
            if (rounded >= position) {
              return (
                <Icon key={i} size={iconSize[size]} className="text-brand-icon-default">
                  <StarIcon />
                </Icon>
              );
            }
            if (rounded >= position - 0.5) {
              return (
                <Icon key={i} size={iconSize[size]} className="text-brand-icon-default">
                  <StarHalfIcon />
                </Icon>
              );
            }
            return (
              <Icon key={i} size={iconSize[size]} className="text-content-tertiary">
                <StarOutlineIcon />
              </Icon>
            );
          })}
        </span>
        {count != null && (
          <span className="text-content-secondary" aria-hidden="true">
            ({count})
          </span>
        )}
      </span>
    );
  }
);

Rating.displayName = 'Rating';

export type { RatingProps, RatingSize } from './Rating.types';
