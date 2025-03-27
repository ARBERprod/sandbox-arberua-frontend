import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const PaginationDefault: Story = {
  args: {
    pageCount: 5,
  },
};

export const PaginationWithActivePage: Story = {
  args: {
    pageCount: 5,
    activePage: 2,
  },
};
