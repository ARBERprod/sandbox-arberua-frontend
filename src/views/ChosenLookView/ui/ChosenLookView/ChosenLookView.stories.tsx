import type { Meta, StoryObj } from '@storybook/react';
import { ChosenLookView } from './ChosenLookView';

const meta: Meta<typeof ChosenLookView> = {
  title: 'Views/ChosenLookView',
  component: ChosenLookView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ChosenLookView>;

export const ChosenLookViewDefault: Story = {

};
