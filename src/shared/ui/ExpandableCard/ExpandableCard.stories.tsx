import type { Meta, StoryObj } from '@storybook/react';
import { OrderProductCard } from '@/entities/Order/ui/OrderProductCard';
import { getMockOrderProduct } from '@/entities/Order/__mock__/mockOrderData';
import { ExpandableCard } from './ExpandableCard';

const meta: Meta<typeof ExpandableCard> = {
  title: 'shared/ExpandableCard',
  component: ExpandableCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ExpandableCard>;

export const ExpandableCardDefault: Story = {
  args: {
    children: (
      <OrderProductCard product={getMockOrderProduct()} />
    ),
  },
};

export const ExpandableCardWithExpandContent: Story = {
  args: {
    children: (
      <OrderProductCard product={getMockOrderProduct()} />
    ),
    expandContent: (
      <OrderProductCard product={getMockOrderProduct()} />
    ),
  },
};
