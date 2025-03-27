import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenu } from './HeaderMenu';

const meta: Meta<typeof HeaderMenu> = {
  title: 'widgets/Header/HeaderMenu',
  component: HeaderMenu,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenu>;

export const HeaderMenuExpanded: Story = {
  args: {
    expanded: true,
  },
};

export const HeaderMenuExpandedOverlay: Story = {
  args: {
    expanded: true,
    expandedOverlay: true,
  },
};
