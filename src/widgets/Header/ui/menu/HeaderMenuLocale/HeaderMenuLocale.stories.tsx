import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuLocale } from './HeaderMenuLocale';

const meta: Meta<typeof HeaderMenuLocale> = {
  title: 'widgets/Header/HeaderMenuLocale',
  component: HeaderMenuLocale,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuLocale>;

export const HeaderMenuLocaleDefault: Story = {
  args: {
  },
};
