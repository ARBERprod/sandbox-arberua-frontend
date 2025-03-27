import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuButton } from './HeaderMenuButton';

const meta: Meta<typeof HeaderMenuButton> = {
  title: 'widgets/Header/HeaderMenuButton',
  component: HeaderMenuButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuButton>;

export const HeaderMenuButtonExpanded: Story = {
  args: {
    expanded: true,
  },
};

export const HeaderMenuButtonExpandedIsMobile: Story = {
  args: {
    expanded: true,
    isMobile: true,
  },
};
