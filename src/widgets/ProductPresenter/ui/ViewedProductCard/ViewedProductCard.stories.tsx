import type { Meta, StoryObj } from '@storybook/react';
import { getMockProduct } from '@/entities/Product';
import { ViewedProductCard } from './ViewedProductCard';

const meta: Meta<typeof ViewedProductCard> = {
  title: 'widgets/ProductPresenter/ViewedProductCard',
  component: ViewedProductCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ViewedProductCard>;

export const ViewedProductCardDefault: Story = {
  args: {
    product: getMockProduct(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
