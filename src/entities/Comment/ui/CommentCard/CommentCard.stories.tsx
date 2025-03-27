import { Meta, StoryObj } from '@storybook/react';
import { getMockComment } from '../../__mock__/mockComment';
import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
} as Meta<typeof CommentCard>;

type Story = StoryObj<typeof CommentCard>

export const CommentCardVariantProduct: Story = {
  args: {
    comment: getMockComment(),
  },
};

export const CommentCardVariantSeller: Story = {
  args: {
    comment: getMockComment(),
    variant: 'seller',
  },
};
