import type { Meta, StoryObj } from '@storybook/react';
import { OrderStatus } from './OrderStatus';

const meta: Meta<typeof OrderStatus> = {
  title: 'entities/Order/OrderStatus',
  component: OrderStatus,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrderStatus>;

export const OrderStatusDefault: Story = {
  args: {
    orderId: 123123213,
    status: {
      color: 'red',
      title: 'Отменен',
    },
  },
};
