import type { HTMLAttributes, ReactNode } from 'react';

export interface ProductCarouselSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Section heading, also the carousel's accessible name. */
  title: string;
  /** The slides — typically ProductCards. Each element becomes one labelled slide. */
  items: ReactNode[];
}
