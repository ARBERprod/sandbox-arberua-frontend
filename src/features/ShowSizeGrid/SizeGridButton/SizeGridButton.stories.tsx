import { Meta, StoryObj } from '@storybook/react';
import { SizeGridButton } from './SizeGridButton';

export default {
  title: 'features/SizeGridButton',
  component: SizeGridButton,
} as Meta<typeof SizeGridButton>;

type Story = StoryObj<typeof SizeGridButton>

export const SizeGridButtonDefault: Story = {
  args: {
    variant: 'default',
  },
};

export const SizeGridButtonIcon: Story = {
  args: {
    variant: 'icon',
  },
};
