import type { Meta, StoryObj } from '@storybook/react';
import { getMockSmallProducts } from '@/entities/Product';
import { SearchModal } from './SearchModal';

const meta: Meta<typeof SearchModal> = {
  title: 'features/SearchModal',
  component: SearchModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchModal>;

export const SearchModalDefault: Story = {
  args: {
    items: getMockSmallProducts(),
  },
};
