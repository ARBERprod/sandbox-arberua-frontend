import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'shared/form/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const ErrorMessageDefault: Story = {
  args: {
    error: 'Some error text',
  },
};
