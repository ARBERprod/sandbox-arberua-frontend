import type { Meta, StoryObj } from '@storybook/react';
import { ProductFilter } from './ProductFilter';

const meta: Meta<typeof ProductFilter> = {
  title: 'features/FilterDrawer',
  component: ProductFilter,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductFilter>;

export const ProductFilterDefault: Story = {

};
