import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { StoreProvider } from '@/providers/StoreProvider/StoreProvider';
import { FloatingProvider } from '@/shared/lib/components/FloatingProvider';
import { ConfirmModalProvider } from '@/shared/lib/components/ConfirmModalProvider';
import i18n from '@/shared/lib/test/i18nForTest';
import { createMockRouter } from '@/shared/lib/test/createMockRouter';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { useGetCatalogQuery } from '../../api/catalogApi';
import { CatalogView } from './CatalogView';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));
jest.mock('@/shared/lib/analytics/dataLayer', () => ({
  measurementsPost: jest.fn(),
  pushDataLayerEvent: jest.fn(),
  pushGAdsEvent: jest.fn(),
}));
jest.mock('../../api/catalogApi', () => ({ useGetCatalogQuery: jest.fn() }));
jest.mock('@/entities/Blog', () => ({ useGetPostsQuery: () => ({ data: undefined }), PostsGrid: () => null }));
jest.mock('@/entities/Promotion', () => ({ useGetPromotionsQuery: () => ({ data: undefined }), PromotionsGrid: () => null }));
jest.mock('@/widgets/CategorySlider', () => ({ CategorySlider: () => null }));
jest.mock('@/widgets/ProductPresenter', () => ({ ProductsGrid: () => null }));
jest.mock('@/widgets/CatalogActions', () => ({ CatalogActions: () => null }));
jest.mock('@/widgets/CatalogPagination', () => ({
  usePaginate: () => ({
    pageChangeHandler: jest.fn(), merge: false, moreBtnClickHandler: jest.fn(), page: 1,
  }),
  CatalogPagination: () => null,
}));
jest.mock('@/shared/ui/Breadcrumps', () => ({ PageBreadcrumbs: () => null }));
jest.mock('@/entities/Session', () => ({
  ...jest.requireActual('@/entities/Session'),
  useUserId: () => 'client-1',
}));

const mockUseGetCatalogQuery = useGetCatalogQuery as jest.Mock;

const buildCatalog = (category: object, products: unknown[] = []) => ({
  data: {
    data: {
      category,
      products,
      children: [],
      breadcrumbs: [],
      filters: [],
      sorter: [],
    },
    meta: { page: { total: 1, current: 1 } },
  },
  isLoading: false,
  isError: false,
  isFetching: false,
});

const wrap = (node: ReactNode) => (
  <RouterContext.Provider value={createMockRouter({ query: { category: 'odyag' } })}>
    <I18nextProvider i18n={i18n}>
      <FloatingProvider>
        <ConfirmModalProvider>
          <StoreProvider>
            {node}
            <div id="portal" />
          </StoreProvider>
        </ConfirmModalProvider>
      </FloatingProvider>
    </I18nextProvider>
  </RouterContext.Provider>
);

describe('CatalogView — eSputnik CategoryPage', () => {
  beforeEach(() => jest.clearAllMocks());

  it('sends CategoryPage once with the backend category key', () => {
    mockUseGetCatalogQuery.mockReturnValue(
      buildCatalog({
        id: 'c1', title: 'Одяг', url: '/catalog/odyag', esputnik_category_key: 'Одяг',
      }),
    );

    render(wrap(<CatalogView />));

    expect(sendEsEvent).toHaveBeenCalledTimes(1);
    expect(sendEsEvent).toHaveBeenCalledWith('CategoryPage', { categoryKey: 'Одяг' });
  });

  it('does not send CategoryPage when the backend key is absent (no-op until backend ships it)', () => {
    mockUseGetCatalogQuery.mockReturnValue(
      buildCatalog({ id: 'c1', title: 'Одяг', url: '/catalog/odyag' }),
    );

    render(wrap(<CatalogView />));

    expect(sendEsEvent).not.toHaveBeenCalled();
  });

  it('does not re-send CategoryPage when the catalog refetches within the same category', () => {
    const category = {
      id: 'c1', title: 'Одяг', url: '/catalog/odyag', esputnik_category_key: 'Одяг',
    };
    mockUseGetCatalogQuery.mockReturnValue(buildCatalog(category, []));

    const { rerender } = render(wrap(<CatalogView />));
    expect(sendEsEvent).toHaveBeenCalledTimes(1);

    // New data object (pagination/filter refetch), SAME category key: the effect is keyed on the
    // primitive key, so it must NOT fire again.
    mockUseGetCatalogQuery.mockReturnValue(buildCatalog(category, []));
    rerender(wrap(<CatalogView />));

    expect(sendEsEvent).toHaveBeenCalledTimes(1);
  });
});
