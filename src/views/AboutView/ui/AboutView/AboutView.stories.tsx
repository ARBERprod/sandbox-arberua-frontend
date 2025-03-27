import type { Meta, StoryObj } from '@storybook/react';
import { AboutView } from './AboutView';

const meta: Meta<typeof AboutView> = {
  title: 'views/AboutView',
  component: AboutView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AboutView>;

export const AboutViewDefault: Story = {

};
