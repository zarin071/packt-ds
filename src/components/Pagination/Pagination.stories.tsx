import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 50 } },
    currentPage: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    onPageChange: { action: 'onPageChange' },
  },
  args: { totalPages: 10, currentPage: 5, siblingCount: 1, onPageChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={(p) => {
          setPage(p);
          args.onPageChange(p);
        }}
      />
    );
  },
};

export const FewPages: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination totalPages={3} currentPage={page} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [page, setPage] = useState(25);
    return <Pagination totalPages={50} currentPage={page} onPageChange={setPage} siblingCount={2} />;
  },
};
