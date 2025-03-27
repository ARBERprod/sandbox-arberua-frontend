import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Checkout } from './Checkout';

const meta: Meta<typeof Checkout> = {
  title: 'widgets/Checkout',
  component: Checkout,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Checkout>;

export const CheckoutDefault: Story = {
  decorators: [
    StoreDecorator({
      session: {
        isFetching: false,
        isLoaded: true,
      },
    }),
  ],
};
