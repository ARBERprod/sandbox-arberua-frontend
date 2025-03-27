import type { Meta, StoryObj } from '@storybook/react';
import { FooterStoreButtons } from './FooterStoreButtons';

const meta: Meta<typeof FooterStoreButtons> = {
  title: 'widgets/Footer/FooterStoreButtons',
  component: FooterStoreButtons,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterStoreButtons>;

export const FooterStoreButtonsDefault: Story = {
  args: {},
};

export const FooterStoreButtonsSizeXsmall: Story = {
  args: {
    size: 'xsmall',
  },
};

export const FooterStoreButtonsSizeMediumlarge: Story = {
  args: {
    size: 'mediumlarge',
  },
};

export const FooterStoreButtonsSizeMedium: Story = {
  args: {
    size: 'medium',
  },
};

export const FooterStoreButtonsSizeLargexxl: Story = {
  args: {
    size: 'largexxl',
  },
};

export const FooterStoreButtonsSizeLarge: Story = {
  args: {
    size: 'large',
  },
};
