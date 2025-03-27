import type { Meta, StoryObj } from '@storybook/react';
import { HistoryProducts } from './HistoryProducts';
import { getMockProducts } from '@/entities/Product';

const meta: Meta<typeof HistoryProducts> = {
  title: 'widgets/ProductPresenter/HistoryProducts',
  component: HistoryProducts,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HistoryProducts>;

export const HistoryProductsDefault: Story = {
  args: {
    products: getMockProducts(),
  },
};
