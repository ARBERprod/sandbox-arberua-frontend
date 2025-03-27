import type { Meta, StoryObj } from '@storybook/react';
import { PasswordField } from './PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'shared/form/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const PasswordFieldDefault: Story = {

};
