import type { Meta, StoryObj } from '@storybook/react';
import image1 from '@/shared/assets/images/gallery/1.jpg';
import image2 from '@/shared/assets/images/gallery/2.jpg';
import image3 from '@/shared/assets/images/gallery/3.jpg';
import image4 from '@/shared/assets/images/gallery/4.jpg';
import image5 from '@/shared/assets/images/gallery/5.jpg';
import { Gallery } from './Gallery';

const meta: Meta<typeof Gallery> = {
  title: 'shared/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const GalleryDefault: Story = {
  args: {
    images: [
      image1,
      image2,
      image3,
      image4,
      image5,
    ],
  },
};
