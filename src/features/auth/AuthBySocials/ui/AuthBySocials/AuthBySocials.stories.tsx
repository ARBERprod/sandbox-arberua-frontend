import type { Meta, StoryObj } from '@storybook/react';
import { AuthBySocials } from './AuthBySocials';

const meta: Meta<typeof AuthBySocials> = {
  title: 'Auth/AuthBySocials',
  component: AuthBySocials,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthBySocials>;

export const AuthBySocialsVariantButton: Story = {
  args: {
    variant: 'button',
  },
};

export const AuthBySocialsVariantIcon: Story = {
  args: {
    variant: 'icon',
  },
};
