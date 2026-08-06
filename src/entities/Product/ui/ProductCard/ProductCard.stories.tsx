import { Meta, StoryObj } from '@storybook/react';
import { getMockProduct } from '@/entities/Product';
import { BuyInOneClickButton } from '@/features/cart/BuyInOneClick';
import { ToggleWishListButton } from '@/features/wish-list/ToggleWishListButton';
import { AddToCardButton } from '../../../../features/cart/AddToCart';
import { ProductCard } from './ProductCard';

export default {
  title: 'entities/Product/ProductCard',
  component: ProductCard,
} as Meta<typeof ProductCard>;

type Story = StoryObj<typeof ProductCard>

export const ProductCardDefault: Story = {
  args: {
    product: getMockProduct(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const ProductCardDiscount: Story = {
  args: {
    product: getMockProduct({ sale: true }),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const ProductCardWithCollaboration: Story = {
  args: {
    product: {
      ...getMockProduct({ sale: true }),
      collaboration: {
        id: 'c-1',
        title: 'Kyivstyles',
        label: 'ARBER × Kyivstyles',
        url: '/collaboration/c-1',
      },
    },
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const ProductCardWithLikes: Story = {
  args: {
    product: getMockProduct(),
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const ProductCardWithCardActions: Story = {
  args: {
    product: getMockProduct(),
    slots: {
      cartActions: (actionsProps) => (
        <>
          <BuyInOneClickButton
            productIds={[]}
            {...actionsProps}
            buttonProps={{
              size: 'medium',
              color: 'light-primary',
            }}
          />
          <AddToCardButton
            {...actionsProps}
            buttonProps={{
              size: 'medium',
              color: 'light-primary',
            }}
          />
        </>
      ),
    },
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const ProductCardWithProductActions: Story = {
  args: {
    product: getMockProduct(),
    slots: {
      productActions: (productId) => (
        <ToggleWishListButton
          withCount={Boolean(5)}
          count={10}
          productId={productId}
        />
      ),
    },
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
