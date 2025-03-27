import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { LoginUserNameModal } from './LoginUserNameModal';

const meta: Meta<typeof LoginUserNameModal> = {
  title: 'Auth/LoginUserNameModal',
  component: LoginUserNameModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoginUserNameModal>;

export const LoginUserNameModalDefault: Story = {
  decorators: [StoreDecorator({ auth: { activeModal: AuthModalType.LOGIN_USERNAME } })],

};
