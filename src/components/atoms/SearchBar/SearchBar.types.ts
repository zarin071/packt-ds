import type { InputHTMLAttributes } from 'react';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  /** Controlled value of the search input. */
  value?: string;
  /** Standard change handler — fires on every keystroke. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called with the current value when the user submits a search (Enter key). */
  onSearch?: (value: string) => void;
  /** Called when the clear ("x") button is pressed. */
  onClear?: () => void;
  /** Shows a spinner in place of the search icon and disables the clear button. */
  loading?: boolean;
}
