import type { Meta, StoryObj } from '@storybook/react';
import { OfficeFeedbackView } from './OfficeFeedbackView';

const meta: Meta<typeof OfficeFeedbackView> = {
  title: 'views/OfficeFeedbackView',
  component: OfficeFeedbackView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeFeedbackView>;

export const OfficeFeedbackViewDefault: Story = {

};
