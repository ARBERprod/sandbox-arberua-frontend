import type { Meta, StoryObj } from '@storybook/react';
import { Svg } from '@/shared/ui/Svg';
import InfoIcon from '@/shared/assets/icons/info.svg';
import { Typography } from '@/shared/ui/Typography';
import { getWomanTopClothesData } from '../../../__mock__/getMockTableData';
import { WomanTopSizesTable } from './WomanTopSizesTable';

const meta: Meta<typeof WomanTopSizesTable> = {
  title: 'entities/Size/WomanTopSizesTable',
  component: WomanTopSizesTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WomanTopSizesTable>;

export const WomanTopSizesTableDefault: Story = {
  args: {
    data: getWomanTopClothesData(),
  },
};

export const WomanTopSizesTableWithTitlePassed: Story = {
  args: {
    data: getWomanTopClothesData(),
    title: 'Some title',
  },
};

export const WomanTopSizesTableWithAction: Story = {
  args: {
    data: getWomanTopClothesData(),
    title: 'Some title',
    action: (
      <Typography onClick={() => {}} centered color="grey-dark" variant="body-2" as="button">
        <Svg width={20} height={20} Icon={InfoIcon} />
        {' '}
        Як знімати мірки?
      </Typography>
    ),
  },
};
