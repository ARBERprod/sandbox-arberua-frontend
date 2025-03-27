import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuSocials } from './HeaderMenuSocials';

const meta: Meta<typeof HeaderMenuSocials> = {
  title: 'widgets/Header/HeaderMenuSocials',
  component: HeaderMenuSocials,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuSocials>;

export const HeaderMenuSocialsDefault: Story = {
  args: {
  },
};
