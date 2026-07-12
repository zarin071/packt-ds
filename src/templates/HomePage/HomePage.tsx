import { useState } from 'react';
import { SiteHeader } from '../../components/SiteHeader';
import { CategoryNav } from '../../components/CategoryNav';
import { CountdownTimer } from '../../components/CountdownTimer';
import { HeroCarousel } from '../../components/HeroCarousel';
import { ProductCard } from '../../components/ProductCard';
import { ProductCarouselSection } from '../../components/ProductCarouselSection';
import { CategoryGrid } from '../../components/CategoryGrid';
import { FeatureSpotlight } from '../../components/FeatureSpotlight';
import { AuthorCard } from '../../components/AuthorCard';
import { AuthCTA } from '../../components/AuthCTA';
import { SiteFooter } from '../../components/SiteFooter';
import { Button } from '../../components/Button';
import type { HomePageProps, HomeProduct } from './HomePage.types';

/** ProductCard with its own format-selection state, for a self-contained demo. */
function HomeProductCard({ product }: { product: HomeProduct }) {
  const priceOptions =
    product.formats && product.formats.length > 0
      ? product.formats.map((format, i) => ({
          format,
          label: FORMAT_LABELS[format],
          price: i === 0 ? product.price : product.price + 10,
          originalPrice: i === 0 ? product.originalPrice : undefined,
        }))
      : [{ format: 'ebook', label: FORMAT_LABELS.ebook, price: product.price, originalPrice: product.originalPrice }];

  const [selected, setSelected] = useState(priceOptions[0].format);

  return (
    <ProductCard
      coverSrc={product.coverSrc}
      coverAlt={product.coverAlt}
      title={product.title}
      meta={product.meta}
      rating={product.rating}
      ratingCount={product.ratingCount}
      formats={product.formats}
      priceOptions={priceOptions}
      selectedFormat={selected}
      onSelectFormat={setSelected}
    />
  );
}

const FORMAT_LABELS: Record<string, string> = {
  ebook: 'E-book',
  paperback: 'Paperback',
  video: 'Video',
  audiobook: 'Audiobook',
};

function HeroPromo({ title, copy, ctaLabel, ctaHref }: { title: string; copy: string; ctaLabel: string; ctaHref: string }) {
  return (
    <div className="flex min-h-56 flex-col items-start justify-center gap-m bg-brand-bg-default px-2xl py-2xl">
      <h2 className="m-0 text-2xl font-bold text-content-primary md:text-3xl">{title}</h2>
      <p className="m-0 max-w-[42rem] text-sm text-content-secondary">{copy}</p>
      <Button asChild variant="primary">
        <a href={ctaHref}>{ctaLabel}</a>
      </Button>
    </div>
  );
}

/**
 * HomePage template — composes the storefront organisms in packtpub.com's
 * section order. Presentational: all content comes from `data`.
 */
export function HomePage({ data }: HomePageProps) {
  return (
    <div className="min-h-screen bg-bg-page">
      <SiteHeader logo={data.logo} links={data.headerLinks} cartCount={data.cartCount} />

      <div className="border-b border-border-default bg-bg-surface px-l py-s">
        <div className="mx-auto max-w-[80rem]">
          <CategoryNav items={data.categories} />
        </div>
      </div>

      <main className="mx-auto flex max-w-[80rem] flex-col gap-4xl px-l py-2xl">
        {/* Countdown strip */}
        <section
          aria-label={data.saleLabel}
          className="flex flex-col items-center gap-l rounded-l bg-brand-bg-selected px-2xl py-l text-center md:flex-row md:justify-between md:text-left"
        >
          <div className="flex flex-col gap-2xs">
            <p className="m-0 text-lg font-bold text-brand-text-on-brand">{data.saleLabel}</p>
            <p className="m-0 text-sm text-brand-text-on-brand opacity-90">Ends soon — don't miss out.</p>
          </div>
          <div className="rounded-m bg-bg-surface px-l py-m">
            <CountdownTimer endsAt={data.saleEndsAt} />
          </div>
          <Button asChild variant="secondary">
            <a href={data.saleCtaHref}>{data.saleCtaLabel}</a>
          </Button>
        </section>

        {/* Hero */}
        <HeroCarousel
          label="Featured promotions"
          slides={data.heroSlides.map((slide) => ({
            id: slide.id,
            content: <HeroPromo title={slide.title} copy={slide.copy} ctaLabel={slide.ctaLabel} ctaHref={slide.ctaHref} />,
          }))}
        />

        {/* Best Sellers / Latest / Trending */}
        {data.productSections.map((section) => (
          <ProductCarouselSection key={section.id} title={section.title}>
            {section.products.map((product) => (
              <HomeProductCard key={product.id} product={product} />
            ))}
          </ProductCarouselSection>
        ))}

        {/* Expert Reading Lists */}
        <ProductCarouselSection title={data.readingLists.title}>
          {data.readingLists.products.map((product) => (
            <HomeProductCard key={product.id} product={product} />
          ))}
        </ProductCarouselSection>

        {/* Category grid */}
        <CategoryGrid heading={data.gridHeading} items={data.gridCategories} />

        {/* Feature spotlight pair */}
        <div className="grid gap-l md:grid-cols-2">
          {data.spotlights.map((spotlight) => (
            <FeatureSpotlight
              key={spotlight.id}
              eyebrow={spotlight.eyebrow}
              title={spotlight.title}
              description={spotlight.description}
              ctaLabel={spotlight.ctaLabel}
              ctaHref={spotlight.ctaHref}
            />
          ))}
        </div>

        {/* Partners strip */}
        <section aria-label={data.partnersLabel} className="flex flex-col items-center gap-l rounded-l border border-border-default bg-bg-surface px-2xl py-xl">
          <p className="m-0 text-xs font-semibold uppercase tracking-wide text-content-tertiary">{data.partnersLabel}</p>
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-2xl p-0">
            {data.partners.map((partner) => (
              <li key={partner.name} className="text-lg font-bold text-content-tertiary">
                {partner.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Author carousel */}
        <ProductCarouselSection title={data.authorsTitle}>
          {data.authors.map((author) => (
            <AuthorCard
              key={author.id}
              name={author.name}
              role={author.role}
              bio={author.bio}
              avatarSrc={author.avatarSrc}
              initials={author.initials}
              links={author.links}
              className="h-full"
            />
          ))}
        </ProductCarouselSection>

        {/* Auth CTA */}
        <AuthCTA />
      </main>

      <SiteFooter columns={data.footerColumns} socialLinks={data.footerSocial} copyright={data.copyright} />
    </div>
  );
}

HomePage.displayName = 'HomePage';

export type { HomePageProps, HomePageData } from './HomePage.types';
