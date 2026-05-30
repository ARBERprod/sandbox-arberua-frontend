import { render, screen } from '@testing-library/react';
import { Routes, routerPaths } from '@/shared/config/router';
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
  {
    id: '2',
    url: 'product-1-brown',
    color_value: '#3B2A1A',
    color_title: 'Brown',
    is_current: false,
    is_available: true,
  },
];

describe('ProductDetailedCard color swatch navigation regression', () => {
  it('renders each swatch href as the routerPaths /product/<slug> path, never the bare API slug', () => {
    render(
      <ProductDetailedCard product={{ ...mockDetailedProduct, color_variants: variants }} />,
    );

    variants.forEach((v) => {
      const link = screen.getByRole('link', { name: v.color_title });
      expect(link).toHaveAttribute('href', routerPaths[Routes.PRODUCT](v.url));
      // Regression guard: a relative bare slug breaks under the locale prefix.
      expect(link).not.toHaveAttribute('href', v.url);
    });
  });
});
