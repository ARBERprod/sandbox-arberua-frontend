import type { Meta, StoryObj } from '@storybook/react';
import { CallbackForm } from './CallbackForm';

const meta: Meta<typeof CallbackForm> = {
  title: 'features/CallbackForm',
  component: CallbackForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CallbackForm>;

export const CallbackFormDefault: Story = {

};
