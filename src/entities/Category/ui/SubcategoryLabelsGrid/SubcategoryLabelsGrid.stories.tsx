import type { Meta, StoryObj } from '@storybook/react';
import { SubcategoryLabelsGrid } from './SubcategoryLabelsGrid';
import { SubcategoryLabelSlide } from '../SubcategoryLabelSlide';
import { mockedCategory } from '../../constants/mockCategories';

const meta: Meta<typeof SubcategoryLabelsGrid> = {
  title: 'entities/Category/SubcategoryLabelsGrid',
  component: SubcategoryLabelsGrid,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SubcategoryLabelsGrid>;

const mockedSlides = Array.from({ length: 20 }).map((item, index) => ({
  id: index,
  slide: (
    <SubcategoryLabelSlide
      category={mockedCategory}
      onClick={() => {}}
    />
  ),
}));

export const SubcategoryLabelsGridDefault: Story = {
  args: {
    slides: mockedSlides,
  },
};
