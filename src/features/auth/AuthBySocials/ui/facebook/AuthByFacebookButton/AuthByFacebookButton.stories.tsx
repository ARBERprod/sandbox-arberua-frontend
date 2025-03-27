import type { Meta, StoryObj } from '@storybook/react';
import { AuthByFacebookButton } from './AuthByFacebookButton';

const meta: Meta<typeof AuthByFacebookButton> = {
  title: 'Auth/AuthByFacebookButton',
  component: AuthByFacebookButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthByFacebookButton>;

export const AuthByFacebookButtonVariantButton: Story = {
  args: {
    variant: 'button',
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const AuthByFacebookButtonVariantIcon: Story = {
  args: {
    variant: 'icon',
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
