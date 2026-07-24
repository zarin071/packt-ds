import type { HTMLAttributes } from 'react';
import type { SocialLink } from '../../molecules/SocialLinks';

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  /** Copyright line. */
  copyright?: string;
}
