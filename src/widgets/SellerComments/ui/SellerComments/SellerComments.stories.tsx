import type { Meta, StoryObj } from '@storybook/react';
import { SellerComments } from './SellerComments';

const meta: Meta<typeof SellerComments> = {
  title: 'widgets/SellerComments',
  component: SellerComments,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SellerComments>;

export const SellerCommentsDefault: Story = {

};
