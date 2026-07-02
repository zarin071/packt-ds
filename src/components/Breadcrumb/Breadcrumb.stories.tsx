import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Web Development', href: '/courses/web-dev' },
  { label: 'React Fundamentals', active: true },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  args: { items },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const Short: Story = {
  args: { items: [{ label: 'Home', href: '/' }, { label: 'Courses', active: true }] },
};

export const CustomSeparator: Story = {
  args: { items, separator: '/' },
};

export const Playground: Story = {};
