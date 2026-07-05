import type { InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  /** Marks the field invalid — applies error styling and sets aria-invalid="true". */
  error?: boolean;
}
