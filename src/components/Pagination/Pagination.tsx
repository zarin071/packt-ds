import type { HTMLAttributes } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from '../icons';
import styles from './Pagination.module.css';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Total number of pages. */
  totalPages: number;
  /** Current active page (1-indexed). */
  currentPage: number;
  /** Number of page buttons visible either side of the active page. */
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

function buildPages(current: number, total: number, siblings: number): (number | '…')[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  const pages: (number | '…')[] = [1];
  if (left > 2) pages.push('…');
  pages.push(...range(left, right));
  if (right < total - 1) pages.push('…');
  if (total > 1) pages.push(total);

  return pages;
}

/**
 * Pagination molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-brand-selected` (active page bg),
 * `--packt-semantic-colors-light-content-selected` (active page text),
 * `--packt-semantic-colors-light-background-hover` (hover),
 * `--packt-semantic-colors-light-border-divide` (button borders),
 * `--packt-radius-xs`, `--packt-size-14/32`, `--packt-space-xs`, `--packt-focus-ring`.
 */
export const Pagination = ({
  totalPages,
  currentPage,
  siblingCount = 1,
  onPageChange,
  className,
  ...rest
}: PaginationProps) => {
  const pages = buildPages(currentPage, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={[styles.nav, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <button
        type="button"
        className={[styles.btn, styles.arrow].join(' ')}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden="true">
            <EllipsisIcon />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={[styles.btn, p === currentPage ? styles.active : ''].filter(Boolean).join(' ')}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        className={[styles.btn, styles.arrow].join(' ')}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';
