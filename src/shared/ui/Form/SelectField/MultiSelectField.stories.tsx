import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/ui/Typography';
import { Loader } from '@/shared/ui/Loader';
import { MultiSelectField } from './MultiSelectField';

export default {
  title: 'shared/Form/MultiSelectField',
  component: MultiSelectField,
} as Meta<typeof MultiSelectField>;

type Story = StoryObj<typeof MultiSelectField>

export const MultiSelectFieldDefault: Story = {
  args: {
    options: [
      {
        value: '1',
        label: '1111',
      },
      {
        value: '2',
        label: <Loader />,
      },
      {
        value: '3',
        label: <Typography variant="title-4">333</Typography>,
      },
    ],
    value: [],
  },
};
