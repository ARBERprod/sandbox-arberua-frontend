import type { Meta, StoryObj } from '@storybook/react';
import { FooterTop } from './FooterTop';

const meta: Meta<typeof FooterTop> = {
  title: 'widgets/Footer/FooterTop',
  component: FooterTop,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterTop>;

export const FooterTopDefault: Story = {
  args: {

  },
};
