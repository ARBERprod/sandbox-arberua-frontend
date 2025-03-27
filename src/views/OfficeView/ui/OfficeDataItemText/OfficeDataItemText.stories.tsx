import type { Meta, StoryObj } from '@storybook/react';
import { OfficeDataItemText } from './OfficeDataItemText';

const meta: Meta<typeof OfficeDataItemText> = {
  title: 'widgets/office/OfficeDataItemText',
  component: OfficeDataItemText,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeDataItemText>;

export const OfficeDataItemTextDefault: Story = {
  args: {
    title: 'Some title',
    content: 'Some content here',
  },
};
