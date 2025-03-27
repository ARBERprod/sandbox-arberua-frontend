import type { Meta, StoryObj } from '@storybook/react';
import { SellerCard } from './SellerCard';
import { getMockStaff } from '../../__mock__/mockStaff';

const meta: Meta<typeof SellerCard> = {
  title: 'entities/Seller/SellerCard',
  component: SellerCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SellerCard>;

export const SellerCardDefault: Story = {
  args: {
    seller: getMockStaff(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
