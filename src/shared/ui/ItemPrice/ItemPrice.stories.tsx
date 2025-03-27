import type { Meta, StoryObj } from '@storybook/react';
import { ItemPrice } from './ItemPrice';
import { getMockPrice } from '@/shared/lib/mock/price';

const meta: Meta<typeof ItemPrice> = {
  title: 'shared/ItemPrice',
  component: ItemPrice,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ItemPrice>;

export const ItemPriceWithDiscount: Story = {
  args: {
    price: getMockPrice(),
    oldPrice: getMockPrice(),
  },
};

export const ItemPriceWithoutDiscount: Story = {
  args: {
    price: getMockPrice(),
  },
};

export const ItemPriceWithoutDiscountVariantSearch: Story = {
  args: {
    price: getMockPrice(),
    variant: 'search',
  },
};
