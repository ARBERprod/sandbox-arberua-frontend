import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Shared/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
 type Story = StoryObj<typeof Checkbox>;

export const CheckboxSimpleChecked: Story = {
  args: {
    name: 'name',
    value: true,
    label: 'Checkbox',
  },
};

export const CheckboxSimpleUnchecked: Story = {
  args: {
    name: 'some-name-2',
    value: false,
    label: 'Checkbox',
  },
};

export const CheckboxCheckedWithColor: Story = {
  args: {
    name: 'name',
    value: true,
    label: 'Checkbox',
    color: 'orange',
  },
};

export const CheckboxUnheckedWithColor: Story = {
  args: {
    name: 'name',
    value: false,
    label: 'Checkbox',
    color: 'blue',
  },
};

export const CheckboxUnheckedWhiteColor: Story = {
  args: {
    name: 'name',
    value: false,
    label: 'Checkbox',
    color: 'white',
  },
};
