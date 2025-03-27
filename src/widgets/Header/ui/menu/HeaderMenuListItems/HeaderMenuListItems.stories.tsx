import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuListItems } from './HeaderMenuListItems';
import { headerMenuMainMocked2 } from '../../../constants/headerMenu';

const meta: Meta<typeof HeaderMenuListItems> = {
  title: 'widgets/Header/HeaderMenuListItems',
  component: HeaderMenuListItems,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuListItems>;

export const HeaderMenuListItemsNotNested: Story = {
  args: {
    items: headerMenuMainMocked2,
    isNested: false,
  },
};

export const HeaderMenuListItemsNested: Story = {
  args: {
    items: headerMenuMainMocked2,
    isNested: true,
  },
};
