import type { Meta, StoryObj } from '@storybook/react';
import { BalanceInfo } from './BalanceInfo';

const meta: Meta<typeof BalanceInfo> = {
  title: 'views/BalanceInfo',
  component: BalanceInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BalanceInfo>;

export const BalanceInfoDefault: Story = {
  args: {
  },
};
