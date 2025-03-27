import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationsReviewTable } from './ConsultationsReviewTable';

const meta: Meta<typeof ConsultationsReviewTable> = {
  title: 'views/OfficeReviewsView/ConsultationsReviewTable',
  component: ConsultationsReviewTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationsReviewTable>;

export const ConsultationsReviewTableDefault: Story = {

};
