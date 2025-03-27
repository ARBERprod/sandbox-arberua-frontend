import { Meta, StoryObj } from '@storybook/react';
import { PostsGrid } from './PostsGrid';
import { getMockPosts } from '../../__mock__/mockPost';

export default {
  title: 'entities/Blog/PostsGrid',
  component: PostsGrid,
} as Meta<typeof PostsGrid>;

type Story = StoryObj<typeof PostsGrid>

export const ArticlesGridDefault: Story = {
  args: {
    articles: getMockPosts(),
  },
};
