import type { Meta, StoryObj } from '@storybook/react';
import { TotalLookView } from './TotalLookView';

const meta: Meta<typeof TotalLookView> = {
  title: 'Views/TotalLookView',
  component: TotalLookView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TotalLookView>;

export const TotalLookViewDefault: Story = {

};
