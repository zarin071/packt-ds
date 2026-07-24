import type { InputProps } from '../Input';

export interface FormFieldProps extends Omit<InputProps, 'id'> {
  /** Visible label text (never placeholder-only). */
  label: string;
  /** Explicit id; generated when omitted. */
  id?: string;
  /** Helper text below the field. Replaced by `error` when set. */
  helperText?: string;
  // `error?: string` is inherited from InputProps — it sets aria-invalid and renders icon + text.
}
