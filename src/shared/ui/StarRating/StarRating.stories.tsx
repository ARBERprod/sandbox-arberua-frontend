import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'shared/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const StarRatingDefault: Story = {};

export const StarRatingWithRate: Story = {
  args: {
    value: 4,
  },
};

export const StarRatingLarge: Story = {
  args: {
    value: 3,
    size: 'large',
  },
};
