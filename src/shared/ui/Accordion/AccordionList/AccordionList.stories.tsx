import type { Meta, StoryObj } from '@storybook/react';
import { AccordionList } from './AccordionList';

const meta: Meta<typeof AccordionList> = {
  title: 'shared/AccordionList',
  component: AccordionList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AccordionList>;

export const AccordionListDefault: Story = {
  args: {
    items: [
      {
        title: 'Hello',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam at aut cum deleniti ducimus eaque enim explicabo iure nulla optio repellendus reprehenderit sequi, unde voluptas voluptate voluptates voluptatum.\n',
      },
      {
        title: 'Hello',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam at aut cum deleniti ducimus eaque enim explicabo iure nulla optio repellendus reprehenderit sequi, unde voluptas voluptate voluptates voluptatum.\n',
      },
      {
        title: 'Hello',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam at aut cum deleniti ducimus eaque enim explicabo iure nulla optio repellendus reprehenderit sequi, unde voluptas voluptate voluptates voluptatum.\n',
      },
      {
        title: 'Hello',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam at aut cum deleniti ducimus eaque enim explicabo iure nulla optio repellendus reprehenderit sequi, unde voluptas voluptate voluptates voluptatum.\n',
      },
    ],
  },
};
