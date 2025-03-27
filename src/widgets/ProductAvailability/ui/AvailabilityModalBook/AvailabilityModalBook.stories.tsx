import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityModalBook } from './AvailabilityModalBook';

const meta: Meta<typeof AvailabilityModalBook> = {
  title: 'widgets/ProductAvailability/AvailabilityModalBook',
  component: AvailabilityModalBook,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AvailabilityModalBook>;

export const AvailabilityModalBookDefault: Story = {
  args: {
  },
};
