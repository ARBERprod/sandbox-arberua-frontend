import type { Meta, StoryObj } from '@storybook/react';
import { OrderHistoryModal } from './OrderHistoryModal';

const meta: Meta<typeof OrderHistoryModal> = {
  title: 'entites/Order/OrderHistoryModal',
  component: OrderHistoryModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrderHistoryModal>;

export const OrderHistoryModalDefault: Story = {
  args: { isOpen: true },
};
