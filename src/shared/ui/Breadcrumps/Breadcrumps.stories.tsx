import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/ui/Typography';
import { Breadcrumps } from './Breadcrumps';

const meta: Meta<typeof Breadcrumps> = {
  title: 'shared/Breadcrumps',
  component: Breadcrumps,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumps>;

export const BreadcrumpsDefault: Story = {
  args: {
    children: [
      <Typography key="1">1</Typography>,
      <Typography key="2">2</Typography>,
      <Typography key="3" color="red">3</Typography>,
    ],
  },
};

export const BreadcrumpsWithOneChild: Story = {
  args: {
    children: <Typography>1</Typography>,
  },
};

export const BreadcrumpsText: Story = {
  args: {
    children: 'Some text',
  },
};

export const BreadcrumpsFragment: Story = {
  args: {
    children: (
      // eslint-disable-next-line
      <>
        <Typography>Some</Typography>
        <Typography>Some</Typography>
        <Typography>Some</Typography>
        <Typography>Some</Typography>
      </>
    ),
  },
};
