import type { Meta, StoryObj } from '@storybook/react';
import { getMockedTotalLook } from '@/entities/TotalLook';
import { SingleTotalLookCard } from './SingleTotalLookCard';

const meta: Meta<typeof SingleTotalLookCard> = {
  title: 'widgets/TotalLookPresenter/SingleTotalLookCard',
  component: SingleTotalLookCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SingleTotalLookCard>;

export const SingleTotalLookCardDefault: Story = {
  args: {
    totalLook: getMockedTotalLook(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
