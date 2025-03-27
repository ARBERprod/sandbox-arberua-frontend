import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { RegisterModal } from './RegisterModal';

const meta: Meta<typeof RegisterModal> = {
  title: 'Auth/RegisterModal',
  component: RegisterModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RegisterModal>;

export const RegisterModalDefault: Story = {
  decorators: [
    StoreDecorator({ auth: { activeModal: AuthModalType.REGISTER } }),
  ],
};
