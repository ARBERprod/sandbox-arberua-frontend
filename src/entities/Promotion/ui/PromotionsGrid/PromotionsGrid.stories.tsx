import type { Meta, StoryObj } from '@storybook/react';
import { PromotionsGrid } from './PromotionsGrid';
import { getMockPromotions } from '../../__mock__/mockPromotions';

const meta: Meta<typeof PromotionsGrid> = {
  title: 'entities/Promotion/PromotionsGrid',
  component: PromotionsGrid,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PromotionsGrid>;

export const PromotionsGridDefault: Story = {
  args: {
    promotions: getMockPromotions(),
  },
};
