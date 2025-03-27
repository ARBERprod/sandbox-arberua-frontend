import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@/shared/ui/Flex/Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  tags: ['autodocs'],
} as Meta<typeof Flex>;

type Story = StoryObj<typeof Flex>;

export const DefaultFlex:Story = {
  render: (props) => (
    <Flex {...props}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  ),
};

export const JustifyBetween:Story = {
  args: {
    justify: 'between',
  },
  render: ({ justify }) => (
    <Flex justify={justify}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  ),
};

export const JustifyEnd:Story = {
  args: {
    justify: 'end',
  },
  render: ({ justify }) => (
    <Flex justify={justify}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  ),
};

export const DirectionColumn:Story = {
  args: {
    direction: 'column',
  },
  render: ({ direction }) => (
    <Flex direction={direction}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  ),
};

export const ColumnItemsCenter:Story = {
  args: {
    align: 'center',
    direction: 'column',
  },
  render: ({ align, direction }) => (
    <Flex align={align} direction={direction}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  ),
};

export const FlexGap:Story = {
  args: {
    gap: '8',
  },
  render: ({ gap }) => (
    <Flex gap={gap}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  ),
};
