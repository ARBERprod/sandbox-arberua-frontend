import { Meta, StoryObj } from '@storybook/react';
import { MainSlider } from './MainSlider';
import styles from './MainSlider.module.scss';

export default {
  title: 'shared/Slider/MainSlider',
  component: MainSlider,
  tags: ['autodocs'],
} as Meta<typeof MainSlider>;

type Story = StoryObj<typeof MainSlider>;

const Slide = ({ title }: any) => (
  <div style={{
    background: 'red',
    width: 350,
    height: 500,
  }}
  >
    {title}
  </div>
);

export const DefaultMainSlider: Story = {
  args: {
    classes: {
      slide: styles.storySliderSlide,
    },
    slides: [
      {
        id: '1',
        slide: <Slide title="slide 1" />,
      },
      {
        id: '2',
        slide: <Slide title="slide 2" />,
      },
      {
        id: '3',
        slide: <Slide title="slide 3" />,
      },
      {
        id: '4',
        slide: <Slide title="slide 4" />,
      },
      {
        id: '5',
        slide: <Slide title="slide 1" />,
      },
      {
        id: '6',
        slide: <Slide title="slide 2" />,
      },
      {
        id: '7',
        slide: <Slide title="slide 3" />,
      },
      {
        id: '8',
        slide: <Slide title="slide 4" />,
      },
    ],
  },
};
