import type { Meta, StoryObj } from '@storybook/react';
import { mockProducts } from '@/entities/Product';
import { CardView } from '@/shared/types/common';
import { ProductsGrid } from './ProductsGrid';

const meta: Meta<typeof ProductsGrid> = {
  title: 'widgets/Product/ProductsGrid',
  component: ProductsGrid,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductsGrid>;

export const ProductsGridDefault: Story = {
  args: {
    products: mockProducts,
    view: CardView.SMALL,
  },
};
