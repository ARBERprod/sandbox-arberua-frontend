import type { Meta, StoryObj } from '@storybook/react';
import { OrderDetailsCard } from './OrderDetailsCard';
import { getMockOrder } from '../../__mock__/mockOrderData';

const meta: Meta<typeof OrderDetailsCard> = {
  title: 'entities/Order/OrderDetailsCard',
  component: OrderDetailsCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrderDetailsCard>;

export const OrderDetailsCardDefault: Story = {
  args: {
    order: getMockOrder(),
  },
};
