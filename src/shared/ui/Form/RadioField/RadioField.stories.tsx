import type { Meta, StoryObj } from '@storybook/react';
import { RadioField } from './RadioField';

const meta: Meta<typeof RadioField> = {
  title: 'shared/form/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const RadioFieldDefault: Story = {
  args: {
    options: [
      {
        label: 'На отделении “Новая Почта”',
        value: '1',
      },
      {
        label: 'Курьером “Новая Почта”',
        value: '2',
      },
      {
        label: 'На магазин',
        value: '3',
      },
    ],
  },
};
