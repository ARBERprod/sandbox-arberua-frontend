import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutForm } from './CheckoutForm';

const meta: Meta<typeof CheckoutForm> = {
  title: 'features/CheckoutForm',
  component: CheckoutForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CheckoutForm>;

export const CheckoutFormDefault: Story = {

};
