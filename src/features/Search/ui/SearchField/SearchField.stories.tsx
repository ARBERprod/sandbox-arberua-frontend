import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Shared/form/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const SearchFieldRegular: Story = {
  args: {},
};
