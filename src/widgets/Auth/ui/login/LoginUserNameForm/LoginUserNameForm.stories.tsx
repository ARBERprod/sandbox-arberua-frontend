import type { Meta, StoryObj } from '@storybook/react';
import { LoginUserNameForm } from './LoginUserNameForm';

const meta: Meta<typeof LoginUserNameForm> = {
  title: 'Auth/LoginUserNameForm',
  component: LoginUserNameForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoginUserNameForm>;

export const LoginUserNameFormDefault: Story = {

};
