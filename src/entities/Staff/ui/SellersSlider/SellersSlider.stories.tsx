import { Meta, StoryObj } from '@storybook/react';
import { SellersSlider } from './SellersSlider';
import { getMockStaffs } from '@/entities/Staff';

export default {
  title: 'entities/Seller/SellersSlider',
  component: SellersSlider,
} as Meta<typeof SellersSlider>;

type Story = StoryObj<typeof SellersSlider>

export const SellersSliderDefault: Story = {
  args: {
    sellers: getMockStaffs(),
  },
};
