import type { Meta, StoryObj } from '@storybook/react';
import { CommentModal } from './CommentModal';

const meta: Meta<typeof CommentModal> = {
  title: 'entities/Comment/CommentModal',
  component: CommentModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentModal>;

export const CommentModalDefault: Story = {
  args: {
    isOpen: true,
  },
};
