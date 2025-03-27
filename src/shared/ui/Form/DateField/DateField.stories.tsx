import type { Meta, StoryObj } from '@storybook/react';
import { DateField } from './DateField';

const meta: Meta<typeof DateField> = {
  title: 'Shared/Form/DateField',
  component: DateField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const DateFieldDefault: Story = {

};
