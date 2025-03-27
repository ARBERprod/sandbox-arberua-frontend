import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'widgets/Header/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderVariantTransparent: Story = {
  args: {
    headerVariant: 'transparent',
  },
};

export const HeaderVariantGrey: Story = {
  args: {
    headerVariant: 'grey',
  },
};
