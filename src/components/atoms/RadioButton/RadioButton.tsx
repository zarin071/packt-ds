import { forwardRef, useId } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { RadioButtonProps, RadioButtonRef } from './RadioButton.types';

export const radioButtonVariants = cva(
  [
    'peer relative inline-flex size-4 shrink-0 items-center justify-center',
    'rounded-circle border bg-bg-surface transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:border-border-disabled',
    'data-[state=checked]:border-brand-bg-selected',
    'disabled:data-[state=checked]:border-border-disabled',
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
 * RadioButton atom — a single Radix `RadioGroup.Item` + `RadioGroup.Indicator`.
 * Must be used inside a consumer-provided `RadioGroup.Root` (from
 * `@radix-ui/react-radio-group`), which owns the group's name/value/onValueChange —
 * this component only renders one option.
 */
export const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(
  ({ className, label, error, disabled, id, ...props }, ref) => {
    const reactId = useId();
    const inputId = id ?? reactId;
    const errorId = `${inputId}-error`;

    return (
      <div className="inline-flex flex-col gap-xs font-sans">
        <label htmlFor={inputId} className="inline-flex items-center gap-s cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-40">
          <RadioGroupPrimitive.Item
            ref={ref}
            id={inputId}
            className={cn(radioButtonVariants({ error: !!error }), className)}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          >
            <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
              <span
                aria-hidden="true"
                className={cn(
                  'size-1.5 rounded-circle bg-brand-bg-selected',
                  disabled && 'bg-content-disabled'
                )}
              />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
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

RadioButton.displayName = 'RadioButton';

export type { RadioButtonProps } from './RadioButton.types';
