import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetails } from './ProductDetails';
import { getMockPrice } from '@/shared/lib/mock/price';
import { ProductColorModifications } from '../ProductColorModifications';
import { ProductSkus } from '../ProductSkus';
import { getMockSkus } from '../../lib/getMockProducts';
import { ProductCardActions } from '@/views/ProductView/ui/ProductCardActions';

const meta: Meta<typeof ProductDetails> = {
  title: 'entities/Product/ProductDetails',
  component: ProductDetails,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductDetails>;

export const ProductDetailsDefault: Story = {
  args: {
    title: 'Жакет женский Arber голубого цвета',
    price: getMockPrice(),
    oldPrice: getMockPrice(),
    canWriteOff: 100,
    cashback: 100,
    slots: {
      color: (
        <ProductColorModifications
          colors={[
            { value: 'red', url: '/red' },
            { value: 'green', url: '/' },
          ]}
          activeColor={{ url: '/red', value: 'red' }}
        />
      ),
      size: (
        <ProductSkus
          skus={getMockSkus()}
        />
      ),
    },
  },
};

export const ProductDetailsWithSlotsColor: Story = {
  args: {
    title: 'Жакет женский Arber голубого цвета',
    price: getMockPrice(),
    oldPrice: getMockPrice(),
    canWriteOff: 100,
    cashback: 100,
    slots: {
      color: (
        <ProductColorModifications
          colors={[
            { value: 'red', url: '/red' },
            { value: 'green', url: '/' },
          ]}
          activeColor={{ url: '/red', value: 'red' }}
        />
      ),
    },
  },
};

export const ProductDetailsWithSlotsSize: Story = {
  args: {
    title: 'Жакет женский Arber голубого цвета',
    price: getMockPrice(),
    oldPrice: getMockPrice(),
    canWriteOff: 100,
    cashback: 100,
    slots: {
      size: (
        <ProductSkus
          skus={getMockSkus()}
        />
      ),
    },
  },
};

export const ProductDetailsWithSlotsSizeColor: Story = {
  args: {
    title: 'Жакет женский Arber голубого цвета',
    price: getMockPrice(),
    oldPrice: getMockPrice(),
    canWriteOff: 100,
    cashback: 100,
    slots: {
      color: (
        <ProductColorModifications
          colors={[
            { value: 'red', url: '/red' },
            { value: 'green', url: '/' },
          ]}
          activeColor={{ url: '/red', value: 'red' }}
        />
      ),
      size: (
        <ProductSkus
          skus={getMockSkus()}
        />
      ),
    },
  },
};

export const ProductDetailsWithSlotsActions: Story = {
  args: {
    title: 'Жакет женский Arber голубого цвета',
    price: getMockPrice(),
    oldPrice: getMockPrice(),
    canWriteOff: 100,
    cashback: 100,
    slots: {
      actions: (
        <ProductCardActions
          productId="1"
          isSale
        />),
    },
  },
};

export const ProductDetailsWithSlotsActionsIsNotSale: Story = {
  args: {
    title: 'Жакет женский Arber голубого цвета',
    price: getMockPrice(),
    oldPrice: getMockPrice(),
    canWriteOff: 100,
    cashback: 100,
    slots: {
      actions: (
        <ProductCardActions
          productId="2"
          isSale={false}
        />),
    },
  },
};
