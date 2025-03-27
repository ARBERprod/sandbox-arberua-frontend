import type { Meta, StoryObj } from '@storybook/react';
import { CommentForm } from './CommentForm';

const meta: Meta<typeof CommentForm> = {
  title: 'entities/Comment/CommentForm',
  component: CommentForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

export const CommentFormDefault: Story = {

};
