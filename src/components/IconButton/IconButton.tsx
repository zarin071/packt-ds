import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { IconButtonProps } from './IconButton.types';

export const iconButtonVariants = cva(
  [
    // size-11 = 44px, meeting the WCAG 2.2 minimum touch-target size.
    'inline-flex size-11 shrink-0 items-center justify-center rounded-m border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:size-5 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        secondary:
          'border-brand-border-default bg-brand-bg-default text-brand-text-default hover:bg-brand-bg-hover active:bg-brand-bg-pressed',
        ghost:
          'border-transparent bg-transparent text-content-primary hover:bg-bg-hover active:bg-bg-hover',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

const Spinner = () => (
  <svg className="size-5 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
    <path d="M14 8a6 6 0 0 1-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * IconButton atom — an icon-only button. `aria-label` is required and enforced
 * by the type system, since the icon carries no accessible name on its own.
 * The 44×44px target satisfies the minimum touch-target rule.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, icon, loading = false, disabled, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ variant, loading }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner /> : <span aria-hidden="true">{icon}</span>}
    </button>
  )
);

IconButton.displayName = 'IconButton';

export type { IconButtonProps, IconButtonVariant } from './IconButton.types';
