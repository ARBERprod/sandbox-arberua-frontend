import type { Meta, StoryObj } from '@storybook/react';
import { FooterMenuWithTitle } from './FooterMenuWithTitle';
import { footerMenu3 } from '../../constants/footerMenu';

const meta: Meta<typeof FooterMenuWithTitle> = {
  title: 'widgets/Footer/FooterMenuWithTitle',
  component: FooterMenuWithTitle,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterMenuWithTitle>;

export const FooterMenuWithTitleDefault: Story = {
  args: {
    title: 'Про компанию',
    items: footerMenu3,
  },
};
