import type { Meta, StoryObj } from '@storybook/react';
import { RangeField } from './RangeField';

const meta: Meta<typeof RangeField> = {
  title: 'shared/Form/RangeField',
  component: RangeField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RangeField>;

export const RangeFieldDefault: Story = {
  args: {
    min: 0,
    max: 1000,
    endValue: 500,
    startValue: 20,
  },
};
