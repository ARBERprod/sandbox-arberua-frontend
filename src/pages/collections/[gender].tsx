import { MainLayout, Meta } from '@/layouts/MainLayout/MainLayout';
import { CollectionsView } from '@/views/CollectionsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCollections } from '@/entities/Collection';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { ParamsService } from '@/shared/lib/services/params.service';

interface CollectionsGenderPageProps {
    meta?: Meta;
}

export default function CollectionsGenderPage({ meta }: CollectionsGenderPageProps) {
  return (
    <MainLayout dynamicMeta={meta}>
      <CollectionsView />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  const queryString = new ParamsService(query, 'gender');

  store.dispatch(getCollections.initiate({
    filters: queryString.stringifyParams(),
    type: query.gender as string,
  }));

  let meta = null;

  if (query.gender?.includes('man')) {
    meta = {
      title: 'Купити чоловічі колекції одягу ARBER - Інтернет-магазин українського бренду',
      description: 'Офіційний сайт бренду ARBER - стильний чоловічий одяг, взуття та аксесуари. Купити нові колекції з вигідними цінами, знижками та акціями в інтернет-магазині ARBER!',
    };
  } else if (query.gender?.includes('women')) {
    meta = {
      title: 'Купити жіночі колекції одягу ARBER - Інтернет-магазин українського бренду',
      description: 'Офіційний сайт бренду ARBER - стильний жіночий одяг, взуття та аксесуари. Купити нові колекції з вигідними цінами, знижками та акціями в інтернет-магазині ARBER!',
    };
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'collections',
      ])),
      meta,
    },
  };
});
