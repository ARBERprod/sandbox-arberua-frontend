import type { Meta, StoryObj } from '@storybook/react';
import { InstagramCard } from './InstagramCard';
import { getMockInstagram } from '../../__mock__/mockInstagrams';

const meta: Meta<typeof InstagramCard> = {
  title: 'Entities/InstagramFeedback/InstagramCard',
  component: InstagramCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InstagramCard>;

export const InstagramCardDefault: Story = {
  args: {
    instagram: getMockInstagram(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
