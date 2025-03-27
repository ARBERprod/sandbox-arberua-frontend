import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityStoresModal } from './AvailabilityStoresModal';

const meta: Meta<typeof AvailabilityStoresModal> = {
  title: 'widgets/ProductAvailability/AvailabilityStoresModal',
  component: AvailabilityStoresModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AvailabilityStoresModal>;

export const AvailabilityStoresModalDefault: Story = {
};
