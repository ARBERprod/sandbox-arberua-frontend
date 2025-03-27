import type { Meta, StoryObj } from '@storybook/react';
import { ReviewConsultationsList } from './ReviewConsultationsList';

const meta: Meta<typeof ReviewConsultationsList> = {
  title: 'views/OfficeReviewsView/ReviewConsultationsList',
  component: ReviewConsultationsList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ReviewConsultationsList>;

export const ReviewConsultationsListDefault: Story = {

};
