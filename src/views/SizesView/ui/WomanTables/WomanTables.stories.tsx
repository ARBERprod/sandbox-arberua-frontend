import type { Meta, StoryObj } from '@storybook/react';
import { WomanTables } from './WomanTables';

const meta: Meta<typeof WomanTables> = {
  title: 'views/sizesView/WomanTables',
  component: WomanTables,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WomanTables>;

export const WomanTablesDefault: Story = {

};
