import { forwardRef, useId } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { ToggleSwitchProps, ToggleSwitchRef } from './ToggleSwitch.types';

export const toggleSwitchVariants = cva(
  [
    'peer inline-flex shrink-0 items-center rounded-pill border border-transparent',
    'bg-neutral-300 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:bg-bg-disabled',
    'data-[state=checked]:bg-brand-bg-selected disabled:data-[state=checked]:bg-bg-disabled',
  ].join(' '),
  {
    variants: {
      size: {
        small: 'h-4 w-7 p-0.5',
        medium: 'h-5 w-9 p-0.5',
        large: 'h-6 w-11 p-[3px]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export const toggleSwitchThumbVariants = cva(
  [
    'pointer-events-none block rounded-circle bg-brand-text-on-brand shadow',
    'transition-transform',
  ].join(' '),
  {
    variants: {
      size: {
        small: 'size-3 data-[state=checked]:translate-x-3',
        medium: 'size-4 data-[state=checked]:translate-x-4',
        large: 'size-[18px] data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

/**
 * ToggleSwitch atom — built on Radix `Switch.Root` + `Switch.Thumb` for
 * correct keyboard/ARIA switch semantics. Renders an optional visible label.
 */
export const ToggleSwitch = forwardRef<ToggleSwitchRef, ToggleSwitchProps>(
  ({ className, label, size = 'medium', disabled, id, ...props }, ref) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-s font-sans cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-40'
        )}
      >
        <SwitchPrimitive.Root
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(toggleSwitchVariants({ size }), className)}
          {...props}
        >
          <SwitchPrimitive.Thumb className={toggleSwitchThumbVariants({ size })} />
        </SwitchPrimitive.Root>
        {label && <span className="text-sm leading-5 text-content-primary">{label}</span>}
      </label>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';

export type { ToggleSwitchProps, ToggleSize } from './ToggleSwitch.types';
