import type { HTMLAttributes } from 'react';

export type SocialPlatform = 'github' | 'twitter' | 'linkedin' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  /** Override the accessible name (defaults to the platform's display name). */
  label?: string;
}

export interface SocialLinksProps extends HTMLAttributes<HTMLUListElement> {
  links: SocialLink[];
  /** Accessible label for the list. */
  label?: string;
}
