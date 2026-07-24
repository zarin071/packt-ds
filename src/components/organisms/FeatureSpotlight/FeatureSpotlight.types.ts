import type { HTMLAttributes, ReactNode } from 'react';

export interface FeatureSpotlightProps extends HTMLAttributes<HTMLElement> {
  /** Small kicker line above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** CTA label + destination. Rendered as a Button-styled link. */
  ctaLabel: string;
  ctaHref: string;
  /** Optional media slot (image/illustration) shown beside the copy. */
  media?: ReactNode;
  /**
   * Hub context. The section sets `data-hub` so the hub token layer applies —
   * currently "packt" (Hub-Packt blue).
   */
  hub?: 'packt';
}
