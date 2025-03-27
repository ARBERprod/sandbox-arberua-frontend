import type { Meta, StoryObj } from '@storybook/react';
import { CountLabel } from './CountLabel';

const meta: Meta<typeof CountLabel> = {
  title: 'shared/CountLabel',
  component: CountLabel,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CountLabel>;

export const CountLabelDefault: Story = {
  args: {
    count: 100,
  },
};
