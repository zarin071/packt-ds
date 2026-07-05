import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { InboxIcon } from '../icons';
import type { EmptyStateProps } from './EmptyState.types';

export const emptyStateVariants = cva(
  'flex flex-col items-center justify-center gap-m px-8 py-10 text-center font-sans'
);

/**
 * EmptyState molecule — a centered icon + title + optional description and action,
 * for empty lists, no-results, and first-run states. Plain semantic markup.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(emptyStateVariants(), className)}
      {...rest}
    >
      <span
        className="flex items-center justify-center text-content-tertiary opacity-60 [&>svg]:size-12"
        aria-hidden="true"
      >
        {icon ?? <InboxIcon />}
      </span>
      <h3 className="m-0 text-base font-semibold leading-6 text-content-primary">{title}</h3>
      {description && (
        <p className="m-0 max-w-[360px] text-sm leading-5 text-content-secondary">{description}</p>
      )}
      {action && <div className="mt-xs">{action}</div>}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';

export type { EmptyStateProps } from './EmptyState.types';
