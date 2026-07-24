import type { HTMLAttributes } from 'react';

export type MaterialIconSize = 'sm' | 'md' | 'lg';

export interface MaterialIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols icon name (e.g. "check", "shopping_cart", "star"). */
  name: string;
  size?: MaterialIconSize;
  /**
   * Whether to render the filled variant (FILL=1).
   * Defaults to false (outlined appearance).
   */
  fill?: boolean;
  /** Font weight axis (100–700). Defaults to 400. */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** Grade axis — subtle emphasis without weight change. -25 | 0 | 200. */
  grade?: -25 | 0 | 200;
}
