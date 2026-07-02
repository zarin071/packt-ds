import type { HTMLAttributes, ReactNode } from 'react';
import { CloseIcon } from '../icons';
import styles from './Tag.module.css';

export type TagVariant = 'default' | 'brand' | 'info' | 'success' | 'warning' | 'error';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  /** Renders a remove (×) button and fires this callback when clicked. */
  onRemove?: () => void;
  /** Optional leading icon. */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Tag / Chip molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-{variant}-default` (fill),
 * `--packt-semantic-colors-light-content-{variant}-default` (text),
 * `--packt-semantic-colors-light-border-{variant}` (border),
 * `--packt-radius-pill`, `--packt-space-xs/s`, `--packt-size-12`.
 */
export const Tag = ({
  variant = 'default',
  onRemove,
  icon,
  children,
  className,
  ...rest
}: TagProps) => (
  <span
    className={[styles.tag, styles[variant], className ?? ''].filter(Boolean).join(' ')}
    {...rest}
  >
    {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
    <span className={styles.label}>{children}</span>
    {onRemove && (
      <button
        type="button"
        className={styles.remove}
        onClick={onRemove}
        aria-label="Remove"
      >
        <CloseIcon />
      </button>
    )}
  </span>
);

Tag.displayName = 'Tag';
