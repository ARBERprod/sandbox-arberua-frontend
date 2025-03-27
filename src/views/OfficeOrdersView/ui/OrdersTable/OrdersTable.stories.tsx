import type { Meta, StoryObj } from '@storybook/react';
import { OrdersTable } from './OrdersTable';

const meta: Meta<typeof OrdersTable> = {
  title: 'views/OfficeOrdersView/OrdersTable',
  component: OrdersTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrdersTable>;

export const OrdersTableDefault: Story = {

};
