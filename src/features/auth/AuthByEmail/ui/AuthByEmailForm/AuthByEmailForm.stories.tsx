import type { Meta, StoryObj } from '@storybook/react';
import { AuthByEmailForm } from './AuthByEmailForm';

const meta: Meta<typeof AuthByEmailForm> = {
  title: 'features/AuthByEmailForm',
  component: AuthByEmailForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthByEmailForm>;

export const AuthByEmailFormDefault: Story = {

};
