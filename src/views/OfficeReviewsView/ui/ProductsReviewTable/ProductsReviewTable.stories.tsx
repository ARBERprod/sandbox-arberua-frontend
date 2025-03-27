import type { Meta, StoryObj } from '@storybook/react';
import { ProductsReviewTable } from './ProductsReviewTable';

const meta: Meta<typeof ProductsReviewTable> = {
  title: 'views/OfficeReviewsView/ProductsReviewTable',
  component: ProductsReviewTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductsReviewTable>;

export const ProductsReviewTableDefault: Story = {

};
