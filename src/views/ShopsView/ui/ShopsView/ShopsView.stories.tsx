import type { Meta, StoryObj } from '@storybook/react';
import { ShopsView } from './ShopsView';

const meta: Meta<typeof ShopsView> = {
  title: 'views/ShopsView',
  component: ShopsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShopsView>;

export const ShopsViewDefault: Story = {

};
