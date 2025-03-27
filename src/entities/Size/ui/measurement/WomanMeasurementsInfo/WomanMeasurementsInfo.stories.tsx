import type { Meta, StoryObj } from '@storybook/react';
import { WomanMeasurementsInfo } from './WomanMeasurementsInfo';

const meta: Meta<typeof WomanMeasurementsInfo> = {
  title: 'entities/Size/WomanMeasurementsInfo',
  component: WomanMeasurementsInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WomanMeasurementsInfo>;

export const WomanMeasurementsInfoDefault: Story = {

};
