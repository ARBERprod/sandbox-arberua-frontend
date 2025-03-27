import type { Meta, StoryObj } from '@storybook/react';
import { getMockSmallProduct } from '@/entities/Product';
import { ProductCardWithCheckbox } from './ProductCardWithCheckbox';

const meta: Meta<typeof ProductCardWithCheckbox> = {
  title: 'entities/Product/ProductCardWithCheckbox',
  component: ProductCardWithCheckbox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductCardWithCheckbox>;

export const ProductCardWithCheckboxUnchecked: Story = {
  args: {
    product: getMockSmallProduct(),
    value: false,
  },
};

export const ProductCardWithCheckboxChecked: Story = {
  args: {
    product: getMockSmallProduct(),
    value: true,
  },
};
