import type { Meta, StoryObj } from '@storybook/react';
import { ShoesMeasurementsInfo } from './ShoesMeasurementsInfo';

const meta: Meta<typeof ShoesMeasurementsInfo> = {
  title: 'entities/Size/ShoesMeasurementsInfo',
  component: ShoesMeasurementsInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShoesMeasurementsInfo>;

export const ShoesMeasurementsInfoDefault: Story = {

};
