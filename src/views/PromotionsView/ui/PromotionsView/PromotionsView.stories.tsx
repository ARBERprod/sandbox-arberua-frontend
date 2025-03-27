import type { Meta, StoryObj } from '@storybook/react';
import { PromotionsView } from './PromotionsView';

const meta: Meta<typeof PromotionsView> = {
  title: 'views/PromotionsView',
  component: PromotionsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PromotionsView>;

export const PromotionsViewDefault: Story = {
  args: {

  },
};
