import type { Meta, StoryObj } from '@storybook/react';
import { Slide } from '@/shared/ui/Slider';
import { categories } from '@/widgets/CategorySlider';
import { CategoryCircle } from '@/entities/Category';
import { OutOfBoundsSlider } from './OutOfBoundsSlider';

const meta: Meta<typeof OutOfBoundsSlider> = {
  title: 'shared/Slider/OutOfBoundsSlider',
  component: OutOfBoundsSlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OutOfBoundsSlider>;

const slides:Slide[] = categories.map((category) => ({
  id: category.url,
  slide: (
    <CategoryCircle
      category={category}
    />),
}));

export const OutOfBoundsSliderDefault: Story = {
  args: {
    slides,
  },
};
