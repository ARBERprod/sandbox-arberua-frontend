import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuItem } from './HeaderMenuItem';

const meta: Meta<typeof HeaderMenuItem> = {
  title: 'widgets/Header/HeaderMenuItem',
  component: HeaderMenuItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuItem>;

export const HeaderMenuItemTypeLink: Story = {
  args: {
    href: '',
    children: 'Text',
    type: 'link',
    marked: false,
    targetMenu: false,
    nested: false,
    isNested: false,
  },
};

export const HeaderMenuItemTypeButton: Story = {
  args: {
    href: '',
    children: 'Text',
    type: 'button',
    marked: false,
    targetMenu: false,
    nested: false,
    isNested: false,
  },
};

export const HeaderMenuItemTypeAccordion: Story = {
  args: {
    href: '',
    children: 'Text',
    type: 'accordion',
    marked: false,
    targetMenu: false,
    nested: false,
    isNested: false,
  },
};

export const HeaderMenuItemTypeLinkMarked: Story = {
  args: {
    href: '',
    children: 'Text',
    type: 'link',
    marked: true,
    targetMenu: false,
    nested: false,
    isNested: false,
  },
};

export const HeaderMenuItemTypeButtonIsNested: Story = {
  args: {
    href: '',
    children: 'Text',
    type: 'button',
    marked: false,
    targetMenu: false,
    nested: [{
      title: 'Title',
      children: false,
      button: false,
    }, {
      title: 'Title',
      children: false,
      button: false,
    }],
    isNested: true,
  },
};
