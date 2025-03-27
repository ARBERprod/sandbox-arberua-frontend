import type { Meta, StoryObj } from '@storybook/react';
import { ProductSort } from './ProductSort';

const meta: Meta<typeof ProductSort> = {
  title: 'features/ProductSort',
  component: ProductSort,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductSort>;

export const ProductSortDefault: Story = {

};
