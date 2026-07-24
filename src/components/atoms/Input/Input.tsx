import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { InputProps } from './Input.types';

export const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-bg-surface text-content-primary transition-colors',
    'placeholder:text-content-tertiary',
    'focus-visible:outline-none focus-visible:ring-2',
    'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-content-disabled',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 px-s text-sm',
        md: 'h-10 px-m text-sm',
        lg: 'h-12 px-l text-base',
      },
      error: {
        true: 'border-status-border-error focus-visible:ring-status-border-error',
        false: 'border-border-default focus-visible:ring-focus-ring',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

/**
 * Input atom — a bare, styled `<input>`. Compose with the Label atom and your
 * own helper/error text at the field/molecule level; this component only
 * owns its own visual state (default/error) and doesn't render a label.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, disabled, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    const isInvalid = Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';

    return (
      <input
        ref={ref}
        className={cn(inputVariants({ size, error: isInvalid }), className)}
        disabled={disabled}
        aria-invalid={isInvalid || undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export type { InputProps, InputSize } from './Input.types';
