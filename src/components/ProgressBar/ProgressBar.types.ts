import type { ComponentPropsWithoutRef } from 'react';
import type { Root } from '@radix-ui/react-progress';

export type ProgressSize = 'small' | 'medium' | 'large';

export interface ProgressBarProps extends Omit<ComponentPropsWithoutRef<typeof Root>, 'value' | 'max'> {
  /** Value 0–100. */
  value: number;
  size?: ProgressSize;
  /** Show the percentage label beside the bar. */
  showLabel?: boolean;
  /** Accessible label for the progress bar. */
  label?: string;
}
