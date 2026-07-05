import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a spinner in place of the leading icon, sets aria-busy, and disables interaction. */
  loading?: boolean;
  /** Icon rendered before the label. Always aria-hidden — the label provides the accessible name. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. Always aria-hidden. */
  trailingIcon?: ReactNode;
  /**
   * Render as the single child element (via Radix Slot) instead of a native `<button>` —
   * e.g. to make a router `<Link>` look like a Button while keeping its own tag/behavior.
   * When true, `loading`/`leadingIcon`/`trailingIcon` are ignored; compose them into
   * the child yourself.
   */
  asChild?: boolean;
}
