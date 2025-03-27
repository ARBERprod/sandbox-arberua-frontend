import type { Meta, StoryObj } from '@storybook/react';
import { HeaderAuthActions } from './HeaderAuthActions';

const meta: Meta<typeof HeaderAuthActions> = {
  title: 'widgets/Header/HeaderAuthActions',
  component: HeaderAuthActions,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderAuthActions>;

export const HeaderAuthActionsDefault: Story = {
  args: {

  },
};
