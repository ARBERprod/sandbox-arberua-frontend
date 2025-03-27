import { MainLayout } from '@/layouts/MainLayout';
import { getSearchedProducts, SearchView } from '@/views/SearchView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { routerPaths } from '@/shared/config/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPageFromQuery } from '@/widgets/CatalogPagination';
import { FilterUtils } from '@/entities/Filter';

const SearchPage = () => (
  <MainLayout>
    <SearchView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const query = ctx.query.q;

  if (!query) {
    return {
      redirect: {
        destination: routerPaths.main,
        permanent: false,
      },
    };
  }

  store.dispatch(getSearchedProducts.initiate({
    query: query as string,
    filters: FilterUtils.getFiltersStringFromQuery(ctx.query),
    page: getPageFromQuery(ctx.query),
    sort: ctx.query.sort as string || '',
  }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, [
        'common',
      ])),
    },
  };
});

export default SearchPage;
