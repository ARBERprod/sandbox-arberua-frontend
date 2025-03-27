import type { Meta, StoryObj } from '@storybook/react';
import { SellerView } from './SellerView';
import { getMockDetailedStaff } from '@/entities/Staff';

const meta: Meta<typeof SellerView> = {
  title: 'views/SellerView',
  component: SellerView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SellerView>;

export const SellerViewDefault: Story = {
  args: {
    seller: getMockDetailedStaff(),
  },
};
