import type { Meta, StoryObj } from '@storybook/react';
import { SizesTableProxy } from './SizesTableProxy';

const meta: Meta<typeof SizesTableProxy> = {
  title: 'views/sizesView/SizesTableProxy',
  component: SizesTableProxy,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SizesTableProxy>;

export const SizesTableProxyVariantMan: Story = {
  args: {
    variant: 'man',
  },
};

export const SizesTableProxyVariantWoman: Story = {
  args: {
    variant: 'woman',
  },
};

export const SizesTableProxyVariantShoes: Story = {
  args: {
    variant: 'shoes',
  },
};
