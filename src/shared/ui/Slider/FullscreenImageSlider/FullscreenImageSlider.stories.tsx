import type { Meta, StoryObj } from '@storybook/react';
import { mockSlides } from '@/entities/Shop';
import { FullscreenImageSlider } from './FullscreenImageSlider';

const meta: Meta<typeof FullscreenImageSlider> = {
  title: 'shared/Slider/FullscreenImageSlider',
  component: FullscreenImageSlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FullscreenImageSlider>;

export const FullscreenImageSliderDefault: Story = {
  args: {
    items: mockSlides,
  },
};
