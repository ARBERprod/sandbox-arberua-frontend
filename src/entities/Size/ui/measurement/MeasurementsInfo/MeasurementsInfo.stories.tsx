import type { Meta, StoryObj } from '@storybook/react';
import { MeasurementsInfo } from './MeasurementsInfo';

const meta: Meta<typeof MeasurementsInfo> = {
  title: 'entities/Size/MeasurementsInfo',
  component: MeasurementsInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MeasurementsInfo>;

export const MeasurementsInfoMan: Story = {
  args: {
    variant: 'man',
  },
};

export const MeasurementsInfoWoman: Story = {
  args: {
    variant: 'woman',
  },
};

export const MeasurementsInfoShoes: Story = {
  args: {
    variant: 'shoes',
  },
};
