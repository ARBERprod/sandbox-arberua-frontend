import type { Meta, StoryObj } from '@storybook/react';
import { TotalLookViewSidebar } from './TotalLookViewSidebar';

const meta: Meta<typeof TotalLookViewSidebar> = {
  title: 'views/TotalLook/TotalLookViewSidebar',
  component: TotalLookViewSidebar,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TotalLookViewSidebar>;

export const TotalLookViewSidebarDefault: Story = {

};
