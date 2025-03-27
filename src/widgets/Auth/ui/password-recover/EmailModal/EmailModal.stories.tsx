import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { AuthModalType } from '@/widgets/Auth/model/types/AuthSchema';
import { EmailModal } from './EmailModal';

const meta: Meta<typeof EmailModal> = {
  title: 'Auth/EmailModal',
  component: EmailModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EmailModal>;

export const EmailModalDefault: Story = {
  decorators: [
    StoreDecorator({ auth: { activeModal: AuthModalType.RECOVER_EMAIL } }),
  ],
};
