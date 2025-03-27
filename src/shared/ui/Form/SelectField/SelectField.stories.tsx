import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'shared/Form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const SelectFieldDefault: Story = {
  args: {
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
    ],
    value: '1',
    label: 'Label',
  },
};

export const SelectFieldError: Story = {
  args: {
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
    ],
    value: '1',
    label: 'Label',
    error: 'error',
  },
};
