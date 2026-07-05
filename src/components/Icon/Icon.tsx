import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { IconProps } from './Icon.types';

export const iconVariants = cva('inline-flex shrink-0 items-center justify-center [&>svg]:shrink-0', {
  variants: {
    size: {
      sm: '[&>svg]:size-4',
      md: '[&>svg]:size-5',
      lg: '[&>svg]:size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Icon atom — sizes an SVG child via CSS (overriding any width/height the
 * icon itself sets) and hides the whole wrapper from assistive tech. The
 * accessible name for an icon-only control must come from the control
 * itself (e.g. aria-label on the surrounding button), not from the icon.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size, children, ...props }, ref) => (
    <span ref={ref} className={cn(iconVariants({ size }), className)} aria-hidden="true" {...props}>
      {children}
    </span>
  )
);

Icon.displayName = 'Icon';

export type { IconProps, IconSize } from './Icon.types';
