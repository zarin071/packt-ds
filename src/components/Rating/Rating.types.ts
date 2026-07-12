import type { HTMLAttributes } from 'react';

export type RatingSize = 'sm' | 'md';

export interface RatingProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Rating value from 0 to 5. Supports halves (e.g. 4.5); other fractions round to the nearest half. */
  value: number;
  /** Optional number of reviews. When set, it renders visibly and is included in the accessible label. */
  count?: number;
  size?: RatingSize;
}
