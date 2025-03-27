import type { Meta, StoryObj } from '@storybook/react';
import { ReviewList } from './ReviewList';

const meta: Meta<typeof ReviewList> = {
  title: 'views/OfficeReviewsView/ReviewList',
  component: ReviewList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ReviewList>;

export const ReviewListDefault: Story = {

};
