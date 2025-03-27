import type { Meta, StoryObj } from '@storybook/react';
import { ManTopSizesTable } from './ManTopSizesTable';

const meta: Meta<typeof ManTopSizesTable> = {
  title: 'entities/Size/ManTopSizesTable',
  component: ManTopSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ManTopSizesTable>;

export const ManTopSizesTableDefault: Story = {
  args: {
    data: undefined,
  },
};

export const ManTopSizesTableWithTitlePassed: Story = {
  args: {
    data: undefined,
    title: 'Some title',
  },
};
