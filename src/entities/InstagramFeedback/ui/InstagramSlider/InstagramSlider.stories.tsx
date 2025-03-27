import type { Meta, StoryObj } from '@storybook/react';
import { InstagramSlider } from './InstagramSlider';

const meta: Meta<typeof InstagramSlider> = {
  title: 'Entities/InstagramFeedback/InstagramSlider',
  component: InstagramSlider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InstagramSlider>;

export const InstagramSliderDefault: Story = {

};
