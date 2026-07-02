import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 50 } },
    currentPage: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
  },
  args: { totalPages: 10, currentPage: 5, siblingCount: 1 },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination totalPages={3} currentPage={page} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(25);
    return <Pagination totalPages={50} currentPage={page} onPageChange={setPage} siblingCount={2} />;
  },
};

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};
