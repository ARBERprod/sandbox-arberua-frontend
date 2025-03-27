import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Shared/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const RangeSliderDefault: Story = {
  args: {
    min: 1,
    max: 7,
  },
};

export const RangeSliderWithValue: Story = {
  args: {
    min: 1,
    max: 7,
    value: 2,
  },
};
