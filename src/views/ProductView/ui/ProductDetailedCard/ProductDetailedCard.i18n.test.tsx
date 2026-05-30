import { render, screen } from '@testing-library/react';
import { mockDetailedProduct, ProductColorVariant } from '@/entities/Product';
import { ProductDetailedCard } from './ProductDetailedCard';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { slug: 'product-1' },
    push: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/product/[slug]',
    asPath: '/product/product-1',
    route: '/product/[slug]',
    events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
    isReady: true,
  }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Passthrough translation so the heading key is asserted deterministically.
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@/shared/lib/analytics/dataLayer', () => ({
  measurementsPost: jest.fn(),
  pushDataLayerEvent: jest.fn(),
  pushGAdsEvent: jest.fn(),
}));
jest.mock('@/entities/Events', () => ({
  useViewContentMutation: () => [jest.fn(), {}],
}));
jest.mock('@/entities/Session', () => ({
  useAuth: () => ({ userData: null }),
  useUserId: () => 'test-client',
}));
jest.mock('../../lib/ProductSkusContext', () => ({
  useProductSkus: () => ({ chosenSku: null, setChosenSku: jest.fn() }),
}));
jest.mock('@/shared/ui/Gallery', () => ({ Gallery: () => <div /> }));
jest.mock('@/features/NightSaleTimer', () => ({ NightSaleTimer: () => null }));
jest.mock('../ProductCardActions', () => ({ ProductCardActions: () => <div /> }));
jest.mock('../ProductSizeSlot', () => ({ ProductSizeSlot: () => <div /> }));
jest.mock('../ProductComments', () => ({ ProductComments: () => <div /> }));

const variants: ProductColorVariant[] = [
  {
    id: '1',
    url: 'product-1-black',
    color_value: '#000000',
    color_title: 'Black',
    is_current: true,
    is_available: true,
  },
];

describe('ProductDetailedCard more_colors heading', () => {
  it('renders the more_colors heading when color variants are present', () => {
    render(
      <ProductDetailedCard product={{ ...mockDetailedProduct, color_variants: variants }} />,
    );
    expect(screen.getByText('more_colors')).toBeInTheDocument();
  });

  it('does not render the more_colors heading when there are no color variants', () => {
    render(
      <ProductDetailedCard product={{ ...mockDetailedProduct, color_variants: [] }} />,
    );
    expect(screen.queryByText('more_colors')).not.toBeInTheDocument();
  });
});
