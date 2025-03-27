import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Shared/Form/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Label>;

export const LabelExample: Story = {
  args: {
    children: 'Label example',
  },
};
