import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

export default {
  title: 'shared/Typography',
  component: Typography,
  tags: ['autodocs'],
} as Meta<typeof Typography>;

type Story = StoryObj<typeof Typography>

export const Title1: Story = {
  args: {
    variant: 'title-1',
    children: 'Title1',
  },
};

export const Title2: Story = {
  args: {
    variant: 'title-2',
    children: 'Title2',
  },
};

export const Title3: Story = {
  args: {
    variant: 'title-3',
    children: 'Title3',
  },
};

export const Title4: Story = {
  args: {
    variant: 'title-4',
    children: 'Title4',
  },
};

export const Title5: Story = {
  args: {
    variant: 'title-5',
    children: 'Title5',
  },
};

export const Title6: Story = {
  args: {
    variant: 'title-6',
    children: 'Title6',
  },
};

export const Body: Story = {
  args: {
    variant: 'body-1',
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at aut consectetur dolor, dolorum eius eum itaque obcaecati officiis omnis praesentium quibusdam quis quos sint soluta voluptates voluptatum. Ad aliquid architecto aspernatur assumenda atque dignissimos, dolore eaque est excepturi magnam maxime officiis omnis pariatur porro quam, quo temporibus velit vitae?',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body-2',
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at aut consectetur dolor, dolorum eius eum itaque obcaecati officiis omnis praesentium quibusdam quis quos sint soluta voluptates voluptatum. Ad aliquid architecto aspernatur assumenda atque dignissimos, dolore eaque est excepturi magnam maxime officiis omnis pariatur porro quam, quo temporibus velit vitae?',
  },
};

export const Body3: Story = {
  args: {
    variant: 'body-3',
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at aut consectetur dolor, dolorum eius eum itaque obcaecati officiis omnis praesentium quibusdam quis quos sint soluta voluptates voluptatum. Ad aliquid architecto aspernatur assumenda atque dignissimos, dolore eaque est excepturi magnam maxime officiis omnis pariatur porro quam, quo temporibus velit vitae?',
  },
};
