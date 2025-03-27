import type { Meta, StoryObj } from '@storybook/react';
import { PasswordForm } from './PasswordForm';

const meta: Meta<typeof PasswordForm> = {
  title: 'Auth/PasswordForm',
  component: PasswordForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PasswordForm>;

export const PasswordFormDefault: Story = {
  args: {
    title: 'Придумайте новый пароль',
    btnText: 'Сменить пароль и войти',
  },
};
