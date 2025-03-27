import type { Meta, StoryObj } from '@storybook/react';
import { getMockPromotion } from '../../__mock__/mockPromotions';
import { PromotionCard } from './PromotionCard';

const meta: Meta<typeof PromotionCard> = {
  title: 'entities/Promotion/PromotionCard',
  component: PromotionCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PromotionCard>;

export const PromotionDefault: Story = {
  args: {
    promotion: getMockPromotion(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
