import type { HTMLAttributes, ReactNode } from 'react';

export interface SiteHeaderLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Brand slot (logo image or text). Wrapped in a link to `homeHref`. */
  logo: ReactNode;
  homeHref?: string;
  /** Primary navigation links (desktop inline, mobile drawer). */
  links: SiteHeaderLink[];
  /** Search submit callback (SearchBar). */
  onSearch?: (query: string) => void;
  /** Cart badge count. Hidden when 0/undefined. */
  cartCount?: number;
  onCartClick?: () => void;
  onAccountClick?: () => void;
}
