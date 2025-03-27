import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'widgets/Footer/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const FooterWithoutBanner: Story = {
  args: {
    withBanner: false,
  },
};

export const FooterWithBanner: Story = {
  args: {
    withBanner: true,
  },
};
