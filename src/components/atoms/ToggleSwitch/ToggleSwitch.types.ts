import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import type * as SwitchPrimitive from '@radix-ui/react-switch';

export type ToggleSwitchRef = ElementRef<typeof SwitchPrimitive.Root>;
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleSwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Visible label rendered beside the toggle. */
  label?: string;
  size?: ToggleSize;
}
