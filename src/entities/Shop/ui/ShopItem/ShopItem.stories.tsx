import type { Meta, StoryObj } from '@storybook/react';
import { mockShops } from '../../__mock__/mockShops';
import { ShopItem } from './ShopItem';

const meta: Meta<typeof ShopItem> = {
  title: 'entities/Shop/ShopItem',
  component: ShopItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShopItem>;

export const ShopItemDefault: Story = {
  args: {
    shop: mockShops[0],
  },
};
