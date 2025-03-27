import type { Meta, StoryObj } from '@storybook/react';
import CategoryCircleImageTest from '@/shared/assets/images/category-circle-test.jpg';
import { CategoryCircle } from './CategoryCircle';

const meta: Meta<typeof CategoryCircle> = {
  title: 'entities/Category/CategoryCircle',
  component: CategoryCircle,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CategoryCircle>;

export const CategoryCircleDefault: Story = {
  args: {
    category: {
      id: '10',
      title: 'Category title',
      slug: 'category-slug',
      picture: CategoryCircleImageTest,
      children: false,
      url: '/url',
      is_null: true,
    },
  },
};
