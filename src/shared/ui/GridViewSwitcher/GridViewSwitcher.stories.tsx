import type { Meta, StoryObj } from '@storybook/react';
import { GridViewSwitcher } from './GridViewSwitcher';

const meta: Meta<typeof GridViewSwitcher> = {
  title: 'shared/GridViewSwitcher',
  component: GridViewSwitcher,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GridViewSwitcher>;

export const GridViewSwitcherDefault: Story = {

};
