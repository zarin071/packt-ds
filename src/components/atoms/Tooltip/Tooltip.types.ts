import type { ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The tooltip text or node shown in the bubble. */
  content: ReactNode;
  position?: TooltipPosition;
  /** The trigger element. Must be a single focusable child. */
  children: ReactNode;
  /** Additional class for the tooltip content bubble. */
  className?: string;
  /** Delay (ms) before the tooltip opens on hover/focus. Default: 200ms. */
  delayDuration?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Default open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
}
