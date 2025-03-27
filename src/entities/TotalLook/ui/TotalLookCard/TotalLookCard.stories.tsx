import type { Meta, StoryObj } from '@storybook/react';
import { TotalLookCard } from './TotalLookCard';
import { getMockedTotalLook } from '../../__mock__/getMockedTotalLook';

const meta: Meta<typeof TotalLookCard> = {
  title: 'entities/TotalLook/TotalLookCard',
  component: TotalLookCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TotalLookCard>;

export const TotalLookCardDefault: Story = {
  args: {
    totalLook: getMockedTotalLook(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
