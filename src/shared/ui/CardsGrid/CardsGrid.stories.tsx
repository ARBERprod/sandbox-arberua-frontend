import type { Meta, StoryObj } from '@storybook/react';
import { SingleProductCard } from '@/widgets/ProductPresenter';
import { SingleTotalLookCard } from '@/widgets/TotalLookPresenter';
import { getMockProducts, Product } from '@/entities/Product';
import { getMockTotalLooks, TotalLook } from '@/entities/TotalLook';
import { CardView } from '@/shared/types/common';
import { CardsGrid } from './CardsGrid';

const meta: Meta<typeof CardsGrid> = {
  title: 'Shared/CardsGrid',
  component: CardsGrid,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CardsGrid>;

const totalLooks:TotalLook[] = getMockTotalLooks();

export const CardsGridWithSingleProductCard: Story = {
  args: {
    items: getMockProducts(),
    children: (product) => (
      <SingleProductCard
        product={product as Product}
      />
    ),
  },
};

export const CardsGridWithSingleTotalLookCardNormalView: Story = {
  args: {
    items: totalLooks,
    children: (totalLook) => (
      <SingleTotalLookCard
        totalLook={totalLook as TotalLook}
        view={CardView.NORMAL}
      />
    ),
  },
};

export const CardsGridWithSingleTotalLookCardBigView: Story = {
  args: {
    items: totalLooks,
    children: (totalLook) => (
      <SingleTotalLookCard
        totalLook={totalLook as TotalLook}
        view={CardView.BIG}
      />
    ),
  },
};

export const CardsGridWithSingleTotalLookCardSmallView: Story = {
  args: {
    items: totalLooks,
    children: (totalLook) => (
      <SingleTotalLookCard
        totalLook={totalLook as TotalLook}
        view={CardView.SMALL}
      />
    ),
  },
};
