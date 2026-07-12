import type { InputProps } from '../Input';

export interface FormFieldProps extends Omit<InputProps, 'id'> {
  /** Visible label text (never placeholder-only). */
  label: string;
  /** Explicit id; generated when omitted. */
  id?: string;
  /** Helper text below the field. Replaced by `errorMessage` when set. */
  helperText?: string;
  /** Error message — sets aria-invalid and renders icon + text (not colour alone). */
  errorMessage?: string;
}
