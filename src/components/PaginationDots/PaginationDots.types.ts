import type { HTMLAttributes } from 'react';

export interface PaginationDotsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Total number of slides/dots. */
  count: number;
  /** Zero-based index of the active slide. */
  activeIndex: number;
  /** Called with the zero-based index when a dot is activated. */
  onSelect?: (index: number) => void;
  /** Accessible label for the dot group. */
  label?: string;
}
