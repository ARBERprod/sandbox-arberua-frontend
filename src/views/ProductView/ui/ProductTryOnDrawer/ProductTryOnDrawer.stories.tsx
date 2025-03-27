import type { Meta, StoryObj } from '@storybook/react';
import { ProductTryOnDrawer } from './ProductTryOnDrawer';

const meta: Meta<typeof ProductTryOnDrawer> = {
  title: 'views/ProductView/ProductTryOnDrawer',
  component: ProductTryOnDrawer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductTryOnDrawer>;

export const ProductTryOnDrawerDefault: Story = {
  args: {
    isOpen: true,
    productId: 'sasasas',
  },
};
