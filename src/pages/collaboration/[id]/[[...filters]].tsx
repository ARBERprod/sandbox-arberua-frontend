import { MainLayout, DynamicMeta } from '@/layouts/MainLayout/MainLayout';
import { CollaborationCatalogView } from '@/views/CollaborationCatalogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCollaboration } from '@/entities/Collaboration';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { getPageFromQuery } from '@/widgets/CatalogPagination';
import { FilterUtils } from '@/entities/Filter';
import { getInitSortValue } from '@/features/ProductSort';
import { stripTags } from '@/shared/lib/utils/stripTags';
import { isNotFoundError } from '@/shared/types/type-guards';

interface CollaborationCatalogPageProps {
  dynamicMeta: DynamicMeta;
}

// getServerSideProps only returns the object — the title and description reach <head> through here.
const CollaborationCatalogPage = ({ dynamicMeta }: CollaborationCatalogPageProps) => (
  <MainLayout dynamicMeta={dynamicMeta}>
    <CollaborationCatalogView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps<CollaborationCatalogPageProps>(
  (store) => async (ctx) => {
    const { query, locale } = ctx;
    const {
      isError,
      data,
      error,
    } = await store.dispatch(getCollaboration.initiate({
      collaboration_id: query.id as string,
      filters: FilterUtils.getFilterStringFromQueryArray(query.filters as string[]),
      page: getPageFromQuery(query),
      sort: getInitSortValue(query),
    }));

    // A disabled or unknown collaboration must answer an honest HTTP 404: the redirect to /404
    // used by catalog and product pages is a 307 followed by a 200, i.e. a soft 404.
    if (isNotFoundError(error)) return { notFound: true };

    // Any other failure is a broken backend, so let it be a 500. Serving 404 to a 5xx or a network
    // blip tells Google the whole section is gone (docs/runbooks/diagnose-product-404.md).
    if (isError || !data) {
      throw new Error(`Collaboration ${query.id as string} request failed`, { cause: error });
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        dynamicMeta: {
          title: data.data.collaboration.title,
          // The contract ships description as HTML; a meta tag takes plain text only.
          description: stripTags(data.data.collaboration.description ?? ''),
        },
        ...(await serverSideTranslations(locale as string, [
          'common', 'sizes',
        ])),
      },
    };
  },
);

export default CollaborationCatalogPage;
