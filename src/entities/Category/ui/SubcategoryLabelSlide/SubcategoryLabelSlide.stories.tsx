import type { Meta, StoryObj } from '@storybook/react';
import { SubcategoryLabelSlide } from './SubcategoryLabelSlide';
import { mockedCategory } from '../../constants/mockCategories';

const meta: Meta<typeof SubcategoryLabelSlide> = {
  title: 'entities/Category/SubcategoryLabelSlide',
  component: SubcategoryLabelSlide,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SubcategoryLabelSlide>;

export const SubcategoryLabelSlideDefault: Story = {
  args: {
    category: mockedCategory,
  },
};
