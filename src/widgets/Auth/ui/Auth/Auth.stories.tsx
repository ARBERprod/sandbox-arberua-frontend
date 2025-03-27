import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { AuthModalType } from '../../model/types/AuthSchema';
import { Auth } from './Auth';

const meta: Meta<typeof Auth> = {
  title: 'processes/Auth',
  component: Auth,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Auth>;

export const AuthStory: Story = {
  decorators: [
    StoreDecorator({
      auth: {
        activeModal: AuthModalType.LOGIN_USERNAME,
        login: '',
      },
    }),
  ],
};
