import { forwardRef, useId } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { CheckIcon, MinusIcon } from '../icons';
import type { CheckboxProps, CheckboxRef } from './Checkbox.types';

export const checkboxVariants = cva(
  [
    'peer inline-flex size-4 shrink-0 items-center justify-center',
    'rounded-xs border bg-bg-surface text-transparent transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:border-border-disabled',
    'data-[state=checked]:bg-brand-bg-selected data-[state=checked]:border-brand-bg-selected data-[state=checked]:text-brand-text-on-brand',
    'data-[state=indeterminate]:bg-brand-bg-selected data-[state=indeterminate]:border-brand-bg-selected data-[state=indeterminate]:text-brand-text-on-brand',
    'disabled:data-[state=checked]:bg-bg-disabled disabled:data-[state=checked]:border-border-disabled disabled:data-[state=checked]:text-content-disabled',
    'disabled:data-[state=indeterminate]:bg-bg-disabled disabled:data-[state=indeterminate]:border-border-disabled disabled:data-[state=indeterminate]:text-content-disabled',
  ].join(' '),
  {
    variants: {
      error: {
        true: 'border-status-border-error',
        false: 'border-border-default',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

/**
 * Checkbox atom — built on Radix `Checkbox.Root` + `Checkbox.Indicator` for
 * correct keyboard/ARIA handling of the tri-state (checked/unchecked/indeterminate)
 * value. Renders an optional visible label and error message; compose at the
 * field/molecule level for more complex layouts.
 */
export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  (
    {
      className,
      label,
      indeterminate = false,
      error,
      disabled,
      checked,
      id,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;
    const errorId = `${inputId}-error`;
    const resolvedChecked = indeterminate ? 'indeterminate' : checked;

    return (
      <div className="inline-flex flex-col gap-xs font-sans">
        <label htmlFor={inputId} className="inline-flex items-center gap-s cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-40">
          <CheckboxPrimitive.Root
            ref={ref}
            id={inputId}
            className={cn(checkboxVariants({ error: !!error }), className)}
            disabled={disabled}
            checked={resolvedChecked}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              {resolvedChecked === 'indeterminate' ? (
                <MinusIcon aria-hidden="true" style={{ fontSize: 12 }} />
              ) : (
                <CheckIcon aria-hidden="true" style={{ fontSize: 12 }} />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          {label && <span className="text-sm leading-5 text-content-primary">{label}</span>}
        </label>
        {error && (
          <span id={errorId} className="text-xs leading-4 text-status-text-error">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps } from './Checkbox.types';
