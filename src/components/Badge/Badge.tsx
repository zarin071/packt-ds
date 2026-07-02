import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'brand' | 'info' | 'success' | 'warning' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Optional leading icon. */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Badge molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-{variant}-default` (fill),
 * `--packt-semantic-colors-light-content-{variant}-default` (text),
 * `--packt-semantic-colors-light-border-{variant}` (border),
 * `--packt-radius-xs`, `--packt-space-2-xs/xs`, `--packt-size-10/12`.
 */
export const Badge = ({
  variant = 'default',
  icon,
  children,
  className,
  ...rest
}: BadgeProps) => (
  <span
    className={[styles.badge, styles[variant], className ?? ''].filter(Boolean).join(' ')}
    {...rest}
  >
    {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
    <span>{children}</span>
  </span>
);

Badge.displayName = 'Badge';
