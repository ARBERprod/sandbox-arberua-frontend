import type { Meta, StoryObj } from '@storybook/react';
import { SubcategoryLabelsSlider } from './SubcategoryLabelsSlider';

const meta: Meta<typeof SubcategoryLabelsSlider> = {
  title: 'entities/Category/SubcategoryLabelsSlider',
  component: SubcategoryLabelsSlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SubcategoryLabelsSlider>;

export const SubcategoryLabelsSliderDefault: Story = {

};
