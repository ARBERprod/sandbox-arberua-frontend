import type { Meta, StoryObj } from '@storybook/react';
import { FooterMenu, FooterMenuVariants } from './FooterMenu';
import { footerMenu3 } from '../../constants/footerMenu';

const meta: Meta<typeof FooterMenu> = {
  title: 'widgets/Footer/FooterMenu',
  component: FooterMenu,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterMenu>;

export const FooterMenuDefault: Story = {
  args: {
    items: footerMenu3,
  },
};

export const FooterMenuVariantSecondary: Story = {
  args: {
    items: footerMenu3,
    variant: FooterMenuVariants.SECONDARY,
  },
};
