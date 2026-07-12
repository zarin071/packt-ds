import type { HTMLAttributes, ReactNode } from 'react';

export interface ProductCarouselSectionProps extends HTMLAttributes<HTMLElement> {
  /** Section heading, also the carousel's accessible name. */
  title: string;
  /** The slides — typically ProductCards. Each child becomes one slide. */
  children: ReactNode;
}
