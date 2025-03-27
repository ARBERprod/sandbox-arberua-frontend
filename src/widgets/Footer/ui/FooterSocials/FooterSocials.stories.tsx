import type { Meta, StoryObj } from '@storybook/react';
import { FooterSocials } from './FooterSocials';

const meta: Meta<typeof FooterSocials> = {
  title: 'widgets/Footer/FooterSocials',
  component: FooterSocials,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterSocials>;

export const FooterSocialsDefault: Story = {
  args: {
  },
};
