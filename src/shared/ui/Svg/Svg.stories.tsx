import { Meta, StoryObj } from '@storybook/react';
import Icon from '@/shared/assets/icons/telegram.svg';
import { Svg } from './Svg';
import styles from './Svg.module.scss';

export default {
  title: 'shared/Svg',
  component: Svg,
} as Meta<typeof Svg>;

type Story = StoryObj<typeof Svg>;

export const StrokedSvg:Story = {
  args: {
    stroke: 'black',
    Icon,
  },
};

export const FilledSvg:Story = {
  args: {
    fill: 'green',
    Icon,
  },
};

export const SvgSize:Story = {
  args: {
    fill: 'green',
    Icon,
    width: 50,
    height: 50,
  },
};

export const SvgAutoSize:Story = {
  args: {
    fill: 'green',
    Icon,
    width: 'auto',
    height: 'auto',
  },
};

export const SvgCustomClassName:Story = {
  args: {
    Icon,
    className: styles.storySvg,
  },
};
