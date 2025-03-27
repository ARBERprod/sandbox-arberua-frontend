import type { Meta, StoryObj } from '@storybook/react';
import { InstagramView } from './InstagramView';

const meta: Meta<typeof InstagramView> = {
  title: 'Views/InstagramView',
  component: InstagramView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InstagramView>;

export const InstagramViewDefault: Story = {

};
