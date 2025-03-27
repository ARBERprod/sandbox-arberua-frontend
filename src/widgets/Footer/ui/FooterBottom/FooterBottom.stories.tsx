import type { Meta, StoryObj } from '@storybook/react';
import { FooterBottom } from './FooterBottom';

const meta: Meta<typeof FooterBottom> = {
  title: 'widgets/Footer/FooterBottom',
  component: FooterBottom,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterBottom>;

export const FooterBottomDefault: Story = {
  args: {

  },
};
