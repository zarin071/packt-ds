import { forwardRef, type ElementRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { TooltipProps, TooltipPosition } from './Tooltip.types';

export const tooltipContentVariants = cva(
  [
    'z-50 max-w-[200px] text-balance rounded-xs bg-bg-selected px-s py-xs text-center text-xs',
    'text-content-selected',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ].join(' '),
  {
    variants: {},
  }
);

/**
 * Tooltip atom — built on Radix Tooltip for correct hover/focus timing,
 * portal-based positioning, and Escape-to-dismiss. Wraps its own
 * `Tooltip.Provider` so it works standalone without requiring consumers
 * to add one at the app root (a small perf tradeoff vs. sharing a single
 * provider across many tooltips).
 *
 * Tokens: `bg-bg-selected` (tip surface — dark in light mode, light in dark
 * mode), `content-selected` (tip text, inverse of surface), `radius-xs`.
 */
export const Tooltip = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, TooltipProps>(
  (
    {
      content,
      position = 'top',
      children,
      className,
      delayDuration = 200,
      open,
      defaultOpen,
      onOpenChange,
    },
    ref
  ) => {
    return (
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
          <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              side={position}
              sideOffset={8}
              className={cn(tooltipContentVariants(), className)}
            >
              {content}
              <TooltipPrimitive.Arrow className="fill-bg-selected" width={10} height={5} />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export type { TooltipProps, TooltipPosition } from './Tooltip.types';
