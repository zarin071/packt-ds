import { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icon';
import { Price } from '../Price';
import { CheckIcon } from '../icons';
import type { PriceBlockProps } from './PriceBlock.types';

/**
 * PriceBlock molecule — a single-select list of purchasable formats, each a
 * row of icon + label + Price. Built on native radio inputs (visually hidden)
 * inside a fieldset, so keyboard arrow-key selection and grouping semantics
 * come for free. The selected row is highlighted with Brand `bg-default`, and
 * also shows a check icon so the choice isn't communicated by colour alone.
 */
export const PriceBlock = forwardRef<HTMLFieldSetElement, PriceBlockProps>(
  ({ items, selectedFormat, onSelect, currency = 'USD', label = 'Choose a format', className, ...props }, ref) => {
    const name = useId();

    return (
      <fieldset ref={ref} className={cn('m-0 flex min-w-0 flex-col gap-s border-0 p-0 font-sans', className)} {...props}>
        <legend className="sr-only">{label}</legend>
        {items.map((option) => {
          const checked = option.format === selectedFormat;
          return (
            <label
              key={option.format}
              className={cn(
                'flex cursor-pointer items-center gap-m rounded-md border p-m transition-colors',
                'focus-within:outline-none focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2',
                checked
                  ? 'border-brand-border-default bg-brand-bg-default'
                  : // border-strong (not border-default) so the row outline stays
                    // visible on a same-coloured surface in dark mode.
                    'border-border-strong bg-bg-surface hover:bg-bg-hover'
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.format}
                checked={checked}
                onChange={() => onSelect?.(option.format)}
                className="sr-only"
              />
              {option.icon && (
                <Icon size="md" className={checked ? 'text-brand-text-default' : 'text-content-secondary'}>
                  {option.icon}
                </Icon>
              )}
              <span
                className={cn(
                  'flex-1 font-medium',
                  checked ? 'text-brand-text-default' : 'text-content-primary'
                )}
              >
                {option.label ?? option.format}
              </span>
              {checked && (
                <Icon size="sm" className="text-brand-text-default">
                  <CheckIcon />
                </Icon>
              )}
              <Price amount={option.price} originalAmount={option.originalPrice} currency={currency} />
            </label>
          );
        })}
      </fieldset>
    );
  }
);

PriceBlock.displayName = 'PriceBlock';

export type { PriceBlockProps, PriceOption } from './PriceBlock.types';
