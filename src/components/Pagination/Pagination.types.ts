import type { HTMLAttributes } from 'react';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total number of pages. */
  totalPages: number;
  /** Current active page (1-indexed). */
  currentPage: number;
  /** Number of page buttons visible either side of the active page. */
  siblingCount?: number;
  /** Called with the target page number when a page or arrow is activated. */
  onPageChange: (page: number) => void;
}
