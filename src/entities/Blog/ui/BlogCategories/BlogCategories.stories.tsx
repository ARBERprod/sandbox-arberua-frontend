import { Meta, StoryObj } from '@storybook/react';
import { BlogCategories } from './BlogCategories';
import { mockedCategories } from '../../__mock__/mockCategories';

export default {
  title: 'entities/Blog/BlogCategories',
  component: BlogCategories,
} as Meta<typeof BlogCategories>;

type Story = StoryObj<typeof BlogCategories>

export const BlogCategoriesNotSelected: Story = {
  args: {
    categories: mockedCategories,
  },
};

export const BlogCategoriesSelectedCategory: Story = {
  args: {
    categories: mockedCategories,
  },
};
