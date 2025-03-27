import type { Meta, StoryObj } from '@storybook/react';
import image1 from '@/shared/assets/images/gallery/1.jpg';
import image2 from '@/shared/assets/images/gallery/2.jpg';
import image3 from '@/shared/assets/images/gallery/3.jpg';
import image4 from '@/shared/assets/images/gallery/4.jpg';
import image5 from '@/shared/assets/images/gallery/5.jpg';
import { FullscreenThumbsSlider } from './FullscreenThumbsSlider';

const meta: Meta<typeof FullscreenThumbsSlider> = {
  title: 'shared/Slider/FullscreenThumbsSlider',
  component: FullscreenThumbsSlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FullscreenThumbsSlider>;

export const FullscreenThumbsSliderDefault: Story = {
  args: {
    isOpen: true,
    images: [
      image1,
      image2,
      image3,
      image4,
      image5,
    ],
  },
};
