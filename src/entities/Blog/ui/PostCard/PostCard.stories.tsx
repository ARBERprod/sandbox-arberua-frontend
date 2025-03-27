import { Meta, StoryObj } from '@storybook/react';
import { getMockPost } from '../../__mock__/mockPost';
import { PostCard } from './PostCard';

export default {
  title: 'entities/Blog/PostCard',
  component: PostCard,
} as Meta<typeof PostCard>;

type Story = StoryObj<typeof PostCard>

export const ArticleCardDefault: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <PostCard article={getMockPost()} />
    </div>
  ),
};
