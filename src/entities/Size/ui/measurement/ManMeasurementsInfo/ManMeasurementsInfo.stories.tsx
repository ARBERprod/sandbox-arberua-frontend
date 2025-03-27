import type { Meta, StoryObj } from '@storybook/react';
import { ManMeasurementsInfo } from './ManMeasurementsInfo';

const meta: Meta<typeof ManMeasurementsInfo> = {
  title: 'entities/Size/ManMeasurementsInfo',
  component: ManMeasurementsInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ManMeasurementsInfo>;

export const ManMeasurementsInfoDefault: Story = {

};
