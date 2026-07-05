import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { ButtonProps } from './Button.types';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-xs whitespace-nowrap',
    'rounded-m border font-sans font-semibold transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-brand-bg-selected text-brand-text-on-brand hover:bg-brand-bg-selected-hover active:bg-brand-bg-selected-hover',
        secondary:
          'border-brand-border-default bg-brand-bg-default text-brand-text-default hover:bg-brand-bg-hover active:bg-brand-bg-pressed',
        ghost:
          'border-transparent bg-transparent text-content-primary hover:bg-bg-hover active:bg-bg-hover',
        danger:
          'border-transparent bg-status-border-error text-content-inverse hover:brightness-90 active:brightness-75',
      },
      size: {
        sm: 'h-8 gap-2xs px-s text-sm [&_svg]:size-4',
        md: 'h-10 gap-xs px-m text-sm [&_svg]:size-4',
        lg: 'h-12 gap-s px-l text-base [&_svg]:size-5',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Spinner = () => (
  <svg className="animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
    <path d="M14 8a6 6 0 0 1-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Button atom.
 *
 * Icon-only usage (no visible text child) must supply `aria-label` —
 * the icons rendered here are always aria-hidden.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leadingIcon,
      trailingIcon,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, loading }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner /> : leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
        {children}
        {!loading && trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
