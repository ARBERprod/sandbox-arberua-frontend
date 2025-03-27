import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityModalContent } from './AvailabilityModalContent';

const meta: Meta<typeof AvailabilityModalContent> = {
  title: 'widgets/ProductAvailability/AvailabilityModalContent',
  component: AvailabilityModalContent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AvailabilityModalContent>;

export const AvailabilityModalContentDefault: Story = {

};
