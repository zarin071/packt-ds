import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export type RadioButtonRef = ElementRef<typeof RadioGroupPrimitive.Item>;

export interface RadioButtonProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Visible label rendered beside the radio. */
  label?: string;
  /** Error message — switches the ring border to the error token and is announced via aria-describedby. */
  error?: string;
}
