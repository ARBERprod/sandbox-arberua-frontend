import type { Meta, StoryObj } from '@storybook/react';
import { PasswordModal } from './PasswordModal';

const meta: Meta<typeof PasswordModal> = {
  title: 'Auth/RecoverPassword/PasswordModal',
  component: PasswordModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PasswordModal>;

export const PasswordModalDefault: Story = {

};
