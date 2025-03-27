import type { Meta, StoryObj } from '@storybook/react';
import { OrdersList } from './OrdersList';

const meta: Meta<typeof OrdersList> = {
  title: 'views/OfficeOrdersView/OrdersList',
  component: OrdersList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrdersList>;

export const OrdersListDefault: Story = {

};
