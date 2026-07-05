import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { BadgeProps } from './Badge.types';

export const badgeVariants = cva(
  'inline-flex items-center gap-2xs rounded-xs border px-xs py-2xs text-xs font-medium leading-none',
  {
    variants: {
      variant: {
        brand: 'border-brand-border-default bg-brand-tag-bg text-brand-tag-text',
        hub: 'border-hub-border-default bg-hub-tag-bg text-hub-tag-text',
        neutral: 'border-border-default bg-bg-page text-content-secondary',
        error: 'border-status-border-error bg-status-bg-error text-status-text-error',
        warning: 'border-status-border-warning bg-status-bg-warning text-status-text-warning',
        success: 'border-status-border-success bg-status-bg-success text-status-text-success',
        info: 'border-status-border-info bg-status-bg-info text-status-text-info',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

export type { BadgeProps, BadgeVariant } from './Badge.types';
