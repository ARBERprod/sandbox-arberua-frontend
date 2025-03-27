import type { Meta, StoryObj } from '@storybook/react';
import { BonusesView } from './BonusesView';

const meta: Meta<typeof BonusesView> = {
  title: 'views/BonusesView',
  component: BonusesView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusesView>;

export const BonusesViewDefault: Story = {

};
