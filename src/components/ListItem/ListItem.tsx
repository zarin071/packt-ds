import type { HTMLAttributes, ReactNode } from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Leading icon. */
  icon?: ReactNode;
  /** Primary text. */
  title: string;
  /** Supporting text. */
  description?: string;
  /** Trailing content (e.g. button, badge, or icon). */
  action?: ReactNode;
  /** Applies selected background and marks `aria-selected`. */
  selected?: boolean;
  /** Renders hover states and pointer cursor. */
  interactive?: boolean;
}

/**
 * ListItem molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-primary` (bg),
 * `--packt-semantic-colors-light-background-selected` (selected bg),
 * `--packt-semantic-colors-light-background-hover` (hover),
 * `--packt-semantic-colors-light-content-primary/secondary` (text),
 * `--packt-semantic-colors-light-content-selected` (selected text),
 * `--packt-semantic-colors-light-icon-primary` (icon color),
 * `--packt-space-m/l`, `--packt-size-14/12`, `--packt-radius-s`.
 */
export const ListItem = ({
  icon,
  title,
  description,
  action,
  selected = false,
  interactive = false,
  className,
  ...rest
}: ListItemProps) => (
  <li
    className={[
      styles.item,
      selected ? styles.selected : '',
      interactive ? styles.interactive : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')}
    aria-selected={interactive ? selected : undefined}
    {...rest}
  >
    {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
    <span className={styles.content}>
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.description}>{description}</span>}
    </span>
    {action && <span className={styles.action}>{action}</span>}
  </li>
);

ListItem.displayName = 'ListItem';
