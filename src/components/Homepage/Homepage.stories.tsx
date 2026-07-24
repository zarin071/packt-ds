import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { SiteHeader } from '../SiteHeader';
import { HeroCarousel } from '../HeroCarousel';
import { CategoryNav } from '../CategoryNav';
import { ProductCarouselSection } from '../ProductCarouselSection';
import { ProductCard } from '../ProductCard';
import { CategoryGrid } from '../CategoryGrid';
import { FeatureSpotlight } from '../FeatureSpotlight';
import { AuthCTA } from '../AuthCTA';
import { SiteFooter } from '../SiteFooter';
import { Button } from '../Button';
import { Tag } from '../Tag';
import { CountdownTimer } from '../CountdownTimer';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getEndOfDay(): Date {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

function cover(bg: string, title: string, accent = '#ffffff'): string {
  const lines = title.length > 22 ? [title.slice(0, 22), title.slice(22)] : [title];
  const textY = lines.length === 2 ? 62 : 70;
  const rows = lines
    .map((l, i) => `<text x="100" y="${textY + i * 18}" text-anchor="middle" fill="${accent}" font-size="13" font-family="sans-serif" font-weight="bold">${l}</text>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect width="200" height="150" fill="${bg}"/>${rows}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function CategoryIcon({ d }: { d: string }): ReactNode {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Nav links
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { href: '/books', label: 'Books' },
  { href: '/videos', label: 'Videos' },
  { href: '/subscription', label: 'Subscription' },
  { href: '/free-learning', label: 'Free Learning' },
];

// ---------------------------------------------------------------------------
// Hero slides
// ---------------------------------------------------------------------------

function HeroSlide({
  eyebrow,
  headline,
  body,
  cta,
  bg,
  accent = '#fff',
}: {
  eyebrow?: string;
  headline: string;
  body: string;
  cta: string;
  bg: string;
  accent?: string;
}) {
  return (
    <div
      className="flex min-h-[280px] flex-col items-start justify-center gap-m px-2xl py-4xl md:max-w-[60%] md:py-6xl"
      style={{ background: bg }}
    >
      {eyebrow && (
        <span className="inline-block rounded-pill bg-white/20 px-m py-2xs text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
          {eyebrow}
        </span>
      )}
      <h1 className="m-0 text-3xl font-bold leading-tight md:text-4xl" style={{ color: accent }}>
        {headline}
      </h1>
      <p className="m-0 max-w-md text-sm leading-relaxed" style={{ color: accent, opacity: 0.85 }}>
        {body}
      </p>
      <Button size="lg" variant="primary">
        {cta}
      </Button>
    </div>
  );
}

const HERO_SLIDES = [
  {
    id: 'sale',
    content: (
      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 60%, #f97141 100%)' }} className="relative overflow-hidden">
        <HeroSlide
          eyebrow="Limited time offer"
          headline="Summer Sale — Up to 80% off"
          body="Thousands of tech books and video courses at record-low prices. Expand your skills without breaking the bank."
          cta="Shop the sale"
          bg="transparent"
          accent="#fff"
        />
        <div
          className="absolute inset-0 -z-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle at 80% 50%, rgba(249,113,65,0.25) 0%, transparent 60%)',
          }}
        />
      </div>
    ),
  },
  {
    id: 'subscription',
    content: (
      <div style={{ background: 'linear-gradient(135deg, #1d40b0 60%, #3c82f6 100%)' }}>
        <HeroSlide
          eyebrow="Packt Unlimited"
          headline="Every book. Every video. One subscription."
          body="Get unlimited access to 7,500+ expert-authored titles across programming, data science, cloud, and more — from just £12.99/month."
          cta="Start free trial"
          bg="transparent"
          accent="#fff"
        />
      </div>
    ),
  },
  {
    id: 'ai',
    content: (
      <div style={{ background: 'linear-gradient(135deg, #254a2f 60%, #3acd60 100%)' }}>
        <HeroSlide
          eyebrow="Now available"
          headline="Latest AI & GenAI titles"
          body="Stay ahead with our freshest releases covering LLMs, RAG pipelines, AI agents, and production-grade machine learning."
          cta="Browse AI books"
          bg="transparent"
          accent="#fff"
        />
      </div>
    ),
  },
];

// ---------------------------------------------------------------------------
// Category nav items
// ---------------------------------------------------------------------------

const CATEGORY_NAV = [
  { href: '/all', label: 'All', active: true },
  { href: '/programming', label: 'Programming' },
  { href: '/web-dev', label: 'Web Development' },
  { href: '/data-science', label: 'Data Science' },
  { href: '/cloud', label: 'Cloud & DevOps' },
  { href: '/ai-ml', label: 'AI & Machine Learning' },
  { href: '/security', label: 'Cybersecurity' },
  { href: '/mobile', label: 'Mobile Development' },
  { href: '/databases', label: 'Databases' },
  { href: '/game-dev', label: 'Game Development' },
];

// ---------------------------------------------------------------------------
// Product cards data
// ---------------------------------------------------------------------------

const TRENDING = [
  {
    id: 'p1',
    coverSrc: cover('#1a1a1a', 'Python Machine Learning', '#f97141'),
    coverAlt: 'Python Machine Learning book cover',
    title: 'Python Machine Learning, 4th Edition',
    meta: 'By Sebastian Raschka · Jan 2025',
    rating: 4.5,
    ratingCount: 312,
    formats: ['ebook', 'print'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 29.99, originalPrice: 39.99 },
      { format: 'print', label: 'Print', price: 44.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'p2',
    coverSrc: cover('#1d40b0', 'TypeScript Deep Dive'),
    coverAlt: 'TypeScript Deep Dive book cover',
    title: 'TypeScript Deep Dive: A Practical Guide',
    meta: 'By Yehuda Katz · Mar 2025',
    rating: 4,
    ratingCount: 194,
    formats: ['ebook'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 24.99, originalPrice: 34.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'p3',
    coverSrc: cover('#279544', 'Kubernetes in Production'),
    coverAlt: 'Kubernetes in Production book cover',
    title: 'Kubernetes in Production Environments',
    meta: 'By Brendan Burns · Feb 2025',
    rating: 5,
    ratingCount: 87,
    formats: ['ebook', 'video'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 34.99, originalPrice: 49.99 },
      { format: 'video', label: 'Video', price: 49.99, originalPrice: 69.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'p4',
    coverSrc: cover('#921d33', 'Hands-On LLMs'),
    coverAlt: 'Hands-On LLMs book cover',
    title: 'Hands-On Large Language Models',
    meta: 'By Jay Alammar · Apr 2025',
    rating: 4.5,
    ratingCount: 228,
    formats: ['ebook', 'print'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 39.99, originalPrice: 54.99 },
      { format: 'print', label: 'Print', price: 54.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'p5',
    coverSrc: cover('#484218', 'React 19 Complete Guide'),
    coverAlt: 'React 19 Complete Guide book cover',
    title: 'The Complete React 19 Developer Guide',
    meta: 'By Maximilian Schwarzmüller · May 2025',
    rating: 4,
    ratingCount: 415,
    formats: ['ebook', 'video'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 27.99, originalPrice: 39.99 },
      { format: 'video', label: 'Video', price: 44.99, originalPrice: 59.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'p6',
    coverSrc: cover('#4a2f25', 'AWS Solutions Architect'),
    coverAlt: 'AWS Solutions Architect book cover',
    title: 'AWS Certified Solutions Architect — Professional',
    meta: 'By Neal Davis · Jun 2025',
    rating: 4.5,
    ratingCount: 561,
    formats: ['ebook', 'print'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 32.99, originalPrice: 44.99 },
      { format: 'print', label: 'Print', price: 49.99 },
    ],
    selectedFormat: 'ebook',
  },
];

const NEW_RELEASES = [
  {
    id: 'n1',
    coverSrc: cover('#1f3a8a', 'RAG with LangChain'),
    coverAlt: 'RAG with LangChain book cover',
    title: 'Building RAG Applications with LangChain',
    meta: 'By Harrison Chase · Jun 2025',
    rating: 4.5,
    ratingCount: 43,
    formats: ['ebook'] as const,
    priceOptions: [{ format: 'ebook', label: 'eBook', price: 34.99 }],
    selectedFormat: 'ebook',
  },
  {
    id: 'n2',
    coverSrc: cover('#b81c3a', 'Zero Trust Security'),
    coverAlt: 'Zero Trust Security book cover',
    title: 'Zero Trust Security Architecture',
    meta: 'By Jason Garbis · May 2025',
    rating: 4,
    ratingCount: 29,
    formats: ['ebook', 'print'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 29.99, originalPrice: 39.99 },
      { format: 'print', label: 'Print', price: 44.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'n3',
    coverSrc: cover('#1a642d', 'Go Backend Development'),
    coverAlt: 'Go Backend Development book cover',
    title: 'Go Backend Development: APIs & Microservices',
    meta: 'By Jon Calhoun · Jun 2025',
    rating: 4,
    ratingCount: 18,
    formats: ['ebook'] as const,
    priceOptions: [{ format: 'ebook', label: 'eBook', price: 27.99 }],
    selectedFormat: 'ebook',
  },
  {
    id: 'n4',
    coverSrc: cover('#716613', 'dbt Analytics Engineering'),
    coverAlt: 'dbt Analytics Engineering book cover',
    title: 'dbt Analytics Engineering Cookbook',
    meta: 'By Mahesh Balija · May 2025',
    rating: 4.5,
    ratingCount: 36,
    formats: ['ebook', 'print'] as const,
    priceOptions: [
      { format: 'ebook', label: 'eBook', price: 31.99, originalPrice: 44.99 },
      { format: 'print', label: 'Print', price: 47.99 },
    ],
    selectedFormat: 'ebook',
  },
  {
    id: 'n5',
    coverSrc: cover('#6b1d2c', 'Rust Systems Programming'),
    coverAlt: 'Rust Systems Programming book cover',
    title: 'Rust Systems Programming, 2nd Edition',
    meta: 'By Tim McNamara · Jun 2025',
    rating: 5,
    ratingCount: 22,
    formats: ['ebook'] as const,
    priceOptions: [{ format: 'ebook', label: 'eBook', price: 33.99 }],
    selectedFormat: 'ebook',
  },
];

// ---------------------------------------------------------------------------
// Category grid items
// ---------------------------------------------------------------------------

// Icon paths (Heroicons-compatible 16px paths)
const ICONS = {
  code: 'M4.78 4.97a.75.75 0 0 0-1.06 1.06L5.94 8l-2.22 1.97a.75.75 0 1 0 1.06 1.06L7.5 8.53a.75.75 0 0 0 0-1.06L4.78 4.97Zm6.44 0L8.5 7.47a.75.75 0 0 0 0 1.06l2.72 2.5a.75.75 0 0 0 1.06-1.06L10.06 8l2.22-1.97a.75.75 0 0 0-1.06-1.06Z',
  globe: 'M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM2.5 7.25h2.25a10.8 10.8 0 0 1 .45-2.88A5.51 5.51 0 0 0 2.5 7.25Zm0 1.5a5.51 5.51 0 0 0 2.7 2.88 10.8 10.8 0 0 1-.45-2.88H2.5Zm5-4.52c-.62.3-1.25 1.22-1.63 2.64h3.26c-.38-1.42-1-2.35-1.63-2.64Zm0 9.04c.63-.29 1.25-1.22 1.63-2.64H5.87c.38 1.42 1 2.35 1.63 2.64Zm1.75-6.4A10.8 10.8 0 0 1 9.7 9.75h2.8a5.51 5.51 0 0 0-3.25-3Zm-.45 1.43a9.3 9.3 0 0 0 0 2.5h-3.6a9.3 9.3 0 0 1 0-2.5h3.6Zm.45 4.07a5.51 5.51 0 0 0 3.25-3h-2.8a10.8 10.8 0 0 1-.45 3Zm.45-7.57c.43.93.71 2.22.75 3.5h2.55A5.51 5.51 0 0 0 9.7 4.37ZM6.3 4.37A5.51 5.51 0 0 0 2.5 7.75h2.55c.04-1.28.32-2.57.75-3.38Z',
  chart: 'M1 3.75A.75.75 0 0 1 1.75 3h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 3.75ZM1 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 1 8Zm0 4.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Z',
  cloud: 'M4.5 9.75a4.5 4.5 0 0 1 8.872-1.125A3.25 3.25 0 0 1 13 14.75H4.5A4.75 4.75 0 0 1 4.5 9.75Zm3.5-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5 5.75a3.5 3.5 0 1 1 6.5 1.79 6 6 0 0 0-1.54-.29A3.5 3.5 0 0 1 5 5.75Z',
  shield: 'M8 1 2 3.5v4c0 3.1 2.49 5.43 6 6 3.51-.57 6-2.9 6-6v-4L8 1Zm0 7.5L6 7l-1 1 3 3 5-5-1-1L8 8.5Z',
  device: 'M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2h-9ZM3.5 3.5h9v7h-9v-7Zm4.25 8.25h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5Z',
  brain: 'M8 2a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 3 3v2.25a.75.75 0 0 0 1.5 0V11a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-3-3Zm0 1.5a1.5 1.5 0 0 1 1.5 1.5A3 3 0 0 0 8 6a3 3 0 0 0-1.5.41A1.5 1.5 0 0 1 8 3.5Zm0 4A1.5 1.5 0 1 1 8 11a1.5 1.5 0 0 1 0-3Z',
  gamepad: 'M4 5.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h2.5v1a.5.5 0 0 0 1 0v-1H10a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5H4ZM6 7v2H4.5V7H6Zm1.5 0H9v2H7.5V7Z',
};

const CATEGORY_ITEMS = [
  { href: '/programming', name: 'Programming', productCount: 2847, icon: <CategoryIcon d={ICONS.code} /> },
  { href: '/web-dev', name: 'Web Development', productCount: 1923, icon: <CategoryIcon d={ICONS.globe} /> },
  { href: '/data-science', name: 'Data Science', productCount: 1204, icon: <CategoryIcon d={ICONS.chart} /> },
  { href: '/cloud', name: 'Cloud & DevOps', productCount: 1587, icon: <CategoryIcon d={ICONS.cloud} /> },
  { href: '/security', name: 'Cybersecurity', productCount: 834, icon: <CategoryIcon d={ICONS.shield} /> },
  { href: '/mobile', name: 'Mobile Development', productCount: 712, icon: <CategoryIcon d={ICONS.device} /> },
  { href: '/ai-ml', name: 'AI & Machine Learning', productCount: 1095, icon: <CategoryIcon d={ICONS.brain} /> },
  { href: '/game-dev', name: 'Game Development', productCount: 329, icon: <CategoryIcon d={ICONS.gamepad} /> },
];

// ---------------------------------------------------------------------------
// Footer data
// ---------------------------------------------------------------------------

const FOOTER_COLUMNS = [
  {
    heading: 'Learn',
    links: [
      { href: '/books', label: 'Books' },
      { href: '/videos', label: 'Videos' },
      { href: '/subscription', label: 'Subscription' },
      { href: '/free-learning', label: 'Free Learning' },
      { href: '/new-releases', label: 'New Releases' },
    ],
  },
  {
    heading: 'Topics',
    links: [
      { href: '/programming', label: 'Programming' },
      { href: '/web-dev', label: 'Web Development' },
      { href: '/data-science', label: 'Data Science' },
      { href: '/ai-ml', label: 'AI & Machine Learning' },
      { href: '/cloud', label: 'Cloud & DevOps' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About Packt' },
      { href: '/authors', label: 'Write for Packt' },
      { href: '/partners', label: 'Partners' },
      { href: '/blog', label: 'Blog' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/help', label: 'Help Centre' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
    ],
  },
];

const SOCIAL_LINKS = [
  { platform: 'twitter' as const, url: 'https://twitter.com/packtpub', label: 'Packt on Twitter' },
  { platform: 'linkedin' as const, url: 'https://linkedin.com/company/packt', label: 'Packt on LinkedIn' },
  { platform: 'youtube' as const, url: 'https://youtube.com/packtpub', label: 'Packt on YouTube' },
  { platform: 'github' as const, url: 'https://github.com/PacktPublishing', label: 'Packt on GitHub' },
];

// ---------------------------------------------------------------------------
// Packt logo
// ---------------------------------------------------------------------------

function PacktLogo() {
  return (
    <span className="flex items-center gap-xs">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="28" height="28" rx="6" fill="#f97141" />
        <text x="14" y="20" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">P</text>
      </svg>
      <span className="text-lg font-bold tracking-tight text-content-primary">Packt</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Homepage component
// ---------------------------------------------------------------------------

function HomePage() {
  return (
    <div className="min-h-screen bg-bg-page font-sans">
      {/* ── Header ── */}
      <SiteHeader
        logo={<PacktLogo />}
        homeHref="/"
        links={NAV_LINKS}
        cartCount={2}
        onSearch={(q) => console.log('search', q)}
        onCartClick={() => console.log('cart')}
        onAccountClick={() => console.log('account')}
      />

      {/* ── Announcement bar ── */}
      <div className="bg-brand-bg-selected px-l py-2xs text-center text-xs font-semibold text-brand-text-on-brand">
        Summer Sale is live — up to 80% off selected titles.&nbsp;
        <a href="/sale" className="underline hover:no-underline">
          Shop now →
        </a>
      </div>

      {/* ── Page content ── */}
      <main className="mx-auto max-w-screen-xl px-l py-2xl space-y-4xl">

        {/* ── Hero carousel ── */}
        <HeroCarousel slides={HERO_SLIDES} label="Featured promotions" className="overflow-hidden rounded-lg" />

        {/* ── Category nav ── */}
        <section aria-label="Browse by topic">
          <CategoryNav items={CATEGORY_NAV} label="Browse by topic" />
        </section>

        {/* ── Trending ── */}
        <ProductCarouselSection title="Trending this week">
          {TRENDING.map((p) => (
            <ProductCard
              key={p.id}
              coverSrc={p.coverSrc}
              coverAlt={p.coverAlt}
              title={p.title}
              meta={p.meta}
              rating={p.rating}
              ratingCount={p.ratingCount}
              formats={p.formats as any}
              priceOptions={p.priceOptions}
              selectedFormat={p.selectedFormat}
              currency="GBP"
              addToCartLabel="Add to cart"
            />
          ))}
        </ProductCarouselSection>

        {/* ── Packt Unlimited spotlight ── */}
        <FeatureSpotlight
          hub="packt"
          eyebrow="Packt Unlimited"
          title="Read more. Pay less. Learn faster."
          description="Unlock every Packt book and video course — over 7,500 titles — for a single flat monthly fee. Cancel anytime."
          ctaLabel="Start your free trial"
          ctaHref="/subscription"
          media={
            <div className="flex flex-col gap-s">
              {[
                '✓  7,500+ books & videos',
                '✓  Offline reading & downloads',
                '✓  New titles added every week',
                '✓  Cancel any time, no lock-in',
              ].map((feat) => (
                <p key={feat} className="m-0 text-sm font-medium text-content-secondary">
                  {feat}
                </p>
              ))}
            </div>
          }
        />

        {/* ── New releases ── */}
        <ProductCarouselSection title="New releases">
          {NEW_RELEASES.map((p) => (
            <ProductCard
              key={p.id}
              coverSrc={p.coverSrc}
              coverAlt={p.coverAlt}
              title={p.title}
              meta={p.meta}
              rating={p.rating}
              ratingCount={p.ratingCount}
              formats={p.formats as any}
              priceOptions={p.priceOptions}
              selectedFormat={p.selectedFormat}
              currency="GBP"
              addToCartLabel="Add to cart"
            />
          ))}
        </ProductCarouselSection>

        {/* ── Browse by category ── */}
        <CategoryGrid heading="Browse by category" items={CATEGORY_ITEMS} />

        {/* ── Free Learning callout ── */}
        <section
          aria-label="Free Learning"
          className="flex flex-col gap-m rounded-lg border border-border-default bg-bg-surface p-2xl md:flex-row md:items-center"
        >
          <div className="flex flex-1 flex-col gap-xs">
            <div className="flex items-center gap-xs">
              <Tag variant="brand">Free</Tag>
              <h2 className="m-0 text-xl font-bold text-content-primary">Free Learning — today's deal</h2>
            </div>
            <p className="m-0 text-sm text-content-secondary">
              Claim a free eBook every day. Today's title:&nbsp;
              <strong className="text-content-primary">Python for Data Analysis, 3rd Edition</strong>.
              Available for 24 hours only.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-m">
            <CountdownTimer endsAt={getEndOfDay()} aria-label="Offer expires in" />
            <Button variant="primary" size="lg">
              Claim free eBook
            </Button>
          </div>
        </section>

        {/* ── Auth CTA ── */}
        <AuthCTA
          title="Read anywhere. Learn everywhere."
          description="Create a free Packt account to sync your library across devices, track your reading progress, and get personalised recommendations."
          signUpLabel="Create free account"
          signInLabel="Sign in"
          onSignUp={() => console.log('sign-up')}
          onSignIn={() => console.log('sign-in')}
        />
      </main>

      {/* ── Footer ── */}
      <SiteFooter
        columns={FOOTER_COLUMNS}
        socialLinks={SOCIAL_LINKS}
        copyright="© 2025 Packt Publishing. All rights reserved."
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Story
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Pages/Homepage',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Full Packt homepage composed from design-system components.' } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <HomePage />,
};
