import type { HTMLAttributes, ReactNode } from 'react';
import { InboxIcon } from '../icons';
import styles from './EmptyState.module.css';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom illustration or icon node. Defaults to InboxIcon. */
  icon?: ReactNode;
  /** Heading text. */
  title: string;
  /** Supporting description. */
  description?: string;
  /** Action area (e.g. a Button). */
  action?: ReactNode;
}

/**
 * EmptyState molecule.
 *
 * Tokens: `--packt-semantic-colors-light-content-primary` (title),
 * `--packt-semantic-colors-light-content-secondary` (description),
 * `--packt-semantic-colors-light-icon-primary` (icon color),
 * `--packt-space-xl/2-xl`, `--packt-size-24/16/14`.
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) => (
  <div
    className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
    {...rest}
  >
    <span className={styles.icon} aria-hidden="true">
      {icon ?? <InboxIcon />}
    </span>
    <h3 className={styles.title}>{title}</h3>
    {description && <p className={styles.description}>{description}</p>}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

EmptyState.displayName = 'EmptyState';
