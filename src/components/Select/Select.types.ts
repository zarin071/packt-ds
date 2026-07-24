import type { ReactNode } from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    'value' | 'defaultValue' | 'onValueChange'
  > {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the control. Replaced by `error` when set. */
  helperText?: string;
  /** Error message; switches border + helper text to error tokens. */
  error?: string;
  size?: SelectSize;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  options?: SelectOption[];
  /** Marks the field as required and appends a `*` to the label. */
  required?: boolean;
  /** Disables the whole control. */
  disabled?: boolean;
  /** Controlled selected value. */
  value?: string;
  /** Default selected value (uncontrolled). */
  defaultValue?: string;
  /** Fired when the selected value changes. */
  onValueChange?: (value: string) => void;
  /** Additional class for the outer wrapper. */
  className?: string;
  /** Additional class for the trigger button. */
  triggerClassName?: string;
  /** id applied to the trigger, and referenced by the label's htmlFor. */
  id?: string;
  /** Name submitted with an ancestor form. */
  name?: string;
  children?: ReactNode;
}
