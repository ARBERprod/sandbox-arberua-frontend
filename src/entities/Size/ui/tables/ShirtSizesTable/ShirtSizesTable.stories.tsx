import type { Meta, StoryObj } from '@storybook/react';
import { ShirtSizesTable } from './ShirtSizesTable';
import { getShortData } from '../../../__mock__/getMockTableData';

const meta: Meta<typeof ShirtSizesTable> = {
  title: 'entities/Size/ShirtSizesTable',
  component: ShirtSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShirtSizesTable>;

export const ShirtSizesTableDefault: Story = {
  args: {
    data: getShortData(),
  },
};

export const ShirtSizesTableWithTitlePassed: Story = {
  args: {
    data: getShortData(),
    title: 'Some title',
  },
};
