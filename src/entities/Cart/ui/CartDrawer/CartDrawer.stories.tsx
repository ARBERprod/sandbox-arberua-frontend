import type { Meta, StoryObj } from '@storybook/react';
import { CartDrawer } from './CartDrawer';
import { CartItem } from '../CartItem';
import { getMockCartItem } from '../../lib/getMockCartItem';

const meta: Meta<typeof CartDrawer> = {
  title: 'entities/Cart/CartDrawer',
  component: CartDrawer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CartDrawer>;

export const CartDrawerOpenEmpty: Story = {
  args: {
    isOpen: true,
    isEmpty: true,
  },
};

export const CartDrawerOpenLoading: Story = {
  args: {
    isOpen: true,
    isLoading: true,
  },
};

export const CartDrawerOpenWithProduct: Story = {
  args: {
    isOpen: true,
    children: <CartItem
      withCounter
      key="1"
      cartItem={getMockCartItem()}
      onDelete={() => {}}
      onAdd={() => {}}
      onRemove={() => {}}
    />,
  },
};
