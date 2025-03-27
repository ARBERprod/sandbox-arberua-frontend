import type { Meta, StoryObj } from '@storybook/react';
import { ManTables } from './ManTables';

const meta: Meta<typeof ManTables> = {
  title: 'views/sizesView/ManTables',
  component: ManTables,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ManTables>;

export const ManTablesDefault: Story = {

};
