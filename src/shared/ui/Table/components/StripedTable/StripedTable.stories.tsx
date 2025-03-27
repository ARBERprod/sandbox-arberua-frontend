import type { Meta, StoryObj } from '@storybook/react';
import { StripedTable } from './StripedTable';
import { columnsData, tableData } from '../../__mock__/mockTableData';

const meta: Meta<typeof StripedTable> = {
  title: 'shared/Table/StripedTable',
  component: StripedTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StripedTable>;

export const TableDefault: Story = {
  args: {

  },
  render: () => (
    <StripedTable
      data={tableData}
      columns={columnsData}
    />
  ),
};
