import type { Meta, StoryObj } from '@storybook/react';
import { getMockBonuses } from '../../__mock__/getMockBonuses';
import { BonusList } from './BonusList';

const meta: Meta<typeof BonusList> = {
  title: 'entities/Bonus/BonusList',
  component: BonusList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusList>;

export const BonusListDefault: Story = {
  args: {
    bonuses: getMockBonuses(),
  },
};
