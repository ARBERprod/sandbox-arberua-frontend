import type { Meta, StoryObj } from '@storybook/react';
import { PhoneNumberForm } from './PhoneNumberForm';

const meta: Meta<typeof PhoneNumberForm> = {
  title: 'features/EditPersonalData/PhoneNumberForm',
  component: PhoneNumberForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PhoneNumberForm>;

export const PhoneNumberFormDefault: Story = {

};
