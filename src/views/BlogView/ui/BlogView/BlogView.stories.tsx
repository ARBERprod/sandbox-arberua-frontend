import type { Meta, StoryObj } from '@storybook/react';
import { BlogView } from './BlogView';

const meta: Meta<typeof BlogView> = {
  title: 'views/BlogView',
  component: BlogView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BlogView>;

export const BlogViewDefault: Story = {

};
