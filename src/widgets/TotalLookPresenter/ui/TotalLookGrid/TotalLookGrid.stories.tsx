import type { Meta, StoryObj } from '@storybook/react';
import { getMockTotalLooks } from '@/entities/TotalLook';
import { TotalLookGrid } from './TotalLookGrid';

const meta: Meta<typeof TotalLookGrid> = {
  title: 'widgets/TotalLookPresenter/TotalLookGrid',
  component: TotalLookGrid,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TotalLookGrid>;

export const TotalLookGridDefault: Story = {
  args: {
    totalLooks: getMockTotalLooks(),
  },
};
