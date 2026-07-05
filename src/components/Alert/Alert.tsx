import { forwardRef, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, CloseIcon } from '../icons';
import type { AlertProps, AlertVariant } from './Alert.types';

export const alertVariants = cva(
  [
    'flex items-start gap-m rounded-m border p-l font-sans text-content-primary',
  ].join(' '),
  {
    variants: {
      variant: {
        info: 'border-status-border-info bg-status-bg-info',
        success: 'border-status-border-success bg-status-bg-success',
        warning: 'border-status-border-warning bg-status-bg-warning',
        error: 'border-status-border-error bg-status-bg-error',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const variantIconColor: Record<AlertVariant, string> = {
  info: 'text-status-icon-info',
  success: 'text-status-icon-success',
  warning: 'text-status-icon-warning',
  error: 'text-status-icon-error',
};

const variantIcon: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/** Alerts with error/warning severity are urgent enough to interrupt assistive tech
 * immediately (`role="alert"`); success/info are ambient confirmations announced
 * politely without stealing focus (`role="status"`). */
const variantRole: Record<AlertVariant, 'alert' | 'status'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
};

/**
 * Alert molecule — an inline banner for surfacing status messages.
 *
 * Not a Radix primitive: plain semantic HTML plus the right `role` (alert vs.
 * status, chosen from `variant`) already gives screen readers correct behavior.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = 'info', title, description, icon = true, onClose, children, ...props },
    ref
  ) => {
    const iconNode = icon === true ? variantIcon[variant] : icon || null;

    return (
      <div
        ref={ref}
        role={variantRole[variant]}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {iconNode && (
          <span
            aria-hidden="true"
            className={cn('mt-2xs flex shrink-0 [&>svg]:size-5', variantIconColor[variant])}
          >
            {iconNode}
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2xs">
          {title && <span className="text-sm font-semibold text-content-primary">{title}</span>}
          {(description || children) && (
            <span className="text-sm font-normal text-content-secondary">
              {description ?? children}
            </span>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className={cn(
              'inline-flex size-6 shrink-0 items-center justify-center rounded-xs text-content-primary',
              'hover:bg-bg-hover',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
              '[&>svg]:size-4'
            )}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export type { AlertProps, AlertVariant } from './Alert.types';
