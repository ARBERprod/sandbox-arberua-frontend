import type { Meta, StoryObj } from '@storybook/react';
import { PhoneField } from './PhoneField';

const meta: Meta<typeof PhoneField> = {
  title: 'shared/form/PhoneField',
  component: PhoneField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PhoneField>;

export const PhoneFieldDefault: Story = {

};
