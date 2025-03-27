import type { Meta, StoryObj } from '@storybook/react';
import { ShopView } from './ShopView';

const meta: Meta<typeof ShopView> = {
  title: 'views/ShopView',
  component: ShopView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShopView>;

export const ShopViewDefault: Story = {

};
