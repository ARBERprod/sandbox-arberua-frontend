import type { Meta, StoryObj } from '@storybook/react';
import { EmailModal } from './EmailModal';

const meta: Meta<typeof EmailModal> = {
  title: 'Auth/RecoverPassword/EmailModal',
  component: EmailModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EmailModal>;

export const EmailModalDefault: Story = {

};
