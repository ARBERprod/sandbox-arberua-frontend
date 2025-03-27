import type { Meta, StoryObj } from '@storybook/react';
import { getMockProduct } from '@/entities/Product';
import { WishListProductCard } from './WishListProductCard';

const meta: Meta<typeof WishListProductCard> = {
  title: 'widgets/ProductPresenter/WishListProductCard',
  component: WishListProductCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WishListProductCard>;

export const WishListProductCardDefault: Story = {
  args: {
    product: getMockProduct(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
