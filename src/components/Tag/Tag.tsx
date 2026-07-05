import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { CloseIcon } from '../icons';
import type { TagProps } from './Tag.types';

export const tagVariants = cva(
  'inline-flex items-center gap-2xs rounded-pill border px-s py-2xs text-xs font-medium leading-4 whitespace-nowrap',
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

/**
 * Tag / Chip molecule — same semantic variant set as Badge, plus an optional
 * removable (×) button. Shares the token mapping with Badge for consistency.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant, onRemove, icon, children, className, ...rest }, ref) => (
    <span ref={ref} className={cn(tagVariants({ variant }), className)} {...rest}>
      {icon && (
        <span className="inline-flex items-center [&>svg]:size-3" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          className={cn(
            'ml-2xs inline-flex items-center justify-center rounded-circle opacity-70 transition-opacity',
            'hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
            '[&>svg]:size-3'
          )}
          onClick={onRemove}
          aria-label="Remove"
        >
          <CloseIcon />
        </button>
      )}
    </span>
  )
);

Tag.displayName = 'Tag';

export type { TagProps, TagVariant } from './Tag.types';
