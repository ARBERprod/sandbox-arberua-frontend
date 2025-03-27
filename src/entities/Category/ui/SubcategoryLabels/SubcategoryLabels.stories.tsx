import type { Meta, StoryObj } from '@storybook/react';
import { SubcategoryLabels } from './SubcategoryLabels';
import { SubcategoryLabelSlide } from '../SubcategoryLabelSlide';
import { mockedCategory } from '../../constants/mockCategories';

const meta: Meta<typeof SubcategoryLabels> = {
  title: 'entities/Category/SubcategoryLabels',
  component: SubcategoryLabels,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SubcategoryLabels>;

const mockedSlides = Array.from({ length: 20 }).map((item, index) => ({
  id: index,
  slide: (
    <SubcategoryLabelSlide
      category={mockedCategory}
      onClick={() => {}}
    />
  ),
}));

export const SubcategoryLabelsDefault: Story = {
  args: {
    slides: mockedSlides,
  },
};
