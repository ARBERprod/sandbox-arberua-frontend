import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityAccordionItem } from './AvailabilityAccordionItem';
import { getMockShop } from '@/entities/Shop';

const meta: Meta<typeof AvailabilityAccordionItem> = {
  title: 'widgets/ProductAvailability/AvailabilityAccordionItem',
  component: AvailabilityAccordionItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AvailabilityAccordionItem>;

export const AvailabilityAccordionItemDefault: Story = {
  args: {
    shop: getMockShop(),
  },
};
