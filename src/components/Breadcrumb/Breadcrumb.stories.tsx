import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Web Development', href: '/courses/web-dev' },
  { label: 'React Fundamentals', active: true },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  args: { items },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {};

export const Short: Story = {
  parameters: { controls: { disable: true } },
  args: { items: [{ label: 'Home', href: '/' }, { label: 'Courses', active: true }] },
};

export const CustomSeparator: Story = {
  parameters: { controls: { disable: true } },
  args: { items, separator: '/' },
};
