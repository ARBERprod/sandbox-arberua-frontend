import type { Meta, StoryObj } from '@storybook/react';
import { TotalLookViewSidebarProducts } from './TotalLookViewSidebarProducts';

const meta: Meta<typeof TotalLookViewSidebarProducts> = {
  title: 'views/TotalLook/TotalLookViewSidebarProducts',
  component: TotalLookViewSidebarProducts,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TotalLookViewSidebarProducts>;

export const TotalLookViewSidebarProductsDefault: Story = {

};
