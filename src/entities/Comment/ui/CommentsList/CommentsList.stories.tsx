import type { Meta, StoryObj } from '@storybook/react';
import { getMockComments } from '../../__mock__/mockComment';
import { CommentsList } from './CommentsList';

const meta: Meta<typeof CommentsList> = {
  title: 'entities/Comment/CommentsList',
  component: CommentsList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentsList>;

export const CommentsListVariantProduct: Story = {
  args: {
    comments: getMockComments(),
  },
};

export const CommentsListVariantSeller: Story = {
  args: {
    comments: getMockComments(),
    variant: 'seller',
  },
};
