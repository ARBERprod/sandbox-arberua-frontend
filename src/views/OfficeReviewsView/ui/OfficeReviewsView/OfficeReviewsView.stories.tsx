import type { Meta, StoryObj } from '@storybook/react';
import { OfficeReviewsView } from './OfficeReviewsView';

const meta: Meta<typeof OfficeReviewsView> = {
  title: 'views/OfficeReviewsView/OfficeReviewsView',
  component: OfficeReviewsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeReviewsView>;

export const OfficeReviewsViewDefault: Story = {

};
