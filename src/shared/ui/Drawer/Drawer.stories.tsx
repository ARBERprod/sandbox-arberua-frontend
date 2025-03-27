import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/ui/Typography';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'shared/Drawer',
  component: Drawer,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const DrawerRight: Story = {
  args: {
    isOpen: true,
    children: <Typography variant="title-1">Content</Typography>,
  },
};

export const DrawerLeft: Story = {
  args: {
    isOpen: true,
    anchor: 'left',
    children: <Typography variant="title-1">Content</Typography>,
  },
};

export const DrawerWithCloseButton: Story = {
  args: {
    isOpen: true,
    withCloseButton: true,
    children: <Typography variant="title-1">Content</Typography>,
  },
};
