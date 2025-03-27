import type { Meta, StoryObj } from '@storybook/react';
import { SeparatedTable } from './SeparatedTable';
import { separatedTableColumns, separatedTableData } from '../../__mock__/mockTableData';

const meta: Meta<typeof SeparatedTable> = {
  title: 'shared/Table/SeparatedTable',
  component: SeparatedTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SeparatedTable>;

export const SeparatedTableDefault: Story = {
  render: () => (
    <SeparatedTable
      data={separatedTableData}
      columns={separatedTableColumns}
    />
  ),
};
