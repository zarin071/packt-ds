import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter } from './SiteFooter';

const meta: Meta<typeof SiteFooter> = {
  title: 'organisms/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: false }, socialLinks: { control: false } },
  args: {
    columns: [
      {
        heading: 'Explore',
        links: [
          { label: 'Books', href: '#books' },
          { label: 'Videos', href: '#videos' },
          { label: 'Audiobooks', href: '#audiobooks' },
          { label: 'Deals', href: '#deals' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About us', href: '#about' },
          { label: 'Careers', href: '#careers' },
          { label: 'Contact', href: '#contact' },
        ],
      },
      {
        heading: 'Authors',
        links: [
          { label: 'Write for Packt', href: '#write' },
          { label: 'Author portal', href: '#portal' },
        ],
      },
      {
        heading: 'Support',
        links: [
          { label: 'Help centre', href: '#help' },
          { label: 'Privacy policy', href: '#privacy' },
          { label: 'Terms', href: '#terms' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'github', url: 'https://github.com/PacktPublishing' },
      { platform: 'twitter', url: 'https://x.com/PacktPub' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/packt-publishing' },
      { platform: 'youtube', url: 'https://youtube.com/user/PacktProgramming' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Playground: Story = {};
