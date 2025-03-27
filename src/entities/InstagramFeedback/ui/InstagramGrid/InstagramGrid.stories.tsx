import type { Meta, StoryObj } from '@storybook/react';
import { CardView } from '@/shared/types/common';
import { InstagramGrid } from './InstagramGrid';
import { getMockInstagrams } from '../../__mock__/mockInstagrams';

const instagrams = getMockInstagrams(18);

const meta: Meta<typeof InstagramGrid> = {
  title: 'Entities/InstagramFeedback/InstagramGrid',
  component: InstagramGrid,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InstagramGrid>;

export const InstagramGridNormalView: Story = {
  args: {
    instagrams,
    view: CardView.NORMAL,
  },
};

export const InstagramGridSmallView: Story = {
  args: {
    instagrams,
    view: CardView.SMALL,
  },
};

export const InstagramGridBigView: Story = {
  args: {
    instagrams,
    view: CardView.BIG,
  },
};
