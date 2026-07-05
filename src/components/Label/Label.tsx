import { forwardRef, type ElementRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { LabelProps } from './Label.types';

export const labelVariants = cva(
  'text-sm font-medium text-content-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

/**
 * Label atom, built on Radix Label so clicking the text focuses/activates
 * the associated control even when that control isn't a native form element.
 */
export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, required = false, children, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    >
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="ml-2xs text-status-text-error">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </LabelPrimitive.Root>
  )
);

Label.displayName = 'Label';

export type { LabelProps } from './Label.types';
