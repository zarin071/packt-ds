import type { ReactNode } from 'react';
import type { FormatType } from '../../components/molecules/FormatBadge';
import type { SiteHeaderLink } from '../../components/organisms/SiteHeader';
import type { CategoryNavItem } from '../../components/organisms/CategoryNav';
import type { CategoryGridItem } from '../../components/organisms/CategoryGrid';
import type { SocialLink } from '../../components/molecules/SocialLinks';
import type { FooterColumn } from '../../components/organisms/SiteFooter';

export interface HomeProduct {
  id: string;
  coverSrc: string;
  coverAlt: string;
  title: string;
  meta?: string;
  rating?: number;
  ratingCount?: number;
  formats?: FormatType[];
  price: number;
  originalPrice?: number;
}

export interface HomeProductSection {
  id: string;
  title: string;
  products: HomeProduct[];
}

export interface HomeSpotlight {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomeAuthor {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  avatarSrc?: string;
  initials?: string;
  links?: SocialLink[];
}

export interface HomePartner {
  name: string;
}

export interface HomePageData {
  /** Brand slot for the header. */
  logo: ReactNode;
  headerLinks: SiteHeaderLink[];
  cartCount?: number;
  categories: CategoryNavItem[];

  /** Countdown strip. */
  saleLabel: string;
  saleEndsAt: Date;
  saleCtaLabel: string;
  saleCtaHref: string;

  heroSlides: { id: string; title: string; copy: string; ctaLabel: string; ctaHref: string }[];

  /** Best Sellers / Latest / Trending, in order. */
  productSections: HomeProductSection[];
  /** Curated "Expert Reading Lists" carousel. */
  readingLists: HomeProductSection;

  gridHeading: string;
  gridCategories: CategoryGridItem[];

  /** Feature spotlights rendered as a pair (typically two). */
  spotlights: HomeSpotlight[];

  partnersLabel: string;
  partners: HomePartner[];

  authorsTitle: string;
  authors: HomeAuthor[];

  footerColumns: FooterColumn[];
  footerSocial: SocialLink[];
  copyright?: string;
}

export interface HomePageProps {
  data: HomePageData;
}
