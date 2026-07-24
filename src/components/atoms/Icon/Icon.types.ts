import type { HTMLAttributes, ReactNode } from 'react';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: IconSize;
  /** A single SVG icon (e.g. the output of an icon component). Sized via CSS and hidden from assistive tech. */
  children: ReactNode;
}
