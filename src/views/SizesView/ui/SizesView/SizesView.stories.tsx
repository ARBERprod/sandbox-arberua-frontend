import type { Meta, StoryObj } from '@storybook/react';
import { SizesView } from './SizesView';

const meta: Meta<typeof SizesView> = {
  title: 'views/sizesView/SizesView',
  component: SizesView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SizesView>;

export const SizesViewDefault: Story = {

};
