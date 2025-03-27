import { MainLayout } from '@/layouts/MainLayout';
import { CollectionsCatalogView } from '@/views/CollectionsCatalogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCollection } from '@/entities/Collection';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { getPageFromQuery } from '@/widgets/CatalogPagination';
import { FilterUtils } from '@/entities/Filter';
import { getInitSortValue } from '@/features/ProductSort';

const CollectionsCatalogPage = () => (
  <MainLayout>
    <CollectionsCatalogView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { query, locale } = ctx;
  store.dispatch(getCollection.initiate({
    collection_id: query.id as string,
    filters: FilterUtils.getFilterStringFromQueryArray(query.filters as string[]),
    page: getPageFromQuery(query),
    sort: getInitSortValue(query),
  }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default CollectionsCatalogPage;
