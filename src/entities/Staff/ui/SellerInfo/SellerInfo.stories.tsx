import type { Meta, StoryObj } from '@storybook/react';
import { SellerInfo } from './SellerInfo';
import { getMockDetailedStaff } from '../../__mock__/mockStaff';

const meta: Meta<typeof SellerInfo> = {
  title: 'entities/Seller/SellerInfo',
  component: SellerInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SellerInfo>;

export const SellerInfoDefault: Story = {
  args: {
    sellerInfo: getMockDetailedStaff(),
  },
};
