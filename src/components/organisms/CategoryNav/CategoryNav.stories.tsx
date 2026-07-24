import type { Meta, StoryObj } from '@storybook/react';
import { CategoryNav } from './CategoryNav';

const meta: Meta<typeof CategoryNav> = {
  title: 'organisms/CategoryNav',
  component: CategoryNav,
  parameters: { layout: 'padded' },
  argTypes: { items: { control: false } },
  args: {
    items: [
      { label: 'All', href: '#all', active: true },
      { label: 'Web Development', href: '#web' },
      { label: 'Data & AI', href: '#data' },
      { label: 'Cloud & DevOps', href: '#cloud' },
      { label: 'Security', href: '#security' },
      { label: 'Game Development', href: '#games' },
      { label: 'Mobile', href: '#mobile' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof CategoryNav>;

export const Playground: Story = {};
