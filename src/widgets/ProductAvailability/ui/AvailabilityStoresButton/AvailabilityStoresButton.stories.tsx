import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityStoresButton } from './AvailabilityStoresButton';

const meta: Meta<typeof AvailabilityStoresButton> = {
  title: 'widgets/ProductAvailability/AvailabilityStoresButton',
  component: AvailabilityStoresButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AvailabilityStoresButton>;

export const AvailabilityStoresButtonDefault: Story = {

};
