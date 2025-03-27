import type { Meta, StoryObj } from '@storybook/react';
import { ReviewTable } from './ReviewTable';

const meta: Meta<typeof ReviewTable> = {
  title: 'views/OfficeReviewsView/ReviewTable',
  component: ReviewTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ReviewTable>;

export const ReviewTableDefault: Story = {

};
