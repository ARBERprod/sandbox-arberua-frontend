import type { Meta, StoryObj } from '@storybook/react';
import { LabelDiscount } from './LabelDiscount';

const meta: Meta<typeof LabelDiscount> = {
  title: 'Shared/LabelDiscount',
  component: LabelDiscount,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LabelDiscount>;

export const LabelDiscountDefault: Story = {
  args: {
    discount: '10%',
  },
};
