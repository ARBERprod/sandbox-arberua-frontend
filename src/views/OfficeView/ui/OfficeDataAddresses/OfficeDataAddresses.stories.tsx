import type { Meta, StoryObj } from '@storybook/react';
import { OfficeDataAddresses } from './OfficeDataAddresses';

const meta: Meta<typeof OfficeDataAddresses> = {
  title: 'widgets/office/OfficeDataAddresses',
  component: OfficeDataAddresses,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeDataAddresses>;

export const OfficeDataAddressesDefault: Story = {
  decorators: [

  ],
};
