import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import type { PriceProps } from './Price.types';

/**
 * Price atom — formats a monetary amount with `Intl.NumberFormat`, with an
 * optional struck-through original price for sale displays.
 *
 * The original price uses the `<s>` element plus an explicit `aria-label`
 * ("was $X"), so screen readers announce it as a former price rather than
 * reading a bare number whose strikethrough they may not convey.
 */
export const Price = forwardRef<HTMLSpanElement, PriceProps>(
  ({ amount, originalAmount, currency = 'USD', locale, className, ...rest }, ref) => {
    const format = (value: number) =>
      new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);

    const showOriginal = originalAmount != null && originalAmount > amount;

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-baseline gap-xs font-sans', className)}
        {...rest}
      >
        <span className="font-semibold text-content-primary">{format(amount)}</span>
        {showOriginal && (
          <s className="text-sm text-content-tertiary" aria-label={`was ${format(originalAmount)}`}>
            {format(originalAmount)}
          </s>
        )}
      </span>
    );
  }
);

Price.displayName = 'Price';

export type { PriceProps } from './Price.types';
