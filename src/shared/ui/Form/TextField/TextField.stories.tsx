import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Shared/Form/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const TextFieldRegular: Story = {
  args: {
    type: 'text',
  },
};
