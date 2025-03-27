import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuContainer } from './HeaderMenuContainer';

const meta: Meta<typeof HeaderMenuContainer> = {
  title: 'widgets/Header/HeaderMenuContainer',
  component: HeaderMenuContainer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuContainer>;

export const HeaderMenuContainerExpanded: Story = {
  args: {
  },
};
