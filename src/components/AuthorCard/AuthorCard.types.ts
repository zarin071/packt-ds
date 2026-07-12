import type { HTMLAttributes } from 'react';
import type { SocialLink } from '../SocialLinks';

export interface AuthorCardProps extends HTMLAttributes<HTMLElement> {
  name: string;
  /** Role/tagline, e.g. "Author of React Anti-Patterns". */
  role?: string;
  /** Short bio, clamped to three lines. */
  bio?: string;
  avatarSrc?: string;
  /** Initials fallback when no avatar image. */
  initials?: string;
  /** Social profiles rendered via SocialLinks. */
  links?: SocialLink[];
}
