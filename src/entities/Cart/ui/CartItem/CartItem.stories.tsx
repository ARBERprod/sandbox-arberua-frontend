import { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';
import { getMockCartItem } from '../../lib/getMockCartItem';

export default {
  title: 'entities/Cart/CartItem',
  component: CartItem,
} as Meta<typeof CartItem>;

type Story = StoryObj<typeof CartItem>

export const CartItemWithCounter: Story = {
  args: {
    cartItem: getMockCartItem(),
    withCounter: true,
  },
};

export const CartItemWithoutCounter: Story = {
  args: {
    cartItem: getMockCartItem(),
    withCounter: false,
  },
};
