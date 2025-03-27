import { Meta, StoryObj } from '@storybook/react';
import { ToggleWishListButton } from './ToggleWishListButton';

export default {
  title: 'features/wishList/ToggleWishListButton',
  component: ToggleWishListButton,
} as Meta<typeof ToggleWishListButton>;

type Story = StoryObj<typeof ToggleWishListButton>

export const ToggleWishListButtonDefault: Story = {};
