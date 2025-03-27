import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Shared/Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const RadioCheckedWithLabel: Story = {
  args: {
    name: 'name',
    value: 'value',
    checked: true,
    label: 'Radio button',
  },
};
