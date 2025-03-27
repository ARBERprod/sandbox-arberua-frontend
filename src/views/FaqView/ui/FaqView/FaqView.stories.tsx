import type { Meta, StoryObj } from '@storybook/react';
import { FaqView } from './FaqView';

const meta: Meta<typeof FaqView> = {
  title: 'views/FaqView/FaqView',
  component: FaqView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqView>;

export const FaqViewDefault: Story = {

};
