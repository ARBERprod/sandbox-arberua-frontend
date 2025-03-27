import type { Meta, StoryObj } from '@storybook/react';
import { WomanBottomSizesTable } from './WomanBottomSizesTable';
import { getWomanBottomClothesData } from '../../../__mock__/getMockTableData';

const meta: Meta<typeof WomanBottomSizesTable> = {
  title: 'entities/Size/WomanBottomSizesTable',
  component: WomanBottomSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WomanBottomSizesTable>;

export const WomanBottomSizesTableDefault: Story = {
  args: {
    data: getWomanBottomClothesData(),
  },
};

export const WomanBottomSizesTableWithTitlePassed: Story = {
  args: {
    data: getWomanBottomClothesData(),
    title: 'Some title',
  },
};
