import type { HTMLAttributes, ReactNode } from 'react';

export interface HeroSlide {
  id: string;
  /** Slide content — typically a promo layout. */
  content: ReactNode;
}

export interface HeroCarouselProps extends HTMLAttributes<HTMLElement> {
  slides: HeroSlide[];
  /** Accessible name for the carousel region. */
  label?: string;
}
