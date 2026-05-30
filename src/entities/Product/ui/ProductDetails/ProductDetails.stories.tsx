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
            { value: 'red', url: '/red', title: 'Красный' },
            { value: 'green', url: '/', title: 'Зелёный' },
          ]}
          activeColor={{ url: '/red', value: 'red', title: 'Красный' }}
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
            { value: 'red', url: '/red', title: 'Красный' },
            { value: 'green', url: '/', title: 'Зелёный' },
          ]}
          activeColor={{ url: '/red', value: 'red', title: 'Красный' }}
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
            { value: 'red', url: '/red', title: 'Красный' },
            { value: 'green', url: '/', title: 'Зелёный' },
          ]}
          activeColor={{ url: '/red', value: 'red', title: 'Красный' }}
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

export const ProductDetailsWithSlotsColorUnavailable: Story = {
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
            {
              value: '#000000', url: '/black', title: 'Чёрный', isAvailable: true,
            },
            {
              value: '#1d4ed8', url: '/blue', title: 'Синий', isAvailable: false,
            },
            {
              value: '#9ca3af', url: '/grey', title: 'Серый', isAvailable: false,
            },
          ]}
          activeColor={{
            url: '/black', value: '#000000', title: 'Чёрный', isAvailable: true,
          }}
        />
      ),
    },
  },
};

export const ProductDetailsWithSlotsColorSingle: Story = {
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
            {
              value: '#7c2d12', url: '/brown', title: 'Коричневый', isAvailable: true,
            },
          ]}
          activeColor={{
            url: '/brown', value: '#7c2d12', title: 'Коричневый', isAvailable: true,
          }}
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
