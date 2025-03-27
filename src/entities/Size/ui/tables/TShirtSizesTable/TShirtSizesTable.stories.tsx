import type { Meta, StoryObj } from '@storybook/react';
import { TShirtSizesTable } from './TShirtSizesTable';
import { getTShortData } from '../../../__mock__/getMockTableData';

const meta: Meta<typeof TShirtSizesTable> = {
  title: 'entities/Size/TShirtSizesTable',
  component: TShirtSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TShirtSizesTable>;

export const TShirtSizesTableDefault: Story = {
  args: {
    data: getTShortData(),
  },
};

export const TShirtSizesTableWithTitlePassed: Story = {
  args: {
    data: getTShortData(),
    title: 'Some title',
  },
};
