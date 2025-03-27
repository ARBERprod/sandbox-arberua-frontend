import type { Meta, StoryObj } from '@storybook/react';
import { RecoverPassword } from './RecoverPassword';

const meta: Meta<typeof RecoverPassword> = {
  title: 'features/auth/RecoverPassword',
  component: RecoverPassword,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RecoverPassword>;

export const RecoverPasswordDefault: Story = {

};
