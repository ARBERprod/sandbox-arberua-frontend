import type { Meta, StoryObj } from '@storybook/react';
import { OrderDetailsTable } from './OrderDetailsTable';
import { getMockOrder } from '../../__mock__/mockOrderData';

const meta: Meta<typeof OrderDetailsTable> = {
  title: 'entities/Order/OrderDetailsTable',
  component: OrderDetailsTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrderDetailsTable>;

export const OrderDetailsTableDefault: Story = {
  args: {
    order: getMockOrder(),
  },
};
