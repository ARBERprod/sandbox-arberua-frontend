import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { CollectionsView } from '@/views/CollectionsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCollections } from '@/entities/Collection';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { ParamsService } from '@/shared/lib/services/params.service';

export default function CollectionsPage() {
  return (
    <MainLayout metaData={{
      title: 'Колекції одягу ARBER - Інтернет-магазин чоловічого та жіночого одягу',
      description: 'Офіційний сайт українського бренду ARBER – сучасні колекції чоловічого та жіночого одягу, взуття і аксесуарів. Скористайтеся знижками, акціями та вигідними пропозиціями прямо зараз!',
    }}
    >
      <CollectionsView />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  const queryString = new ParamsService(query);

  store.dispatch(getCollections.initiate({
    filters: queryString.stringifyParams(),
  }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'collections',
      ])),
    },
  };
});
