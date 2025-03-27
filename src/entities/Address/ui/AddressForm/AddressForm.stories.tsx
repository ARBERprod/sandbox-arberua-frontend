import type { Meta, StoryObj } from '@storybook/react';
import { AddressForm } from './AddressForm';

const meta: Meta<typeof AddressForm> = {
  title: 'entities/Address/AddressForm',
  component: AddressForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AddressForm>;

export const AddressFormDefault: Story = {

};
