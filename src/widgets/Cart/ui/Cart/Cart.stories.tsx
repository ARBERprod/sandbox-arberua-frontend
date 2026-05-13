import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { getMockCartItems } from '@/entities/Cart/lib/getMockCartItem';
import { Cart } from './Cart';
import { getMockPrice } from '@/shared/lib/mock/price';

const meta: Meta<typeof Cart> = {
  title: 'widgets/Cart',
  component: Cart,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Cart>;

export const CartDefault: Story = {
  decorators: [
    StoreDecorator({ cart: { isOpen: true } }),
  ],
};

export const CartWithProducts: Story = {
  decorators: [
    StoreDecorator({
      cart: {
        isOpen: true,
        cartData: {
          total: 1,
          items: getMockCartItems(2),
          quantity: 2,
          totals: [
            {
              title: 'Всего',
              price: getMockPrice(),
            },
          ],
          promocode: null,
        },
      },
    }),
  ],
};
