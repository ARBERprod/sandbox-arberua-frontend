import type { Meta, StoryObj } from '@storybook/react';
import { getMockOrder } from '@/entities/Order';
import { OrderDetailsButton } from './OrderDetailsButton';

const meta: Meta<typeof OrderDetailsButton> = {
  title: 'views/OfficeOrdersView/OrderDetailsButton',
  component: OrderDetailsButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrderDetailsButton>;

export const OrderDetailsButtonDefault: Story = {
  args: {
    order: getMockOrder(),
  },
};
