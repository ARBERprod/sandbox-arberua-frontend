import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuInfo } from './HeaderMenuInfo';

const meta: Meta<typeof HeaderMenuInfo> = {
  title: 'widgets/Header/HeaderMenuInfo',
  component: HeaderMenuInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuInfo>;

export const HeaderMenuInfoExpanded: Story = {
  args: {
  },
};
