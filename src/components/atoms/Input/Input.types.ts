import type { InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  /** Error message string — applies error styling, sets aria-invalid="true". Boolean is derived internally with Boolean(error). */
  error?: string;
}
