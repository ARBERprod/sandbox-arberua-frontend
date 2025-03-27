import type { Meta, StoryObj } from '@storybook/react';
import { Favourites } from './Favourites';

const meta: Meta<typeof Favourites> = {
  title: 'Shared/Favourites',
  component: Favourites,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Favourites>;

export const FavouritesNotActive: Story = {
  args: {
    quantity: 12,
    active: false,
  },
};

export const FavouritesActive: Story = {
  args: {
    quantity: 5,
    active: true,
  },
};
