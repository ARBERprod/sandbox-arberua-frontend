import type { Meta, StoryObj } from '@storybook/react';
import { getManBottomClothesData } from '../../../__mock__/getMockTableData';
import { ManBottomSizesTable } from './ManBottomSizesTable';

const meta: Meta<typeof ManBottomSizesTable> = {
  title: 'entities/Size/ManBottomSizesTable',
  component: ManBottomSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ManBottomSizesTable>;

export const ManBottomSizesTableDefault: Story = {
  args: {
    data: getManBottomClothesData(),
  },
};

export const ManBottomSizesTableWithTitlePassed: Story = {
  args: {
    data: getManBottomClothesData(),
    title: 'Some title',
  },
};
