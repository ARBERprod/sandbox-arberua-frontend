import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { LoginUserPasswordModal } from './LoginUserPasswordModal';

const meta: Meta<typeof LoginUserPasswordModal> = {
  title: 'Auth/LoginUserPasswordModal',
  component: LoginUserPasswordModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoginUserPasswordModal>;

export const LoginUserPasswordModalDefault: Story = {
  decorators: [StoreDecorator({ auth: { activeModal: AuthModalType.LOGIN_PASSWORD } })],
};
