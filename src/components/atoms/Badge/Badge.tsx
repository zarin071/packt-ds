import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { BadgeProps } from './Badge.types';

// Height lives in each variant because neutral (bordered) is 18 px while
// solid-fill variants are 20 px — the border accounts for the 2 px delta.
const standardVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill px-[6.5px] font-sans text-xs font-normal leading-4',
  {
    variants: {
      variant: {
        neutral: 'h-[18px] min-w-[18px] border border-border-elevated bg-bg-elevated text-content-primary',
        brand:   'h-5 min-w-5 bg-brand-bg-selected text-content-primary',
        hub:     'h-5 min-w-5 bg-hub-bg-selected text-content-primary',
        error:   'h-5 min-w-5 bg-status-bg-error text-status-text-error',
        warning: 'h-5 min-w-5 bg-status-bg-warning text-status-text-warning',
        success: 'h-5 min-w-5 bg-status-bg-success text-status-text-success',
        info:    'h-5 min-w-5 bg-status-bg-info text-status-text-info',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
);

const dotVariants = cva('inline-block size-2 rounded-pill', {
  variants: {
    variant: {
      neutral: '',
      brand:   'bg-brand-bg-selected',
      hub:     'bg-hub-bg-selected',
      error:   'bg-status-icon-error',
      warning: 'bg-status-icon-warning',
      success: 'bg-status-icon-success',
      info:    'bg-status-icon-info',
    },
  },
  defaultVariants: { variant: 'neutral' },
});

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot, icon, children, ...props }, ref) => {
    if (dot) {
      return (
        <span
          ref={ref}
          className={cn(dotVariants({ variant }), className)}
          {...props}
        />
      );
    }
    return (
      <span ref={ref} className={cn(standardVariants({ variant }), className)} {...props}>
        {/* 12 px fixed container — matches Figma's size-[12px] icon slot; SVG fills it */}
        {icon && <span aria-hidden="true" className="inline-flex shrink-0 size-3 [&>svg]:size-full">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export type { BadgeProps, BadgeVariant } from './Badge.types';
