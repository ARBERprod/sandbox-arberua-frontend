import type { Meta, StoryObj } from '@storybook/react';
import { AuthByGoogleButton } from './AuthByGoogleButton';

const meta: Meta<typeof AuthByGoogleButton> = {
  title: 'Auth/AuthByGoogleButton',
  component: AuthByGoogleButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthByGoogleButton>;

export const AuthByGoogleButtonVariantButton: Story = {
  args: {
    variant: 'button',
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const AuthByGoogleButtonVariantIcon: Story = {
  args: {
    variant: 'icon',
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
