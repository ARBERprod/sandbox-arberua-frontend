import type { Meta, StoryObj } from '@storybook/react';
import { NotFoundView } from './NotFoundView';

const meta: Meta<typeof NotFoundView> = {
  title: 'views/NotFoundView',
  component: NotFoundView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NotFoundView>;

export const NotFoundViewDefault: Story = {

};
