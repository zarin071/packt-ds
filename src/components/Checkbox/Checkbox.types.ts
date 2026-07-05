import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export type CheckboxRef = ElementRef<typeof CheckboxPrimitive.Root>;

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked' | 'asChild'> {
  /** Visible label rendered beside the checkbox. */
  label?: string;
  /**
   * Controlled checked state. Accepts Radix's `'indeterminate'` value directly,
   * in addition to `true`/`false`.
   */
  checked?: boolean | 'indeterminate';
  /** Shorthand for `checked="indeterminate"` — overrides `checked` visually when true. */
  indeterminate?: boolean;
  /** Error message — switches the box border to the error token and is announced via aria-describedby. */
  error?: string;
}
