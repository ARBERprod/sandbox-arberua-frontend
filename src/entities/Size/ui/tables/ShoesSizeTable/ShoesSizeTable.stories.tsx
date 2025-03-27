import type { Meta, StoryObj } from '@storybook/react';
import { ShoesSizeTable } from './ShoesSizeTable';
import { getShoesData } from '../../../__mock__/getMockTableData';

const meta: Meta<typeof ShoesSizeTable> = {
  title: 'entities/Size/ShoesSizeTable',
  component: ShoesSizeTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShoesSizeTable>;

export const ShoesSizeTableDefault: Story = {
  args: {
    data: getShoesData(),
  },
};

export const ShoesSizeTableWithTitlePassed: Story = {
  args: {
    data: getShoesData(),
    title: 'Some title',
  },
};
