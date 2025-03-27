import type { Meta, StoryObj } from '@storybook/react';
import { ArberHeightSizesTable } from './ArberHeightSizesTable';
import { getArberHeightData } from '../../../__mock__/getMockTableData';

const meta: Meta<typeof ArberHeightSizesTable> = {
  title: 'entities/Size/ArberHeightSizesTable',
  component: ArberHeightSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ArberHeightSizesTable>;

export const ArberHeightSizesTableDefault: Story = {
  args: {
    data: getArberHeightData(),
  },
};
