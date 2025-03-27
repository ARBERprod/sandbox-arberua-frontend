import type { Meta, StoryObj } from '@storybook/react';
import { ShopList } from './ShopList';
import { mockShops } from '../../__mock__/mockShops';

const meta: Meta<typeof ShopList> = {
  title: 'entities/Shop/ShopList',
  component: ShopList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShopList>;

export const ShopListDefault: Story = {
  args: {
    shops: mockShops,
  },
};
