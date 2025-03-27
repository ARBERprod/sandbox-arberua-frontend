import type { Meta, StoryObj } from '@storybook/react';
import { CategorySlider } from './CategorySlider';
import { categories } from './constants';

const meta: Meta<typeof CategorySlider> = {
  title: 'Widgets/CategorySlider',
  component: CategorySlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CategorySlider>;

export const CategorySliderManChosen: Story = {
  args: {
    categories,
  },
};

export const CategorySliderWomanChosen: Story = {
  args: {
    categories,
  },
};
