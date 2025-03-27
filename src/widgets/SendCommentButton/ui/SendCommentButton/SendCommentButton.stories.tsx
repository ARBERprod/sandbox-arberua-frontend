import type { Meta, StoryObj } from '@storybook/react';
import { SendCommentButton } from './SendCommentButton';

const meta: Meta<typeof SendCommentButton> = {
  title: 'widgets/SendCommentButton',
  component: SendCommentButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SendCommentButton>;

export const SendCommentButtonDefault: Story = {

};
