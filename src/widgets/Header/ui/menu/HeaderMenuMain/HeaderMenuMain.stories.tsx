import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuMain } from './HeaderMenuMain';

const meta: Meta<typeof HeaderMenuMain> = {
  title: 'widgets/Header/HeaderMenuMain',
  component: HeaderMenuMain,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuMain>;

export const HeaderMenuMainDefault: Story = {
  args: {
  },
};
