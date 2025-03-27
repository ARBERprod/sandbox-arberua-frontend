import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityModalMap } from './AvailabilityModalMap';

const meta: Meta<typeof AvailabilityModalMap> = {
  title: 'widgets/ProductAvailability/AvailabilityModalMap',
  component: AvailabilityModalMap,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AvailabilityModalMap>;

export const AvailabilityModalMapDefault: Story = {
};
