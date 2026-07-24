import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SiteHeader } from './SiteHeader';

const meta: Meta<typeof SiteHeader> = {
  title: 'organisms/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: { logo: { control: false }, links: { control: false } },
  args: {
    logo: 'PACKT',
    links: [
      { label: 'Books', href: '#books' },
      { label: 'Videos', href: '#videos' },
      { label: 'Audiobooks', href: '#audiobooks' },
      { label: 'Deals', href: '#deals' },
    ],
    cartCount: 3,
    onSearch: fn(),
    onCartClick: fn(),
    onAccountClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Playground: Story = {};

export const Mobile: Story = {
  parameters: { controls: { disable: true }, viewport: { defaultViewport: 'mobile1' } },
  globals: { viewport: { value: 'mobile1' } },
};
