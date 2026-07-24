import type { ComponentPropsWithoutRef } from 'react';
import type { Root } from '@radix-ui/react-label';

export interface LabelProps extends ComponentPropsWithoutRef<typeof Root> {
  /** Marks the associated field as required — renders a visible `*` plus an sr-only "(required)". */
  required?: boolean;
}
