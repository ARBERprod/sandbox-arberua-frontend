import { Meta, StoryObj } from '@storybook/react';
import { Slide, Slider } from './Slider';

export default {
  title: 'shared/Slider',
  component: Slider,
  tags: ['autodocs'],
} as Meta<typeof Slider>;

const slides: Slide[] = [
  {
    id: '1',
    slide: <div>Slide one</div>,
  },
  {
    id: '2',
    slide: <div>Slide two</div>,
  },
  {
    id: '3',
    slide: <div>Slide three</div>,
  },
  {
    id: '4',
    slide: <div>Slide four</div>,
  },
];

type Story = StoryObj<typeof Slider>;

export const DefaultSlider: Story = {
  render: (props) => (
    <Slider {...props} slides={slides} />
  ),
};
