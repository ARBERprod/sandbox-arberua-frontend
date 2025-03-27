import type { Meta, StoryObj } from '@storybook/react';
import { AuthProposal } from './AuthProposal';

const meta: Meta<typeof AuthProposal> = {
  title: 'Auth/AuthProposal',
  component: AuthProposal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthProposal>;

export const AuthProposalToRegister: Story = {
  args: {
    to: 'register',
  },
};

export const AuthProposalToLogin: Story = {
  args: {
    to: 'login',
  },
};
