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

// Render next/link as a plain anchor so href/role assertions are deterministic.
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Identity proxy so swatch CSS-module modifier classes (active) survive the style mock.
jest.mock(
  '@/entities/Product/ui/ProductColorModifications/ProductColorModifications.module.scss',
  () => new Proxy({}, { get: (_t, prop) => String(prop) }),
);

// Passthrough translation so heading keys are deterministic and i18n is not required.
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Stub side-effecting hooks and heavy/unrelated subtrees; the slot wiring is under test.
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
jest.mock('@/shared/ui/Gallery', () => ({
  Gallery: () => <div data-testid="gallery" />,
}));
jest.mock('@/features/NightSaleTimer', () => ({
  NightSaleTimer: () => null,
}));
jest.mock('../ProductCardActions', () => ({
  ProductCardActions: () => <div data-testid="actions" />,
}));
jest.mock('../ProductSizeSlot', () => ({
  ProductSizeSlot: () => <div data-testid="size" />,
}));
jest.mock('../ProductComments', () => ({
  ProductComments: () => <div data-testid="comments" />,
}));

const variant = (over: Partial<ProductColorVariant>): ProductColorVariant => ({
  id: '1',
  url: 'product-1-black',
  color_value: '#000000',
  color_title: 'Black',
  is_current: false,
  is_available: true,
  ...over,
});

const renderCard = (colorVariants: ProductColorVariant[]) => render(
  <ProductDetailedCard product={{ ...mockDetailedProduct, color_variants: colorVariants }} />,
);

describe('ProductDetailedCard color slot wiring', () => {
  it('renders no color swatches when color_variants is empty', () => {
    renderCard([]);
    const productLinks = screen.queryAllByRole('link')
      .filter((a) => a.getAttribute('href')?.startsWith('/product/'));
    expect(productLinks).toHaveLength(0);
  });

  it('renders a swatch per variant when non-empty', () => {
    renderCard([
      variant({
        id: '1', url: 'product-1-black', color_title: 'Black', is_current: true,
      }),
      variant({ id: '2', url: 'product-1-brown', color_title: 'Brown' }),
    ]);
    expect(screen.getByRole('link', { name: 'Black' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Brown' })).toBeInTheDocument();
  });

  it('marks the is_current variant as active', () => {
    renderCard([
      variant({
        id: '1', url: 'product-1-black', color_title: 'Black', is_current: true,
      }),
      variant({ id: '2', url: 'product-1-brown', color_title: 'Brown' }),
    ]);
    expect(screen.getByRole('link', { name: 'Black' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Brown' })).not.toHaveClass('active');
  });

  it('renders without an active swatch and does not crash when no variant is current', () => {
    renderCard([
      variant({ id: '1', url: 'product-1-black', color_title: 'Black' }),
      variant({ id: '2', url: 'product-1-brown', color_title: 'Brown' }),
    ]);
    expect(screen.getByRole('link', { name: 'Black' })).not.toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Brown' })).not.toHaveClass('active');
  });

  it('builds each swatch href via routerPaths, not the bare API slug', () => {
    renderCard([variant({
      id: '1', url: 'product-1-black', color_title: 'Black', is_current: true,
    })]);
    const link = screen.getByRole('link', { name: 'Black' });
    expect(link).toHaveAttribute('href', routerPaths[Routes.PRODUCT]('product-1-black'));
  });
});
