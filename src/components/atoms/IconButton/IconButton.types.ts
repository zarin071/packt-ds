import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'ghost' | 'secondary' | 'primary' | 'danger';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'> {
  /** The icon to render. Always hidden from assistive tech — the label names the button. */
  icon: ReactNode;
  variant?: IconButtonVariant;
  /** Spinner + aria-busy; also disables interaction. */
  loading?: boolean;
  /**
   * Accessible name describing the action (e.g. "Close dialog"). REQUIRED and
   * TS-enforced: an icon-only button has no text, so this is its only label.
   */
  'aria-label': string;
}
