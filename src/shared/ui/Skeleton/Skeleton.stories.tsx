import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const SkeletonDefault: Story = {
  args: {
  },
};

export const SkeletonWithHeight: Story = {
  args: {
    height: 200,
  },
};

export const SkeletonWithWidth: Story = {
  args: {
    width: 200,
  },
};

export const SkeletonWithRadius: Story = {
  args: {
    radius: 10,
  },
};
