import type { Meta, StoryObj } from '@storybook/react';
import { AppImage } from '@/shared/ui/AppImage';
import { SmallProductCard } from './SmallProductCard';
import { getMockSmallProduct } from '@/entities/Product';

const meta: Meta<typeof SmallProductCard> = {
  title: 'entities/Product/SmallProductCard',
  component: SmallProductCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SmallProductCard>;

export const SmallProductCardVariantNormal: Story = {
  args: {
    product: getMockSmallProduct(),
    imageSlot: () => <AppImage alt="alt" />,
    variant: 'normal',
  },
};

export const SmallProductCardVariantSearch: Story = {
  args: {
    product: getMockSmallProduct(),
    imageSlot: () => <AppImage alt="alt" />,
    variant: 'search',
  },
};

export const SmallProductCardWithoutColors: Story = {
  args: {
    product: getMockSmallProduct(),
    imageSlot: () => <AppImage alt="alt" />,
  },
};

export const SmallProductCardWithoutSizes: Story = {
  args: {
    product: getMockSmallProduct(),
    imageSlot: () => <AppImage alt="alt" />,
  },
};
