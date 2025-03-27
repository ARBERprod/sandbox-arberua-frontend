import type { Meta, StoryObj } from '@storybook/react';
import { mockDetailedProduct, mockProducts } from '@/entities/Product';
import { ProductView } from './ProductView';

const meta: Meta<typeof ProductView> = {
  title: 'views/ProductView',
  component: ProductView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductView>;

export const ProductViewDefault: Story = {
  args: {
    product: mockDetailedProduct,
    breadcrumbs: [
      { title: 'Головна', url: '/' },
      { title: 'Чоловікам', url: '' },
      { title: 'Аксесуари', url: '' },
      { title: 'Краватки й метелики', url: '' },
      { title: 'Dark Grey Bird\'s Eye Sienna Suit Jacket', url: '' },
    ],
    recommendations: mockProducts,
  },
};
