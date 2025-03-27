import type { Meta, StoryObj } from '@storybook/react';
import { mockDetailedProduct } from '@/entities/Product';
import { ProductDetailedCard } from './ProductDetailedCard';

const meta: Meta<typeof ProductDetailedCard> = {
  title: 'views/ProductView/ProductDetailedCard',
  component: ProductDetailedCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductDetailedCard>;

export const ProductDetailedCardDefault: Story = {
  args: {
    product: mockDetailedProduct,
  },
};
