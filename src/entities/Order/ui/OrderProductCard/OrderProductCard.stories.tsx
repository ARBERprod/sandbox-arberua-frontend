import type { Meta, StoryObj } from '@storybook/react';
import { getMockOrderProduct } from '../../__mock__/mockOrderData';
import { OrderProductCard } from './OrderProductCard';

const meta: Meta<typeof OrderProductCard> = {
  title: 'entities/Order/OrderProductCard',
  component: OrderProductCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrderProductCard>;

export const OrderProductCardDefault: Story = {
  args: {
    product: getMockOrderProduct(),
  },
};

export const OrderProductCardWithDetails: Story = {
  args: {
    product: getMockOrderProduct(),
    withDetails: true,
  },
};
