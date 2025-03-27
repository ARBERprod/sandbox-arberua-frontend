import type { Meta, StoryObj } from '@storybook/react';
import { BonusTable } from './BonusTable';
import { getMockBonuses } from '../../__mock__/getMockBonuses';

const meta: Meta<typeof BonusTable> = {
  title: 'entities/Bonus/BonusTable',
  component: BonusTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusTable>;

export const BonusTableDefault: Story = {
  args: {
    bonuses: getMockBonuses(),
  },
};
