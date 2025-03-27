import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaField } from './TextAreaField';

const meta: Meta<typeof TextAreaField> = {
  title: 'Shared/Form/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextAreaField>;

export const TextAreaFieldRegular: Story = {
  args: {
    name: 'some-name',
    id: 'some-id',
  },
};
