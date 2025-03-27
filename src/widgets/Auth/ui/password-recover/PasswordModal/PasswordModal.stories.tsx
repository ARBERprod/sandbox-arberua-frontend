import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { AuthModalType } from '@/widgets/Auth/model/types/AuthSchema';
import { PasswordModal } from './PasswordModal';

const meta: Meta<typeof PasswordModal> = {
  title: 'Auth/PasswordModal',
  component: PasswordModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PasswordModal>;

export const PasswordModalDefault: Story = {
  decorators: [
    StoreDecorator({ auth: { activeModal: AuthModalType.RECOVER_PASSWORD } }),
  ],
};
