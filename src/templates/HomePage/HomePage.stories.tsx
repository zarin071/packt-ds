import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from './HomePage';
import type { HomeProduct } from './HomePage.types';
import { BookIcon, FileIcon, SearchIcon, PlayIcon, HeadphonesIcon, InboxIcon, CartIcon, UserIcon } from '../../components/icons';

const cover = (seed: string) => `https://picsum.photos/seed/packt-${seed}/480/640`;

const p = (
  id: string,
  title: string,
  author: string,
  price: number,
  rating: number,
  ratingCount: number,
  originalPrice?: number
): HomeProduct => ({
  id,
  coverSrc: cover(id),
  coverAlt: `${title} book cover`,
  title,
  meta: `By ${author}`,
  rating,
  ratingCount,
  formats: ['ebook', 'paperback'],
  price,
  originalPrice,
});

const bestSellers: HomeProduct[] = [
  p('ml-pytorch', 'Machine Learning with PyTorch and Scikit-Learn', 'Sebastian Raschka', 41.99, 4.5, 512, 59.99),
  p('react-anti', 'React Anti-Patterns', 'Juntao Qiu', 27.99, 4.5, 128, 39.99),
  p('rust-web', 'Rust Web Programming', 'Maxwell Flitton', 31.99, 5, 96, 44.99),
  p('py-ml-example', 'Python Machine Learning by Example', 'Yuxi (Hayden) Liu', 29.99, 4.5, 212),
  p('fullstack-react', 'Modern Full-Stack React Projects', 'Daniel Bugl', 34.99, 4, 74, 49.99),
  p('transformers', 'Mastering Transformers', 'Savas Yildirim', 33.99, 4.5, 183),
];

const latest: HomeProduct[] = [
  p('langchain', 'Generative AI with LangChain', 'Ben Auffarth', 35.99, 4.5, 264, 49.99),
  p('llm-apps', 'Building LLM Powered Applications', 'Valentina Alto', 32.99, 4, 141),
  p('databricks', 'Data Engineering with Databricks', 'Cody Baldwin', 37.99, 4.5, 58, 52.99),
  p('docker-book', 'The Ultimate Docker Container Book', 'Gabriel N. Schenker', 27.99, 4, 305),
  p('go-devops', 'Go for DevOps', 'John Doak', 30.99, 4.5, 89, 41.99),
  p('platform-eng', 'Effective Platform Engineering', 'Mandy Hubbard', 28.99, 4, 37),
];

const trending: HomeProduct[] = [
  p('ts-patterns', 'TypeScript 5 Design Patterns', 'Theo Despoudis', 25.99, 4.5, 156, 36.99),
  p('k8s-cookbook', 'Kubernetes Cookbook', 'Sameer Naik', 34.99, 4, 92),
  p('sql-antipatterns', 'SQL Anti-Patterns Rebuilt', 'Bill Karwin', 29.99, 5, 61, 42.99),
  p('sec-pentest', 'Modern Penetration Testing', 'Glen D. Singh', 33.99, 4.5, 118),
  p('aws-cert', 'AWS Certified Solutions Architect Study Guide', 'Stuart Scott', 31.99, 4.5, 274, 44.99),
  p('game-unreal', 'Elevating Game Experiences with Unreal Engine 5', 'Gonçalo Marques', 32.99, 4, 47),
];

const readingList = (id: string, title: string, count: number, price: number, original: number): HomeProduct => ({
  id,
  coverSrc: cover(id),
  coverAlt: `${title} reading list`,
  title,
  meta: `${count} hand-picked titles`,
  formats: undefined,
  price,
  originalPrice: original,
});

const readingLists: HomeProduct[] = [
  readingList('list-ai', 'The Applied AI Reading List', 6, 89.99, 179.94),
  readingList('list-cloud', 'Cloud-Native from Scratch', 5, 74.99, 149.95),
  readingList('list-security', 'Become a Security Engineer', 7, 99.99, 209.93),
  readingList('list-frontend', 'Modern Front-End Mastery', 5, 69.99, 139.95),
  readingList('list-data', 'The Data Engineering Path', 6, 84.99, 169.94),
];

