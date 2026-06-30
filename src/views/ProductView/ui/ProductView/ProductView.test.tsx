import { ReactNode } from 'react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { getMockDetailedProduct } from '@/entities/Product/lib/getMockProducts';
import { ProductView } from './ProductView';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));

jest.mock('@/entities/Product', () => ({
  useAddProductToHistoryAndGetHistoryMutation: () => [jest.fn(), { data: [] }],
}));

jest.mock('../ProductDetailedCard', () => ({ ProductDetailedCard: () => null }));
jest.mock('../ProductSkusProvider', () => ({
  ProductSkusProvider: ({ children }: { children: ReactNode }) => children,
}));
jest.mock('@/widgets/ProductPresenter', () => ({
  RecommendedProducts: () => null,
  HistoryProducts: () => null,
}));
jest.mock('@/shared/ui/Breadcrumps', () => ({
  ...jest.requireActual('@/shared/ui/Breadcrumps'),
  PageBreadcrumbs: () => null,
}));

describe('ProductView eSputnik event', () => {
  beforeEach(() => jest.clearAllMocks());

  it('fires the ProductPage event with id, price and in-stock flag', () => {
    const product = {
      ...getMockDetailedProduct(),
      id: 'prod-42',
      is_sale: true,
      price: { value: 1990, symbol: '₴' },
    };

    renderComponent(<ProductView product={product} breadcrumbs={[]} recommendations={[]} />);

    expect(sendEsEvent).toHaveBeenCalledWith('ProductPage', {
      productKey: 'prod-42',
      price: 1990,
      isInStock: true,
    });
  });
});
