import type { Meta, StoryObj } from '@storybook/react';
import { AuthByGoogleForm } from './AuthByGoogleForm';

const meta: Meta<typeof AuthByGoogleForm> = {
  title: 'Example/AuthByGoogleForm',
  component: AuthByGoogleForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthByGoogleForm>;

export const AuthByGoogleFormDefault: Story = {

};