const authors = [
  {
    id: 'raschka',
    name: 'Sebastian Raschka',
    role: 'ML researcher & author',
    initials: 'SR',
    bio: 'Machine-learning researcher and author of the best-selling Python Machine Learning series, focused on making deep learning approachable.',
    links: [
      { platform: 'github' as const, url: 'https://github.com/rasbt' },
      { platform: 'twitter' as const, url: 'https://x.com/rasbt' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com/in/sebastianraschka' },
    ],
  },
  {
    id: 'qiu',
    name: 'Juntao Qiu',
    role: 'Front-end engineer & author',
    initials: 'JQ',
    bio: 'Software engineer who helps teams write cleaner, more maintainable React. Author of React Anti-Patterns.',
    links: [
      { platform: 'github' as const, url: 'https://github.com/abruzzi' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com/in/juntao-qiu' },
    ],
  },
  {
    id: 'alto',
    name: 'Valentina Alto',
    role: 'AI specialist & author',
    initials: 'VA',
    bio: 'Cloud & AI specialist writing about large language models and building intelligent applications in production.',
    links: [
      { platform: 'twitter' as const, url: 'https://x.com/example' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com/in/example' },
    ],
  },
  {
    id: 'flitton',
    name: 'Maxwell Flitton',
    role: 'Rust engineer & author',
    initials: 'MF',
    bio: 'Software engineer specialising in Rust for the web and scientific computing. Author of Rust Web Programming.',
    links: [{ platform: 'github' as const, url: 'https://github.com/example' }],
  },
];

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  argTypes: { data: { control: false } },
  args: {
    data: {
      logo: 'PACKT',
      headerLinks: [
        { label: 'Books', href: '#books' },
        { label: 'Videos', href: '#videos' },
        { label: 'Audiobooks', href: '#audiobooks' },
        { label: 'Bundles', href: '#bundles' },
        { label: 'Deals', href: '#deals' },
      ],
      cartCount: 2,
      categories: [
        { label: 'All', href: '#all', active: true },
        { label: 'Web Development', href: '#web' },
        { label: 'Data & AI', href: '#data' },
        { label: 'Cloud & DevOps', href: '#cloud' },
        { label: 'Security', href: '#security' },
        { label: 'Programming', href: '#programming' },
        { label: 'Game Development', href: '#games' },
        { label: 'Mobile', href: '#mobile' },
      ],
      saleLabel: 'Spring Sale — up to 50% off',
      saleEndsAt: new Date(Date.now() + (2 * 86400 + 7 * 3600 + 42 * 60 + 15) * 1000),
      saleCtaLabel: 'Shop the sale',
      saleCtaHref: '#sale',
      heroSlides: [
        { id: 'unlimited', title: 'Packt+ — every book and video, one subscription', copy: 'Unlimited access to 8,000+ titles, new releases included. Cancel anytime.', ctaLabel: 'Start free trial', ctaHref: '#plus' },
        { id: 'ai', title: 'Master Generative AI in 2026', copy: 'Hands-on books and courses on LLMs, agents, and RAG from working practitioners.', ctaLabel: 'Explore AI titles', ctaHref: '#ai' },
        { id: 'bundle', title: 'Build-your-own bundle', copy: 'Pick any 5 e-books and save 40%. Mix and match across every category.', ctaLabel: 'Create a bundle', ctaHref: '#bundle' },
      ],
      productSections: [
        { id: 'bestsellers', title: 'Best Sellers', products: bestSellers },
        { id: 'latest', title: 'Latest Releases', products: latest },
        { id: 'trending', title: 'Trending This Week', products: trending },
      ],
      readingLists: { id: 'reading-lists', title: 'Expert Reading Lists', products: readingLists },
      gridHeading: 'Browse by category',
      gridCategories: [
        { icon: <BookIcon />, name: 'Web Development', productCount: 1240, href: '#web' },
        { icon: <FileIcon />, name: 'Data & AI', productCount: 980, href: '#data' },
        { icon: <InboxIcon />, name: 'Cloud & DevOps', productCount: 731, href: '#cloud' },
        { icon: <SearchIcon />, name: 'Security', productCount: 430, href: '#security' },
        { icon: <PlayIcon />, name: 'Video Courses', productCount: 612, href: '#video' },
        { icon: <HeadphonesIcon />, name: 'Audiobooks', productCount: 88, href: '#audio' },
        { icon: <UserIcon />, name: 'Game Development', productCount: 264, href: '#games' },
        { icon: <CartIcon />, name: 'Mobile', productCount: 402, href: '#mobile' },
      ],
      spotlights: [
        { id: 'hub', eyebrow: 'Packt Hub', title: 'Stay ahead with expert tech insights', description: 'Deep dives, tutorials, and industry analysis from working engineers — free on the Packt Hub.', ctaLabel: 'Visit the Hub', ctaHref: '#hub' },
        { id: 'authors', eyebrow: 'Write for Packt', title: 'Share your expertise with millions', description: 'Join thousands of authors publishing with Packt and reach a global developer audience.', ctaLabel: 'Become an author', ctaHref: '#write' },
      ],
      partnersLabel: 'Trusted by teams at',
      partners: [
        { name: 'AWS' }, { name: 'Microsoft' }, { name: 'Google Cloud' }, { name: 'Docker' }, { name: 'MongoDB' }, { name: 'HashiCorp' },
      ],
      authorsTitle: 'Meet the authors',
      authors,
      footerColumns: [
        { heading: 'Explore', links: [{ label: 'Books', href: '#books' }, { label: 'Videos', href: '#videos' }, { label: 'Audiobooks', href: '#audiobooks' }, { label: 'Bundles', href: '#bundles' }] },
        { heading: 'Company', links: [{ label: 'About us', href: '#about' }, { label: 'Careers', href: '#careers' }, { label: 'Contact', href: '#contact' }] },
        { heading: 'Authors', links: [{ label: 'Write for Packt', href: '#write' }, { label: 'Author portal', href: '#portal' }] },
        { heading: 'Support', links: [{ label: 'Help centre', href: '#help' }, { label: 'Privacy policy', href: '#privacy' }, { label: 'Terms', href: '#terms' }] },
      ],
      footerSocial: [
        { platform: 'github', url: 'https://github.com/PacktPublishing' },
        { platform: 'twitter', url: 'https://x.com/PacktPub' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/packt-publishing' },
        { platform: 'youtube', url: 'https://youtube.com/user/PacktProgramming' },
      ],
      copyright: '© 2026 Packt Publishing. All rights reserved.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Home: Story = {};

export const Dark: Story = {
  name: 'Home (dark)',
  globals: { theme: 'dark' },
};
