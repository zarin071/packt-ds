import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronRightIcon } from '../icons';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** Marks the current page — renders as `<span>` with `aria-current="page"`. */
  active?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Custom separator node. Defaults to ChevronRight icon. */
  separator?: ReactNode;
}

/**
 * Breadcrumb molecule.
 *
 * Tokens: `--packt-semantic-colors-light-content-primary` (active),
 * `--packt-semantic-colors-light-content-tertiary` (visited links),
 * `--packt-semantic-colors-light-content-brand-default` (hover),
 * `--packt-semantic-colors-light-icon-primary` (separator),
 * `--packt-size-14`, `--packt-space-xs`.
 */
export const Breadcrumb = ({
  items,
  separator,
  className,
  ...rest
}: BreadcrumbProps) => {
  const sep = separator ?? <ChevronRightIcon />;

  return (
    <nav aria-label="Breadcrumb" className={[styles.nav, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {item.active || isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a className={styles.link} href={item.href ?? '#'}>
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {sep}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
